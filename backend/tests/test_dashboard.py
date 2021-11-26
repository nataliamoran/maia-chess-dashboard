import asyncio
import unittest
import lichess.api

from unittest import TestCase, mock
from fastapi import status
from pymongo.results import InsertOneResult

from api import dashboard_router, fe_router, analysis_router
from bson import json_util

from api.dashboard_router import get_user_profile_from_lichess
from api.models import UserFeedbackModel, UserFeedbackRatingModel, EventModel


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

    @mock.patch("api.db_client.get_dashboard_db")
    def test_dashboard__dashboard__user_not_exist(self, dashboard_db_mock):
        # arrange
        table = mock.MagicMock()
        table.find_one.return_value = async_return(None)
        client_mock = mock.MagicMock()
        client_mock.__getitem__.return_value = table
        dashboard_db_mock.return_value = client_mock

        # act
        res = self.loop.run_until_complete(dashboard_router.find_username_in_maia_db('user1'))

        # assert
        self.assertEqual(status.HTTP_200_OK, res.status_code)
        body = res.body.decode('utf8')
        self.assertEqual('null', body)

    @mock.patch("api.db_client.get_dashboard_db")
    def test_dashboard__dashboard__user_exist(self, dashboard_db_mock):
        # arrange
        expected_json = {"exists": True}
        table = mock.MagicMock()
        table.find_one.return_value = async_return(expected_json)
        client_mock = mock.MagicMock()
        client_mock.__getitem__.return_value = table
        dashboard_db_mock.return_value = client_mock

        # act
        res = self.loop.run_until_complete(dashboard_router.find_username_in_maia_db('user1'))

        # assert
        self.assertEqual(status.HTTP_200_OK, res.status_code)
        actual_json = json2dict(res.body.decode('utf8'))
        self.assertEqual(expected_json, actual_json)

    @mock.patch("api.db_client.get_dashboard_db")
    def test_dashboard__add_username_to_maia_db__user_exists(self, dashboard_db_mock):
        # arrange
        table = mock.MagicMock()
        table.find_one.return_value = async_return({"exists": True})
        client_mock = mock.MagicMock()
        client_mock.__getitem__.return_value = table
        dashboard_db_mock.return_value = client_mock

        # act
        res = self.loop.run_until_complete(dashboard_router.add_username_to_maia_db('user1'))

        # assert
        self.assertEqual(status.HTTP_306_RESERVED, res.status_code)
        actual_json = json2dict(res.body.decode('utf8'))
        self.assertEqual({"reserved": "user1 already exists"}, actual_json)
        table.insert_one.assert_not_called()

    @mock.patch("api.db_client.get_dashboard_db")
    def test_dashboard__add_username_to_maia_db__user_created(self, dashboard_db_mock):
        # arrange
        expected_result = {"exists": True}
        table = mock.MagicMock()
        table.find_one.side_effect = [async_return(None), async_return(expected_result), ]
        table.insert_one.return_value = async_return(InsertOneResult(1, True))
        client_mock = mock.MagicMock()
        client_mock.__getitem__.return_value = table
        dashboard_db_mock.return_value = client_mock

        # act
        res = self.loop.run_until_complete(dashboard_router.add_username_to_maia_db('user1'))

        # assert
        self.assertEqual(status.HTTP_201_CREATED, res.status_code)
        actual_json = json2dict(res.body.decode('utf8'))
        self.assertEqual(expected_result, actual_json)

    @mock.patch('lichess.api.user')
    def test_dashboard__get_exisiting_lichess_user(self, lichess_user_mock):
        sample_user = {"id": "maia1", }
        lichess_user_mock.return_value = sample_user
        # act
        res = self.loop.run_until_complete(get_user_profile_from_lichess('maia1'))
        # assert
        self.assertEqual(status.HTTP_200_OK, res.status_code)
        output = json2dict(res.body.decode('utf8'))
        self.assertEqual({"lichess_id": 'maia1', "lichess_info": sample_user}, output)

    @mock.patch('lichess.api.user')
    def test_dashboard__get_non_exisiting_lichess_user(self, lichess_user_mock):
        lichess_user_mock.side_effect = lichess.api.ApiError()
        # act
        res = self.loop.run_until_complete(get_user_profile_from_lichess('no_user'))
        # assert
        self.assertEqual(status.HTTP_200_OK, res.status_code)
        body = res.body.decode('utf8')
        self.assertEqual('null', body)

    @mock.patch("api.db_client.get_dashboard_db")
    def test_dashboard__add_user_feedback__return_201(self, dashboard_db_mock):
        # arrange
        expected_result = {"feedback": True}
        table = mock.MagicMock()
        table.find_one.return_value = async_return(expected_result)
        table.insert_one.return_value = async_return(InsertOneResult(1, True))
        client_mock = mock.MagicMock()
        client_mock.__getitem__.return_value = table
        dashboard_db_mock.return_value = client_mock

        user_feedback = UserFeedbackModel(username='user1', feedback="Loved the app!")

        # act
        res = self.loop.run_until_complete(dashboard_router.send_user_feedback(user_feedback))

        # assert
        self.assertEqual(status.HTTP_201_CREATED, res.status_code)
        actual_json = json2dict(res.body.decode('utf8'))
        self.assertEqual(expected_result, actual_json)

    @mock.patch("api.db_client.get_dashboard_db")
    def test_dashboard__add_user_feedback_rating__return_201(self, dashboard_db_mock):
        # arrange
        expected_result = {"feedback_rating": True}
        table = mock.MagicMock()
        table.find_one.return_value = async_return(expected_result)
        table.insert_one.return_value = async_return(InsertOneResult(1, True))
        client_mock = mock.MagicMock()
        client_mock.__getitem__.return_value = table
        dashboard_db_mock.return_value = client_mock

        user_feedback_rating = UserFeedbackRatingModel(username='user1', thumb_up=1, thumb_down=0, state={})

        # act
        res = self.loop.run_until_complete(dashboard_router.send_user_feedback_rating(user_feedback_rating))

        # assert
        self.assertEqual(status.HTTP_201_CREATED, res.status_code)
        actual_json = json2dict(res.body.decode('utf8'))
        self.assertEqual(expected_result, actual_json)

    @mock.patch("api.db_client.get_dashboard_db")
    def test_dashboard__fe_event_log__return_201(self, dashboard_db_mock):
        # arrange
        expected_result = {"event_log": True}
        table = mock.MagicMock()
        table.find_one.return_value = async_return(expected_result)
        table.insert_one.return_value = async_return(InsertOneResult(1, True))
        client_mock = mock.MagicMock()
        client_mock.__getitem__.return_value = table
        dashboard_db_mock.return_value = client_mock

        event_log = EventModel(event_title='event1', event_status={})

        # act
        res = self.loop.run_until_complete(dashboard_router.log_fe_event(event_log))

        # assert
        self.assertEqual(status.HTTP_201_CREATED, res.status_code)
        actual_json = json2dict(res.body.decode('utf8'))
        self.assertEqual(expected_result, actual_json)

    @mock.patch("api.dashboard_router.send_user_feedback")
    def test_fe__add_user_feedback__return_201(self, fe_user_feedback):
        # arrange
        expected_result = {"feedback": True}
        fe_user_feedback.return_value = expected_result
        user_feedback = UserFeedbackModel(username='user1', feedback="Loved the app!")

        # act
        res = self.loop.run_until_complete(fe_router.send_user_feedback(user_feedback))

        # assert
        self.assertEqual(expected_result, res)

    @mock.patch("api.dashboard_router.send_user_feedback_rating")
    def test_fe__add_user_feedback_rating__success(self, fe_user_feedback_rating):
        # arrange
        expected_result = {"feedback_rating": True}
        fe_user_feedback_rating.return_value = expected_result
        user_feedback_rating = UserFeedbackRatingModel(username='user1', thumb_up=1, thumb_down=0, state={})

        # act
        res = self.loop.run_until_complete(fe_router.send_user_feedback_rating(user_feedback_rating))

        # assert
        self.assertEqual(expected_result, res)

    @mock.patch("api.analysis_router.get_analyzed_games_num")
    def test_fe__get_analyzed_games_num__success(self, fe_analyzed_games_num):
        # arrange
        expected_result = {"analyzed_games_num": True}
        fe_analyzed_games_num.return_value = expected_result

        # act
        res = self.loop.run_until_complete(analysis_router.get_analyzed_games_num('user1'))

        # assert
        self.assertEqual(expected_result, res)

    @mock.patch("api.dashboard_router.log_fe_event")
    def test_fe__log_fe_event__success(self, fe_log_event):
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
