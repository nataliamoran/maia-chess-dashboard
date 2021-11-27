from . import db_client

MODEL_NAME = "maia_kdd_1900"
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

async def get_analyzed_games(game_id: str):
    anal = db_client.get_analysis_db()

    # find the list of aggregates
    cursor = anal['stats'].find({'_id': game_id})
    stats = await cursor.to_list(length=1)
    return stats[0][MODEL_NAME]

async def get_filters(username: str, filters: str, games: list) -> dict:
    all_states = []
    for game in games:
        user_states = []
        states = await get_states(game, True)
        stats = await get_analyzed_games(game)
        prev_moves = {} # previous moves hashmap,
        count = 1
        prev_move = ["", ""]
        stockfish_moves = {}
        for state in states:
            if state['model'] == MODEL_NAME:
                prev_moves[state['board']] = (count, prev_move)
                prev_move = [state['player_move'][:2], state['player_move'][2:]]
                count += 1
                # Check whether or not to add curr state into list
                if state['active_player'] == username:
                    curr_state = {}
                    curr_state['ID'] = game
                    curr_state['whitePlayer'] = state['white_player']
                    curr_state['blackPlayer'] = state['black_player']
                    curr_state['date'] = state['datetime']
                    curr_state['averageStat'] = {
                        "performance": stats['avg_performance'],
                        "trickiness": stats['avg_trickiness'],
                        "entropy": stats['avg_entropy']
                    }
                    details = {}
                    details['move'] = f"{state['player_move'][:2]} {state['player_move'][2:]}"
                    details['FEN'] = state['board']
                    details['stat'] = {
                        "performance": state['performance'],
                        "trickiness": state['trickiness'],
                        "entropy": state['model_entropy']
                    }
                    details['maia_moves'] = [[state['model_move'][:2], state['model_move'][2:], state['model_top_policy']]]
                    curr_state['state'] = details
                    # check that the filter value exists
                    if isinstance(details['stat']['trickiness'], (int, float)) and isinstance(details['stat']['performance'], (int, float)) and isinstance(details['stat']['entropy'], (int, float)):
                        user_states.append(curr_state)
            elif state['model'] == STOCKFISH:
                stockfish_moves[state['board']] = [[state['model_move'][:2], state['model_move'][2:], state['model_optimal_winrate']]]
        for user_state in user_states:
            state = user_state['state']
            state['round'] = prev_moves[state['FEN']][0]
            state['last_move'] = prev_moves[state['FEN']][1]
            state['stockfish_moves'] = stockfish_moves[state['FEN']]
        all_states += user_states
    sorted_states = sorted(all_states, key=lambda x: x["state"]["stat"][filters], reverse=True)
    return sorted_states


if __name__ == "__main__":
    games = ["72FBfv3j"]
    username = "maia1"
    filters = "model_entropy"
    get_filters(username, filters, games)
