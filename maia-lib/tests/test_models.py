import os.path
import json

import pytest
import maia_lib


def load_games():
    return maia_lib.GamesFile(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "maia1_games_sample.pgn.bz2",
        )
    )


@pytest.mark.parametrize(
    "model_name,model_path", list(maia_lib.list_maia_paths().items())
)
def test_agreement_cpu(model_name, model_path):
    with open(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "sample_results.json",
        )
    ) as f:
        target_results = json.load(f)
    model = maia_lib.MaiaNet(model_path, gpu_id=-1)
    model_results = target_results[model_name]
    games = load_games()
    for i, (board, row) in enumerate(games.iter_moves()):
        if i >= 1000:
            break
        if i % 10 != 0:
            continue
        p, v = model.eval_board(board)
        corr_row = model_results.pop(0)
        assert row["game_id"] == corr_row["game_id"]
        assert row["move_ply"] == corr_row["move_ply"]
        assert board.fen() == corr_row["board"]
        assert pytest.approx(v, abs=0.00001) == corr_row["val"]
        for k_corr, mp_corr in corr_row["pol"].items():
            assert pytest.approx(p[k_corr], abs=0.00001) == mp_corr
