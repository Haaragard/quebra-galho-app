import { combineReducers } from 'redux';

import user from './user';
import service from './service';

export default combineReducers({
    user,
    service,
});