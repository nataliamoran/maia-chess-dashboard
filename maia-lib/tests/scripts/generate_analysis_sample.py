import os.path
import maia_lib
import json

maia_lib.models.stockfish.threads = 1
maia_lib.models.stockfish.default_depth = 1


def main():
    gf = maia_lib.GamesFile(
        os.path.join("../games/maia1_games_sample_sf_evals.pgn.bz2")
    )
    game_str = next(gf)[1]

    rets = {}
    for model_name in maia_lib.list_maias():
        rets[model_name] = maia_lib.models[model_name].game_analysis(game_str)

    rets["all"] = maia_lib.full_game_analysis(game_str)

    with open("../games/game_analysis.json", "wt") as f:
        json.dump(rets, f, indent=2)


if __name__ == "__main__":
    main()
