import axios from 'axios';
import {baseurl} from '../../Common/Baseurl';

export function SubscriptionPlan() {
  //   const request =
  //   axios({
  //     method: 'get',
  //     url: `${baseurl}`,
  //     data: {},
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // .get('https://s1-api.pizzan.is/api/v1/drinks')
  // .then((response) => response.data);

  return {
    type: 'SubscriptionPlan',
    payload: [
      {
        id: '1',
        name: 'Tier 1',
        descriptionArray: [
          {id: '1', description: 'up to one call a week'},
          {id: '2', description: '*limited outbound calls'},
        ],
        price: '60',
        duration: 'month',
        image: require('../../Assets/Images/callcenter.png'),
      },
      {
        id: '2',
        name: 'Tier 2',
        descriptionArray: [
          {id: '3', description: 'up to 3 scheduled calls per week'},
          {id: '4', description: 'Plus limited on-demand calls'},
        ],
        price: '150',
        duration: 'month',
        image: require('../../Assets/Images/callcenter.png'),
      },
      {
        id: '3',
        name: 'Tier 3',
        descriptionArray: [
          {id: '5', description: 'up to 7 scheduled calls per week'},
          {id: '6', description: 'Plus limited on-demand calls'},
        ],
        price: '300',
        duration: 'month',
        image: require('../../Assets/Images/callcenter.png'),
      },
    ],
  };
}

export function addBenificiary(data) {
  console.log(data, 'data');

  return {
    type: 'addBeneficiary',
    payload: data,
  };
}
