# maia-lib

This is the CSSLab internal code for using Maia. Please do not distribute without permission.


# Install

If you have SSH auth for Github setup on the machine you can use pip:

```
# SSH
pip install git+ssh://git@github.com/CSSLab/maia-lib.git

# Password
pip install git+https://github.com/CSSLab/maia-lib.git
```

Or if you can also clone the repo and install locally

```
git clone git@github.com:CSSLab/maia-lib.git
pip install maia-lib
```

# Game Features

The features extacted from games are and their range of values are give here:
```
probabilities (p) [0,1]
winrate [0,1]
entropy (0,∞) # Mostly between .5 and 3
trickiness [0,1]
performance [-1, 1]
```
# Features

## Local Maia

```
import maia_lib
import chess

p, v = maia_lib.models.maia_kdd_1100.eval_board(chess.Board())
p['e2e4]
# 0.6605616807937622
p['d2d4]
# 0.20976726710796356
```


## PGN parsing

```
import io
import requests

r = requests.get("https://lichess.org/api/games/user/maia1?max=10")

games = maia_lib.GamesFile(io.StringIO(r.text))

next(games)[0]['Site']
# 'https://lichess.org/oHgKxIrR'

mongo_dicts = games.iter_mongo_dicts()
next(mongo_dicts)
# {
# 'game_id': '99x3xSxY',
# 'game_type': 'Casual Rapid',
# 'is_lichess': True,
# 'date': '2021.10.15',
# 'time': '07:49:20',
# 'datetime': '2021.10.15 07:49:20',
# 'result': '0-1',
# 'white_player': 'maia1',
# 'black_player': 'ArqiTex',
# 'white_title': 'BOT',
# 'black_title': None,
# 'white_elo': 1636,
# 'black_elo': 1549,
# 'eco': 'A00',
# 'time_control': '900+0',
# 'increment': 0,
# 'termination': 'Normal',
# 'white_won': False,
# 'black_won': True,
# 'no_winner': False,
# 'has_clock': False,
# 'has_eval': False,
# 'game_ply': 15,
# 'full_date': datetime.datetime(2021, 10, 15, 7, 49, 20),
# 'termination_condition': 'mate',
# '_id': '99x3xSxY',
# 'pgn': '[Event "Casual Rapid game"]\n[Site "https://lichess.org/99x3xSxY"]\n[Date "2021.10.15"]\n[White "maia1"]\n[Black "ArqiTex"]\n[Result "0-1"]\n[UTCDate "2021.10.15"]\n[UTCTime "07:49:20"]\n[WhiteElo "1636"]\n[BlackElo "1549"]\n[WhiteTitle "BOT"]\n[Variant "Standard"]\n[TimeControl "900+0"]\n[ECO "A00"]\n[Termination "Normal"]\n\n1. g3 e5 2. Bg2 d5 3. c3 Nf6 4. d4 Nc6 5. dxe5 Nxe5 6. Bg5 Be6 7. Bxf6 gxf6 8. Nf3 h5 9. Nxe5 fxe5 10. O-O h4 11. gxh4 Qxh4 12. h3 O-O-O 13. Kh2 Bxh3 14. Bxh3+ Qxh3+ 15. Kg1 Qh2# 0-1'
# }
```

## Game Analysis

```
game_header, game_string = next(games)
game_analysis = maia_lib.maia_game_analysis(game_string, 'maia_kdd_1100')
game_analysis[-1]

# {
# 'game_id': '87BUkY8P',
# 'game_type': 'Casual Rapid',
# 'is_lichess': True,
# 'date': '2021.10.15',
# 'time': '08:37:27',
# 'datetime': '2021.10.15 08:37:27',
# 'url': 'https://lichess.org/87BUkY8P',
# 'result': '1-0',
# 'white_player': 'maia1',
# 'black_player': 'ovineh',
# 'white_title': 'BOT',
# 'black_title': '',
# 'white_elo': 1637,
# 'black_elo': 912,
# 'eco': 'B01',
# 'time_control': '300+5',
# 'increment': 5,
# 'termination': 'Normal',
# 'white_won': True,
# 'black_won': False,
# 'no_winner': False,
# 'num_ply': 15,
# 'termination_condition': 'resign',
# 'move_ply': 14,
# 'move': 'a2a3',
# 'board': 'r1bqkbnr/ppp1pppp/8/8/1n1P4/2N2N2/PPP1BPPP/R1BQ1RK1 w kq - 1 8',
# 'white_active': True,
# 'active_player': 'maia1',
# 'is_capture': False,
# 'active_won': True,
# 'active_elo': 1637,
# 'opponent_elo': 912,
# 'model_value': 1.03616464138031,
# 'model_move': 'a2a3',
# 'model_top_policy': 0.5452896952629089,
# 'player_move_policy': 0.5452896952629089,
# 'model_policy_dict': {
#  'a2a3': 0.5452896952629089,
#  'c1f4': 0.0921335443854332,
#  'c1d2': 0.07295380532741547,
#  'e2b5': 0.050706397742033005,
#  'e2c4': 0.041911229491233826,
#  'c1e3': 0.0386689119040966,
#  'd4d5': 0.03637094050645828,
#  'f1e1': 0.024309899657964706,
#  'f3e5': 0.021473491564393044,
#  'c3b5': 0.011227888986468315,
#  'b2b3': 0.01028724666684866,
#  'c1g5': 0.009984767995774746,
#  'h2h3': 0.009970313869416714,
#  'c3e4': 0.007964521646499634,
#  'd1d2': 0.006580886896699667,
#  'f3g5': 0.005691954866051674,
#  'e2d3': 0.002501800889149308,
#  'c3a4': 0.002292812103405595,
#  'a2a4': 0.002124559134244919,
#  'd1e1': 0.0014191385125741363,
#  'c3d5': 0.0011243242770433426,
#  'f3d2': 0.0009820574196055532,
#  'c3b1': 0.0006991708651185036,
#  'g2g3': 0.0006986086955294013,
#  'a1b1': 0.0006328079616650939,
#  'f3e1': 0.00048095997772179544,
#  'd1d3': 0.0004096181073691696,
#  'f3h4': 0.0003830526547972113,
#  'c1h6': 0.0002418410440441221,
#  'g1h1': 0.00015180556511040777,
#  'h2h4': 0.00014040939277037978,
#  'e2a6': 0.00013907073298469186,
#  'g2g4': 5.2463303291006014e-05},
# 'model_entropy': 2.6427920602381842,
# 'model_correct': True
# }
```

# TODO

+ API Doc
+ Units tests
+ Training
+ UCI
