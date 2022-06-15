import {actionType} from '../acitonType';
import axios from 'axios';
import _ from 'lodash';
import {apiUrl} from '../../api/api';
import {getData} from '../../utils';
const {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
} = actionType;
const {GET_NOTIFICATION_LIST} = apiUrl;

export const notifications = () => async (dispatch) => {
  dispatch({type: GET_NOTIFICATIONS});
  try {
    const token = await getData('token');
    const result = await axios.get(GET_NOTIFICATIONS, {
      headers: {Authorization: `Bearer ${token}`},
    });
    dispatch({type: GET_NOTIFICATIONS_SUCCESS, payload: result.data});
  } catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Error occurred. Please try again";
    dispatch({
      type: GET_NOTIFICATIONS_FAIL,
      payload: {msg},
    });
  }
};
