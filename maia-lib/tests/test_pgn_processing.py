import os.path

import pytest

import maia_lib


@pytest.fixture
def games():
    return maia_lib.GamesFile(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "maia1_games_sample.pgn.bz2",
        )
    )


def test_mongo_read(games):
    assert next(games.iter_mongo_dicts())["game_id"] == "Tilkbsmo"
    for i, md in enumerate(games.iter_mongo_dicts()):
        assert len(md) == 27
    assert i == 98
    assert md["game_id"] == "xgSpMnvM"
    with pytest.raises(StopIteration):
        next(games.iter_mongo_dicts())


def test_positions_read(games):
    assert (
        next(games.iter_moves())[0].fen()
        == "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    )
    assert (
        next(games.iter_moves())[0].fen()
        == "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    )
    for i, (board, row) in enumerate(games.iter_moves()):
        assert len(row) == 32
        assert board.fen() == row["board"]
    assert i == 5108
    assert row["game_id"] == "xgSpMnvM"
    with pytest.raises(StopIteration):
        next(games.iter_moves())


def test_malformed_read_pos():
    gf = maia_lib.GamesFile(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "maia1_games_sample_malformed.pgn",
        )
    )
    for i, (board, row) in enumerate(gf.iter_moves()):
        assert len(row) == 32
        if i >= 95:
            break
    with pytest.raises(AttributeError):
        next(gf.iter_moves())


def test_malformed_read_mongo():
    gf = maia_lib.GamesFile(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "maia1_games_sample_malformed.pgn",
        )
    )
    it = gf.iter_mongo_dicts()
    assert len(next(it)) == 27
    assert len(next(it)) == 27
    with pytest.raises(AttributeError):
        next(it)


def test_game_with_evals():
    gf = maia_lib.GamesFile(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "maia1_games_sample_sf_evals.pgn.bz2",
        )
    )
    for i, (board, row) in enumerate(gf.iter_moves()):
        if i >= 10:
            break
        assert "pre_move_clock" in row
        assert "winrate_loss" in row
        assert len(row) == 46
    for i, row in enumerate(gf.iter_mongo_dicts()):
        if i >= 10:
            break
        assert row["has_clock"] is not None
        assert row["has_eval"] is not None
        assert len(row) == 27


@pytest.mark.parametrize("row_value", list(maia_lib.full_funcs_lst))
def test_all_row_values(row_value):
    gf = maia_lib.GamesFile(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "maia1_games_sample_sf_evals.pgn.bz2",
        )
    )
    for i, (board, row) in enumerate(gf.iter_moves()):
        if i >= 10:
            break
        assert row_value in row
        assert len(row) == 46
