import axios from 'axios';
import {ActionSheetIOS} from 'react-native';
import {baseurl} from '../../Common/Baseurl';

export const SubscriptionPlan = (token) => {
  return (dispatch) => {
    axios({
      method: 'get',
      headers: {Authorization: 'Token ' + token},
      url: `${baseurl}api/v1/plans/all/`,
    })
      .then((response) => {
        dispatch({type: 'SubscriptionPlan', payload: response.data.results});
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addBenificiary = (data) => {
  return (dispatch) => {
    dispatch({type: 'addBeneficiary', payload: data});
  };
};

export const completeBeneficiary = () => {
  return (dispatch) => {
    dispatch({type: 'completeBeneficiary'});
  };
};

export const getAllBeneficiary = (token) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${baseurl}beneficiary/all/`,
      headers: {Authorization: 'Token ' + token},
    })
      .then((response) => {
        dispatch({type: 'GetBeneficiary', payload: response.data});
        dispatch({type: 'TOGGLE_LOAD'});
      })
      .catch((error) => {
        dispatch({type: 'FETCH_ERROR'});
        dispatch({type: 'TOGGLE_LOAD'});
      });
  };
};

export const getCallLogs = (token) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${baseurl}beneficiary/activity/`,
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => {
        dispatch({type: 'GetCallLogs', payload: response.data});
        dispatch({type: 'TOGGLE_LOAD'});
      })
      .catch((error) => {
        dispatch({type: 'FETCH_ERROR'});
        dispatch({type: 'TOGGLE_LOAD'});
      });
  };
};

export const unseenNotification = (token) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${baseurl}api/notification/active-count/`,
      headers: {Authorization: `Token ${token}`},
    })
      .then((response) => {
        dispatch({type: 'NotificationCount', payload: response.data.count});
      })
      .catch((err) => {});
  };
};

export const transactionPlan = (token) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${baseurl}api/v1/plans/active_transactions/`,
      headers: {
        Authorization: `Token 7636ff9efc4bf56c2019c57ed0ff67bcfc52f91b`,
      },
    })
      .then((response) => {
        // console.log(response, 'transaction');
        dispatch({type: 'transactionDetail', payload: response.data});
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  };
};
