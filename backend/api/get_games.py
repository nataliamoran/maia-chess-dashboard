import lichess.api


def get_user_games(username: str, max_num_games: int, pref_game_type=None):
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
    games = lichess.api.user_games(
        username, max=max_num_games, perfType=pref_game_type)
    info = []
    isEmpty = False
    while not isEmpty:
        try:
            val = next(games)
            curr = {}
            curr['ID'] = val['id']
            curr['whitePlayer'] = val['players']['white']['user']['name']
            curr['blackPlayer'] = val['players']['black']['user']['name']
            curr['date'] = val['lastMoveAt']
            info.append(curr)
        except:
            isEmpty = True
    return info


if __name__ == '__main__':
    username = 'maia1'
    max_num_games = 3
    get_user_games(username, max_num_games)
