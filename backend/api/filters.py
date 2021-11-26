import requests


def get_filters(username: str, filters: str, games: list) -> dict:
    user_states = []
    for game in games:
        response = requests.get(
            f"http://dash-dev.maiachess.com/api/analysis/game_states/{game}?every=true")
        states = response.json()['game_states']
        for state in states:
            if state['active_player'] == username and state['model'] == "maia_kdd_1900":
                # check that the filter value exists
                if isinstance(state[filters], (int, float)):
                    user_states.append(state)
    sorted_states = sorted(user_states, key=lambda x: x[filters], reverse=True)
    return sorted_states


if __name__ == "__main__":
    games = ["dpReRq1J"]
    username = "maia1"
    filters = "performance"
    get_filters(username, filters, games)
