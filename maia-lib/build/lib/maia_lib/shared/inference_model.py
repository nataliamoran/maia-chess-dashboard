import io

import numpy as np
import chess

from ..leela_board import LeelaBoard
from ..pgn_helpers import GamesFile


class MaiaNet_Base(object):
    def __init__(self, model_path) -> None:
        self.model_path = model_path

    def infer_board(self, board):
        if isinstance(board, str) or isinstance(board, chess.Board):
            board = (
                LeelaBoard(board).lcz_features().reshape(1, 112, 64).astype("float32")
            )
        elif isinstance(board, LeelaBoard):
            board = board.lcz_features().reshape(1, 112, 64).astype("float32")
        elif isinstance(board, np.ndarray):
            board = board.reshape(-1, 112, 64).astype("float32")
        return self.model_eval(board)

    def model_eval(self, board):
        return NotImplemented

    def eval_boards(self, boards, policy_softmax_temp=1):

        boards = [self.board_convert(b) for b in boards]
        boards_arr = np.stack([b.lcz_features() for b in boards])

        pols, vals = self.infer_board(boards_arr)
        ret_vals = []
        for policy, val, board in zip(pols, vals, boards):
            ret_vals.append(
                self.make_outputs(
                    policy, val, board, policy_softmax_temp=policy_softmax_temp
                )
            )
        return ret_vals

    def eval_board(self, board, policy_softmax_temp=1):
        board = self.board_convert(board)
        pol, val = self.infer_board(board)
        return self.make_outputs(
            pol[0], val[0], board, policy_softmax_temp=policy_softmax_temp
        )

    def game_analysis(self, game_pgn):
        game = GamesFile(io.StringIO(game_pgn))
        boards = list(game.iter_moves())
        results = self.eval_boards([b for b, l in boards])
        ret_list = []
        for (pol, val), (_, row) in zip(results, boards):
            model_d = make_model_results_dict(pol, val, row)
            row.update(model_d)
            ret_list.append(row)
        return ret_list

    @staticmethod
    def board_convert(board):
        if isinstance(board, str) or isinstance(board, chess.Board):
            return LeelaBoard(board)
        return board

    @staticmethod
    def make_outputs(policy, val, board, policy_softmax_temp=1):
        return convert_outputs(
            policy, val, board, policy_softmax_temp=policy_softmax_temp
        )


def _softmax(x, softmax_temp):
    e_x = np.exp((x - np.max(x)) / softmax_temp)
    return e_x / e_x.sum(axis=0)


def convert_outputs(policy, val, board, policy_softmax_temp=1):
    legal_uci = [m.uci() for m in board.generate_legal_moves()]
    legal_indexes = board.lcz_uci_to_idx(legal_uci)
    softmaxed = _softmax(policy[legal_indexes], policy_softmax_temp)

    return (
        {m: float(v) for v, m in sorted(zip(softmaxed, legal_uci), reverse=True)},
        float(val[0]) / 2 + 0.5,
    )


def maia_entropy(p_dict):
    a = np.array(list(p_dict.values()))
    return -1.0 * np.nansum(a * np.log2(a))


def make_model_results_dict(p_dict, val, row):
    model_moves = sorted(p_dict.items(), key=lambda x: x[1])
    model_move = model_moves[-1][0]
    model_p_1 = model_moves[-1][1]
    row_batch = {
        "model_value": val,
        "model_move": model_move,
        "player_move": row["move"],
        "model_top_policy": model_p_1,
        "player_move_policy": p_dict[row["move"]],
        "model_policy_dict": p_dict,
        "model_entropy": maia_entropy(p_dict),
        "num_above_player" : len([x for x in model_moves if x[1] > p_dict[row["move"]]]),
        "num_below_player" : len([x for x in model_moves if x[1] < p_dict[row["move"]]]),
    }
    row_batch["model_correct"] = row["move"] == row_batch["model_move"]
    return row_batch
