import requests
import lichess.api


def get_pgns(gameId):
    game = lichess.api.game('dpReRq1J')
    moves = game['moves']
    list_of_moves = moves.split(" ")
    return list_of_moves


def get_fens(gameId: str):
    #  get information about analyzed games do we want to query our api? probably not
    response = requests.get(
        f"http://dash-dev.maiachess.com/api/analysis/game_states/{gameId}?every=false")
    game_states = response.json()['game_states']
    num_states = len(game_states)
    list_of_fens = []
    seen_boards = set()
    for state in game_states:
        if state['board'] not in seen_boards:
            curr = {}
            list_of_fens.append(state['board'])
            seen_boards.add(state['board'])
    return list_of_fens


def get_game_states(gameId):
    fens = get_fens(gameId)
    pgns = get_pgns(gameId)
    n = len(fens)
    if len(fens) != len(pgns):
        return -1
    game_states = []
    for i in range(n):
        curr = {}
        curr['FEN'] = fens[i]
        curr['PGN'] = pgns[i]
        game_states.append(curr)
    return len(game_states)


if __name__ == "__main__":
    gameId = "dpReRq1J"
    print(get_game_states(gameId))
