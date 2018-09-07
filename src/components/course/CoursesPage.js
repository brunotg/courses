import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
import CourseList from "./CourseList";
import { browserHistory } from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    const { courses } = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
              value="Add Course"
              className="btn btn-primary"
              onClick={this.redirectToAddCoursePage} />
        <CourseList courses={courses} />
      </div>
    );
  }
}
//export default CoursesPage;

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * connect state props
 * @param {*} state  represents course data within redux store
 * @param {*} ownProps lets us access props attached within this component
 */
function mapStateToProps(state, ownProps) {
  return {
    // makes this.props.courses available
    // matches the name in the courses reducer (index.js)
    courses: state.courses // accessing the course data within the redux store
  };
}

// export a component decorated  by react-reduct's connect function
// this is two function calls: the connect function returns a function, and that function calls the container component with the result of the first function
//-- implementation notes: if we ommit the mapDispatchToProps (what actions are exposed to your component)
//-- our component automatically gets a dispatch in our props: this.props.dispatch
//export default connect(mapStateToProps /*, mapDispatchToProps*/ )(CoursesPage);

/**
 * what actions are available to the component
 * @param {*} dispatch injected by the connect function
 */
/*
function mapDispatchToProps(dispatch) {
  return {
    // actions need to be wrapped in a call to dispatch
    createCourse: course => dispatch(courseActions.createCourse(course))
  };
}
*/
/**
 * Another way to bind to the action creators
 * @param {*} dispatch
 */
function mapDispatchToProps(dispatch) {
  return {
    // bind action creators goes over all the actinos in that file (courseActions) and wraps them in a call to dispatch
    // we now map to all the actions!
    actions: bindActionCreators(courseActions, dispatch)
  };
}
//Note: once we pass mapDispatchToProps, connect no longer populates a dispatch to the component props
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
