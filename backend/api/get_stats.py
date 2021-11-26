import lichess.api


def get_user_stats(username):
    li = lichess.api.user(username)
    res = {
        "p": 0.006,
        "t": 0.3936,
        "e": 2.156
    }
    print(li)


if __name__ == "__main__":
    get_user_stats('maia1')
