/*eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import routes from "./routes";
// dispatch to bring initial state
import { loadCourses } from "./actions/courseActions";
import { loadAuthors } from "./actions/authorActions";
import "./styles/styles.css"; // webpack can import css files
//import '~/node_modules/bootstrap/dist/bootstrap.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/toastr/build/toastr.min.css";

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("app")
);
