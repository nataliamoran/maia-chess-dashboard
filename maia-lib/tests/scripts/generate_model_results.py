import os.path

# Previous implementation
import maia_personalize

import glob
import json

models_dir = "../../maia_lib/model_utils/maia/"
games_path = "../games/maia1_games_sample.pgn.bz2"
out_file = "../games/sample_results.json"


def main():
    model_paths = glob.glob(os.path.join(models_dir, "*.pb.gz"))
    full_ret = {}
    for mp in sorted(model_paths):
        model = maia_personalize.Leela_net(mp)
        results = []
        for i, (board, row) in enumerate(
            maia_personalize.GamesFileStream(games_path).iter_samples()
        ):
            if i >= 1000:
                break
            if i % 10 != 0:
                continue
            print(f"{mp} : {i}", end="\r")
            p, v = model.eval_board(board)
            results.append(
                {
                    "game_id": row["game_id"],
                    "move_ply": row["move_ply"],
                    "board": board.fen(),
                    "pol": p,
                    "val": v,
                }
            )
        full_ret[os.path.basename(mp)[:-6]] = results
    with open(out_file, "wt") as f:
        json.dump(full_ret, f, indent=2)


if __name__ == "__main__":
    main()
