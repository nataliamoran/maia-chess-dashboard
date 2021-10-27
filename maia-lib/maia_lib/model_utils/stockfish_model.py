import os.path
import io
import multiprocessing

import chess.engine
import chess

from ..pgn_helpers import cp_to_winrate, GamesFile
from ..leela_board import LeelaBoard

_sf_default_path = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "stockfish",
        "stockfish_14_x64_bmi2",
    )
)


class Stockfish:
    def __init__(
        self,
        multipv=100,
        default_depth=6,
        max_time: float = 60,
        threads=max(1, multiprocessing.cpu_count() - 1),
        sf_path=_sf_default_path,
    ) -> None:
        self.threads = threads
        self.default_depth = default_depth
        self.max_time = max_time
        self.multipv = multipv
        self.engine_path = sf_path

    def __repr__(self) -> str:
        return f"<maia_lib.Stockfish[depth {self.default_depth}] {os.path.join(os.path.basename(os.path.dirname(self.engine_path)), os.path.basename(self.engine_path))}>"

    def eval_board(self, board, depth=None):
        if isinstance(board, str):
            board = chess.Board(board)
        elif isinstance(board, LeelaBoard):
            board = board.pc_board
        eval_depth = depth if depth is not None else self.default_depth
        engine = chess.engine.SimpleEngine.popen_uci(self.engine_path)
        engine.configure({"Threads": self.threads})
        analysis = engine.analyse(
            board,
            chess.engine.Limit(depth=eval_depth, time=self.max_time),
            multipv=self.multipv,
        )
        engine.quit()
        return make_model_info(analysis, board)

    def eval_boards(self, boards, depth=None):
        return [self.eval_board(b, depth=depth) for b in boards]

    def game_analysis(self, game_pgn):
        game = GamesFile(io.StringIO(game_pgn))
        boards = list(game.iter_moves())
        evals = self.eval_boards([b for b, l in boards])
        ret_list = []
        for sf_eval, (_, row) in zip(evals, boards):
            model_d = make_sf_results_dict(sf_eval, row)
            row.update(model_d)
            ret_list.append(row)
        return ret_list


def get_cp_num(cp):
    try:
        return cp.relative.cp
    except AttributeError:
        return 10000 if cp.relative.mate() > 0 else -10000


def make_model_info(inf, board):
    p_dict = {}
    p_dict = {d["pv"][0].uci(): get_cp_num(d["score"]) for d in inf}

    model_moves = sorted(p_dict.items(), key=lambda x: x[1])
    model_move = model_moves[-1][0]
    model_p_1 = model_moves[-1][1]

    winrate_vec = {m: cp_to_winrate(c / 100) for m, c in p_dict.items()}

    return {
        "model_optimal_cp": model_p_1,
        "model_optimal_winrate": winrate_vec[model_move],
        "model_move": model_move,
        "cp_vec": p_dict,
        "winrate_vec": winrate_vec,
        "board": board.fen(),
    }


def make_sf_results_dict(sf_eval, row):
    sf_eval["player_move"] = row["move"]
    sf_eval["player_move_cp"] = sf_eval["cp_vec"][row["move"]]
    sf_eval["player_move_winrate"] = sf_eval["winrate_vec"][row["move"]]
    sf_eval["player_move_cp_loss"] = (
        sf_eval["model_optimal_cp"] - sf_eval["cp_vec"][row["move"]]
    )
    sf_eval["player_move_winrate_loss"] = (
        sf_eval["model_optimal_winrate"] - sf_eval["winrate_vec"][row["move"]]
    )
    return sf_eval
