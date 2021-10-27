import os.path
import json
import math

import pytest

import maia_lib

maia_lib.models.load_gpu = -1

maia_lib.models.stockfish.threads = 1
maia_lib.models.stockfish.default_depth = 1

game_str = None
target_results = None
model_all_analysis = None


def test_setup_str():
    global game_str
    game_str = next(
        maia_lib.GamesFile(
            os.path.join(
                os.path.dirname(os.path.abspath(__file__)),
                "games",
                "maia1_games_sample_sf_evals.pgn.bz2",
            )
        )
    )[1]


def test_setup_results():
    global target_results
    with open(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "game_analysis.json",
        )
    ) as f:
        target_results = json.load(f)


def test_setup_analysis():
    global model_all_analysis
    model_all_analysis = maia_lib.full_game_analysis(game_str)


test_setup_str()
test_setup_results()
test_setup_analysis()


@pytest.mark.parametrize(
    "model_name,target_result,analysis",
    [(k, v, model_all_analysis[k]) for k, v in target_results["all"].items()],
)
def test_full_analysis(model_name, target_result, analysis):
    sf_disagreement = 0
    for t, m in zip(target_result, analysis):
        for k, v in t.items():
            if isinstance(v, float):
                assert pytest.approx(v, abs=0.001) == m[k]
            else:
                if isinstance(v, dict):
                    for k_v, v_v in v.items():
                        if isinstance(v_v, float):
                            assert (
                                pytest.approx(v_v, abs=0.001, nan_ok=True) == m[k][k_v]
                            )
                        else:
                            assert v_v == m[k][k_v]
                else:
                    assert v == m[k]
    assert sf_disagreement < 10


@pytest.mark.parametrize("model_name", list(maia_lib.list_maias()))
def test_single_model(model_name):
    model_analysis = maia_lib.models[model_name].game_analysis(game_str)
    target_analysis = target_results[model_name]
    for t, m in zip(target_analysis, model_analysis):
        for k, v in t.items():
            assert v == m[k]
            if isinstance(v, dict):
                for k_v, v_v in v.items():
                    assert v_v == m[k][k_v]
