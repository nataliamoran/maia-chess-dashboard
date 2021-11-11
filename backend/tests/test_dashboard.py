import asyncio
import unittest
import lichess.api

from unittest import TestCase, mock
from fastapi import status
from pymongo.results import InsertOneResult

from api import dashboard_router
from bson import json_util

from api.dashboard_router import get_user_profile_from_lichess


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
    def test_dashboard__user_not_exist(self, dashboard_db_mock):
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
    def test_dashboard__user_exist(self, dashboard_db_mock):
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
    def test_add_username_to_maia_db__user_exists(self, dashboard_db_mock):
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
    def test_add_username_to_maia_db__user_created(self, dashboard_db_mock):
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
    def test_get_exisiting_lichess_user(self, lichess_user_mock):
        sample_user = {"id": "maia1", }
        lichess_user_mock.return_value = sample_user
        # act
        res = self.loop.run_until_complete(get_user_profile_from_lichess('maia1'))
        # assert
        self.assertEqual(status.HTTP_200_OK, res.status_code)
        output = json2dict(res.body.decode('utf8'))
        self.assertEqual({"lichess_id": 'maia1', "lichess_info": sample_user}, output)

    @mock.patch('lichess.api.user')
    def test_get_non_exisiting_lichess_user(self, lichess_user_mock):
        lichess_user_mock.side_effect = lichess.api.ApiError()
        # act
        res = self.loop.run_until_complete(get_user_profile_from_lichess('no_user'))
        # assert
        self.assertEqual(status.HTTP_200_OK, res.status_code)
        body = res.body.decode('utf8')
        self.assertEqual('null', body)


if __name__ == '__main__':
    unittest.main()
