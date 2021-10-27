import os.path
import io

import chess.pgn
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


@pytest.fixture
def header_dict(games):
    header_inf, _ = next(games)
    return header_inf


@pytest.fixture
def game_str(games):
    _, game_s = next(games)
    return game_s


def test_Event(header_dict):
    assert header_dict["Event"] == "Casual Rapid game"


def test_Site(header_dict):
    assert header_dict["Site"] == "https://lichess.org/Tilkbsmo"


def test_Date(header_dict):
    assert header_dict["Date"] == "2021.10.19"


def test_White(header_dict):
    assert header_dict["White"] == "Sash98"


def test_Black(header_dict):
    assert header_dict["Black"] == "maia1"


def test_Result(header_dict):
    assert header_dict["Result"] == "1-0"


def test_UTCDate(header_dict):
    assert header_dict["UTCDate"] == "2021.10.19"


def test_UTCTime(header_dict):
    assert header_dict["UTCTime"] == "18:36:52"


def test_WhiteElo(header_dict):
    assert header_dict["WhiteElo"] == "1641"


def test_BlackElo(header_dict):
    assert header_dict["BlackElo"] == "1603"


def test_BlackTitle(header_dict):
    assert header_dict["BlackTitle"] == "BOT"


def test_Variant(header_dict):
    assert header_dict["Variant"] == "Standard"


def test_TimeControl(header_dict):
    assert header_dict["TimeControl"] == "900+10"


def test_ECO(header_dict):
    assert header_dict["ECO"] == "D02"


def test_Termination(header_dict):
    assert header_dict["Termination"] == "Normal"


def test_game_str(game_str):
    assert (
        game_str
        == """[Event "Casual Rapid game"]
[Site "https://lichess.org/Tilkbsmo"]
[Date "2021.10.19"]
[White "Sash98"]
[Black "maia1"]
[Result "1-0"]
[UTCDate "2021.10.19"]
[UTCTime "18:36:52"]
[WhiteElo "1641"]
[BlackElo "1603"]
[BlackTitle "BOT"]
[Variant "Standard"]
[TimeControl "900+10"]
[ECO "D02"]
[Termination "Normal"]

1. Nf3 d5 2. d4 Nc6 3. Bf4 Nf6 4. e3 e6 5. c3 Bd6 6. Bg3 Bxg3 7. hxg3 O-O 8. Qc2 Ne4 9. Ne5 Nxe5 10. dxe5 Qg5 11. f3 Nxg3 12. Qxh7# 1-0"""
    )


def test_game_len(game_str):
    game = chess.pgn.read_game(io.StringIO(game_str))
    assert len(list(game.mainline_moves())) == 12 * 2 - 1


def test_game_from_str(game_str):
    gf = maia_lib.GamesFile(game_str)
    _, game_s = next(gf)
    assert game_s == game_str


def test_game_from_io(game_str):
    gf = maia_lib.GamesFile(io.StringIO(game_str))
    _, game_s = next(gf)
    assert game_s == game_str


def test_game_from_uncompress():
    gf = maia_lib.GamesFile(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "maia1_games_sample_positional.pgn",
        )
    )
    for i, (header, game_s) in enumerate(gf):
        assert "anonymous_2012" in [header["White"], header["Black"]]
    assert i == 49
    assert (
        game_s
        == """[Event "Casual Standard game"]
[Site "https://lichess.org/qc3snxoN"]
[Date "2021.09.10"]
[White "maia1"]
[Black "anonymous_2012"]
[Result "0-1"]
[UTCDate "2021.09.10"]
[UTCTime "07:30:11"]
[WhiteElo "1646"]
[BlackElo "1473"]
[WhiteTitle "BOT"]
[Variant "From Position"]
[TimeControl "30+0"]
[ECO "?"]
[Termination "Normal"]
[FEN "kqqqqqqq/qqqqqqqq/qqqqqqqq/qqPPPPqq/qqPK1Pqq/qqP1PPqq/qqPPPqqq/qqqqqqqq w - - 0 1"]
[SetUp "1"]

1. Kd3 Qcxd5# 0-1"""
    )


def test_game_malformed():
    gf = maia_lib.GamesFile(
        os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            "games",
            "maia1_games_sample_malformed.pgn",
        )
    )
    for i, (header, _) in enumerate(gf):
        assert "anonymous_2012" in [header["White"], header["Black"]]
        if i >= 1:
            break
    with pytest.raises(AttributeError):
        next(gf)


def test_fail_to_close(games):
    games.file = "NOT A FILE"
    del games
