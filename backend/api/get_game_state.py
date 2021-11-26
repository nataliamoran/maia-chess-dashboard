import lichess.api

from . import db_client

STOCKFISH = "stockfish"

async def get_states(game_id, every):
    anal = db_client.get_analysis_db()

    cursor = anal['game_states'].find({'game_id': game_id})
    if every:
        states = await cursor.to_list(length=100000000)  # arbitrary value to change
    else:
        states = await cursor.to_list(length=100)

    def serialize_dict(d: dict):
        for k, v in d.items():
            if v != v:
                d[k] = 'NaN'
            if v == -0.0:
                d[k] = 0.0
            if type(v) == dict:
                serialize_dict(v)
    for s in states:
        serialize_dict(s)
    return states

async def get_pgns(gameId):
    game = lichess.api.game(gameId)
    moves = game['moves']
    list_of_moves = moves.split(" ")
    return list_of_moves[:-1]


async def get_fens(gameId: str):
    all_states = await get_states(gameId, True)
    sf_states = []
    for state in all_states:
        if state['model'] == STOCKFISH:
            sf_states.append(state['board'])
    return sf_states[1:]


async def get_game_states(gameId):
    fens = await get_fens(gameId)
    pgns = await get_pgns(gameId)
    n = len(fens)
    if len(fens) != len(pgns):
        return -1
    game_states = []
    for i in range(n):
        curr = {}
        curr['FEN'] = fens[i]
        curr['PGN'] = pgns[i]
        game_states.append(curr)
    return game_states


if __name__ == "__main__":
    gameId = "dpReRq1J"
    get_game_states(gameId)
