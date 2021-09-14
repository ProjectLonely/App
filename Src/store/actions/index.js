import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';

export function SubscriptionPlan(token) {
  const request = axios({
    method: 'get',
    headers: {Authorization: 'Token ' + token},
    url: `${baseurl}plans/`,
  })
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return {
    type: 'SubscriptionPlan',
    payload: request,
  };
}

export function addBenificiary(data) {
  return {
    type: 'addBeneficiary',
    payload: data,
  };
}
export function completeBeneficiary() {
  return {
    type: 'completeBeneficiary',
  };
}

export function getAllBeneficiary(token) {
  const request = axios({
    method: 'get',
    url: `${baseurl}beneficiary/all/`,
    headers: {Authorization: 'Token ' + token},
  })
    .then((response) => response.data.reverse())
    .catch((err) => err.response.data);
  return {
    type: 'GetBeneficiary',
    payload: request,
  };
}

export function getCallLogs(token) {
  const request = axios({
    method: 'get',
    url: `${baseurl}beneficiary/activity/`,
    headers: {Authorization: `Token ${token}`},
  })
    .then((response) => response.data)
    .catch((err) => console.log(err));
  return {
    type: 'GetCallLogs',
    payload: request,
  };
}
