import {combineReducers} from 'redux';
import SubscriptionPlan from './SubscriptionPlan';
import AddBeneficiaryReducer from './AddBeneficiaryReducer';
import GetBeneficiary from './GetBeneficiary';
import GetCallLogs from './GetCallLogs';
import unseenNotification from './NotificationReducer';
import TransactionReducer from './TransactionReducer';

const rootreducer = combineReducers({
  SubscriptionPlan,
  AddBeneficiaryReducer,
  GetBeneficiary,
  GetCallLogs,
  unseenNotification,
  TransactionReducer,
});

export default rootreducer;
