import numpy as np

from ..model_utils import models, list_maias


def full_game_analysis(game_pgn):
    sf_ret = models["stockfish"].game_analysis(game_pgn)
    rets_dict = {}
    for m_name in list_maias():
        m_analysis = models[m_name].game_analysis(game_pgn)
        for sf_a, m_a in zip(sf_ret, m_analysis):
            m_a["trickiness"] = position_trickiness(
                sf_a["winrate_vec"], m_a["model_policy_dict"]
            )
            m_a["performance"] = position_performance(
                sf_a["winrate_vec"],
                m_a["model_policy_dict"],
                m_a["player_move"],
            )
            m_a["quadrants"] = position_quadrants(
                sf_a["winrate_vec"],
                m_a["model_policy_dict"],
                m_a["player_move"],
            )
        rets_dict[m_name] = m_analysis
    rets_dict["stockfish"] = sf_ret
    return rets_dict


def position_trickiness(sf_winrates, maia_probs):
    a = np.array([maia_probs[m] * sf_winrates[m] for m in maia_probs.keys()])
    return np.nansum(a)


def position_performance(sf_winrates, maia_probs, player_move):
    trickiness = position_trickiness(maia_probs, sf_winrates)
    return sf_winrates[player_move] - trickiness


def position_entropy(maia_probs):
    a = np.array(list(maia_probs.values()))
    return -1.0 * np.nansum(a * np.log2(a))

def position_quadrants(sf_winrates, maia_probs, player_move):
    quads = {}
    quads['q1'] = [m_m for ((m_m, m_p), sf_w) in zip(maia_probs.items(), sf_winrates.values()) if m_p > maia_probs[player_move] and sf_w >sf_winrates[player_move]]
    quads['q2'] = [m_m for ((m_m, m_p), sf_w) in zip(maia_probs.items(), sf_winrates.values()) if m_p < maia_probs[player_move] and sf_w >sf_winrates[player_move]]
    quads['q3'] = [m_m for ((m_m, m_p), sf_w) in zip(maia_probs.items(), sf_winrates.values()) if m_p < maia_probs[player_move] and sf_w <sf_winrates[player_move]]
    quads['q4'] =   [m_m for ((m_m, m_p), sf_w) in zip(maia_probs.items(), sf_winrates.values()) if m_p > maia_probs[player_move] and sf_w <sf_winrates[player_move]]
    return quads
