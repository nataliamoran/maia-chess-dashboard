from . import db_client

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


async def get_analyzed_games():
    anal = db_client.get_analysis_db()

    # generate list of analyzed game lichess ids
    cursor = anal['analyzed'].find()
    mids = await cursor.to_list(length=100000)
    ids = []
    for m in mids:
        ids += [m['_id']]
    return ids

async def get_user_games(username: str):
    """
    Given a username, max_num_games and pref_game_type (optional) return a list
    of games in the form:
    {
        ID: str,
        whitePlayer: str,
        blackPlayer: str,
        date: int
    }
    """
    games = await get_analyzed_games()
    info = []
    num_games = 0
    for game in games:
        states = await get_states(game, False)
        first_state = states[0]
        if username in (first_state['white_player'], first_state['black_player']):
            curr = {}
            curr['ID'] = first_state['game_id']
            curr['whitePlayer'] = first_state['white_player']
            curr['blackPlayer'] = first_state['black_player']
            curr['date'] = first_state['datetime']
            info.append(curr)
            num_games += 1
    return info, num_games


if __name__ == '__main__':
    username = 'maia1'
    max_num_games = 3
    get_user_games(username, max_num_games)
