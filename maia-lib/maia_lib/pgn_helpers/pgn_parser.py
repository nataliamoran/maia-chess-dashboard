import re
import bz2
import io
import os.path
import datetime
import collections.abc

import chess.pgn

from .pgn_parsing_funcs import (
    per_game_infos,
    per_move_funcs,
    per_move_time_funcs,
    per_move_eval_funcs,
    get_termination_condition,
)

from ..leela_board import LeelaBoard

_header = r"""\[([A-Za-z0-9_]+)\s+"((?:[^"]|\\")*)"\]"""
header_re = re.compile(_header)
_headers = r"(" + _header + r"\s*\n)+\n"
_moves = r"[^\[]*(\*|1-0|0-1|1/2-1/2)\s*\n"
_move = r"""([NBKRQ]?[a-h]?[1-8]?[\-x]?[a-h][1-8](?:=?[nbrqkNBRQK])?|[PNBRQK]?@[a-h][1-8]|--|Z0|O-O(?:-O)?|0-0(?:-0)?)|(\{.*)|(;.*)|(\$[0-9]+)|(\()|(\))|(\*|1-0|0-1|1\/2-1\/2)|([\?!]{1,2})"""

game_clock_re = re.compile(r"\[%clk ")
game_eval_re = re.compile(r"%eval ")
move_num_re = re.compile(r"\d{1,3}\.{1,3}( |\n)")

game_counter_re = re.compile(r'\[Event "')

game_re = re.compile(
    r"(" + _headers + r")(.*?)(\*|1-0|0-1|1\/2-1\/2)", re.MULTILINE | re.DOTALL
)


class GamesFile(collections.abc.Iterator):
    def __init__(self, path):
        if isinstance(path, io.StringIO) or isinstance(path, io.TextIOWrapper):
            self.file = path
        elif path.endswith("bz2"):
            self.file = bz2.open(path, "rt")
        elif os.path.isfile(path):
            self.file = open(path, "rt")
        else:
            self.file = io.StringIO(path)
        self.path = path
        self.re_iter = stream_iter(self.file)

    def __del__(self):
        try:
            self.file.close()
        except:
            pass

    def __next__(self):
        r = next(self.re_iter)
        try:
            header = header_re.findall(r.group(1))
        except AttributeError:
            raise AttributeError(f"Failed to parse input as pgn header: '{r}'")
        return {k: v for k, v in header}, r.group(0)

    def iter_moves(self):
        return games_sample_iter(self)

    def iter_mongo_dicts(self):
        for game_dict, game_str in self:
            yield make_game_info_mongo(game_dict, game_str)


def stream_iter(file_handle):
    current_game = file_handle.readline()
    for line in file_handle:
        if line.startswith("[Event "):
            gr = game_re.match(current_game.strip())
            if gr is not None:
                yield gr
            current_game = ""
        current_game += line
    if len(current_game.strip()) > 0:
        yield game_re.match(current_game.strip())


def games_sample_iter(game_stream):
    for _, game_str in game_stream:
        lines = get_game_info(game_str)
        board = None
        for l in lines:
            if board is None:
                board = LeelaBoard(fen=l["board"])
            yield board.copy(), l
            board.push_uci(l["move"])


def get_header_info(header_dict):
    gameVals = {}
    for name, func in per_game_infos.items():
        try:
            gameVals[name] = func(header_dict)
        except KeyError:
            gameVals[name] = None
    return gameVals


def get_game_info(input_game, no_clock=False):
    if isinstance(input_game, str):
        game = chess.pgn.read_game(io.StringIO(input_game))
    else:
        game = input_game

    gameVals = {}
    for name, func in per_game_infos.items():
        try:
            gameVals[name] = func(game.headers)
        except KeyError:
            gameVals[name] = None

    gameVals["num_ply"] = len(list(game.mainline()))
    gameVals["termination_condition"] = get_termination_condition(
        gameVals["termination"], game
    )

    moves_values = []
    for i, node in enumerate(game.mainline()):
        # Caching
        board = node.parent.board()
        node_dict = gameVals.copy()
        node_dict["move_ply"] = i
        for name, func in per_move_funcs.items():
            node_dict[name] = func(node, gameVals)
        if len(node.comment) > 0:
            if r"%clk" in node.comment and not no_clock:
                for name, func in per_move_time_funcs.items():
                    node_dict[name] = func(node, gameVals)
            if r"%eval" in node.comment:
                for name, func in per_move_eval_funcs.items():
                    node_dict[name] = func(node, gameVals)
        moves_values.append(node_dict)
    return moves_values


def make_game_info_mongo(header_dict, game_str):
    data_dict = get_header_info(header_dict)
    if data_dict["white_elo"] == "?":
        data_dict["white_elo"] = None
    if data_dict["black_elo"] == "?":
        data_dict["black_elo"] = None
    data_dict["has_clock"] = game_clock_re.search(game_str) is not None
    data_dict["has_eval"] = game_eval_re.search(game_str) is not None
    data_dict["game_ply"] = len(move_num_re.findall(game_str))
    if data_dict["white_title"] == "":
        data_dict["white_title"] = None
    if data_dict["black_title"] == "":
        data_dict["black_title"] = None
    data_dict["full_date"] = datetime.datetime.fromisoformat(
        header_dict["UTCDate"].replace(".", "-") + " " + header_dict["UTCTime"]
    )
    data_dict["termination_condition"] = get_termination_condition(
        data_dict["termination"], chess.pgn.read_game(io.StringIO(game_str))
    )
    del data_dict["url"]
    data_dict["_id"] = data_dict["game_id"]
    data_dict["pgn"] = game_str
    return data_dict
