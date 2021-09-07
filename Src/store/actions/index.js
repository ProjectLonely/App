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

  console.log(request, 'request');
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
    payload: '',
  };
}
