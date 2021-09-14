import {combineReducers} from 'redux';
import SubscriptionPlan from './SubscriptionPlan';
import AddBeneficiaryReducer from './AddBeneficiaryReducer';
import GetBeneficiary from './GetBeneficiary';
import GetCallLogs from './GetCallLogs';

const rootreducer = combineReducers({
  SubscriptionPlan,
  AddBeneficiaryReducer,
  GetBeneficiary,
  GetCallLogs,
});

export default rootreducer;
