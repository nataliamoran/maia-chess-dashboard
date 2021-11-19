import asyncio
import unittest
import lichess.api

from unittest import TestCase, mock
from fastapi import status
from pymongo.results import InsertOneResult

from api import fe_router, dashboard_router, analysis_router
from bson import json_util

from api.models import UserFeedbackModel, UserFeedbackRatingModel, GameNumModel, EventModel


def async_return(result):
    f = asyncio.Future()
    f.set_result(result)
    return f


def json2dict(json):
    res = json_util.loads(json)
    if isinstance(res, dict):
        return res
    return json_util.loads(res)


class TestDashboard(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.loop = asyncio.get_event_loop()

    @classmethod
    def tearDownClass(cls) -> None:
        cls.loop.close()

    @mock.patch("api.dashboard_router.send_user_feedback")
    def test_add_user_feedback__return_201(self, fe_user_feedback):
        # arrange
        expected_result = {"feedback": True}
        fe_user_feedback.return_value = expected_result
        user_feedback = UserFeedbackModel(username='user1', feedback="Loved the app!")

        # act
        res = self.loop.run_until_complete(fe_router.send_user_feedback(user_feedback))

        # assert
        self.assertEqual(expected_result, res)

    @mock.patch("api.dashboard_router.send_user_feedback_rating")
    def test_add_user_feedback_rating__success(self, fe_user_feedback_rating):
        # arrange
        expected_result = {"feedback_rating": True}
        fe_user_feedback_rating.return_value = expected_result
        user_feedback_rating = UserFeedbackRatingModel(username='user1', thumb_up=1, thumb_down=0)

        # act
        res = self.loop.run_until_complete(fe_router.send_user_feedback_rating(user_feedback_rating))

        # assert
        self.assertEqual(expected_result, res)

    @mock.patch("api.analysis_router.get_analyzed_games_num")
    def test_get_analyzed_games_num__success(self, fe_analyzed_games_num):
        # arrange
        expected_result = {"analyzed_games_num": True}
        fe_analyzed_games_num.return_value = expected_result

        # act
        res = self.loop.run_until_complete(analysis_router.get_analyzed_games_num('user1'))

        # assert
        self.assertEqual(expected_result, res)

    @mock.patch("api.dashboard_router.log_fe_event")
    def test_log_fe_event__success(self, fe_log_event):
        # arrange
        expected_result = {"log_event": True}
        fe_log_event.return_value = expected_result

        event_log = EventModel(event_title='event1', event_status={})

        # act
        res = self.loop.run_until_complete(dashboard_router.log_fe_event(event_log))

        # assert
        self.assertEqual(expected_result, res)


if __name__ == '__main__':
    unittest.main()
