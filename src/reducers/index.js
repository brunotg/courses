import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

/**
 * This is the root reducer
 * The property name that we supply here impacts the property that we willl access throughout the app
 */
const rootReducer = combineReducers({
    courses,
    authors,
    ajaxCallsInProgress
});

export default rootReducer;