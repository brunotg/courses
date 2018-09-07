import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

// any action action type that ends in success will be handled here as well as in another reducer
// remember : we are handling the same action type in multiple reducers
// each reducer is simply a slice of state so a given action may impact multiple reducer
// DONT FORGET TO ADD YOUR REDUCER TO THE ROOT REDUCER
export default function ajaxStatusReducer(
  state = initialState.ajaxCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
    // use the success sufix to know when action is completed
  } else if (
    action.type === types.AJAX_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }
  return state;
}
