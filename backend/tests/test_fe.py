import asyncio
import unittest
import lichess.api

from unittest import TestCase, mock
from fastapi import status
from pymongo.results import InsertOneResult

from api import fe_router, dashboard_router
from bson import json_util

from api.models import UserFeedbackModel


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


if __name__ == '__main__':
    unittest.main()
