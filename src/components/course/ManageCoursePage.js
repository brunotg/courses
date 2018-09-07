import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
import CourseForm from "./CourseForm"; 
import toastr from 'toastr';
import { authorsFormattedForDropdown } from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    // pass down mutable state to our form
    // set up some local state on the container component
    super(props, context);

    this.state = {
      //-- this keyword is not necessary
      course: Object.assign({}, this.props.course),
      // this could have been called ^^^ initialCourse, this props is just for initializing state)
      errors: {},
      saving: false
    };
    // dont forget to bind!!!!
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    //this.courseFormIsValid = this.courseFormIsValid.bind(this);
  }

  // when the props change we need to update our component container state
  // this is called anytime the props have changed 
  // this may run sometimes when the props havent changed
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      // necessary to populate form when existing course is loaded directly
      this.setState({ course: Object.assign({}, nextProps.course )});
    }
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;

  }

  saveCourse(event) { 
      event.preventDefault();

      if (!this.courseFormIsValid()) {
        return;
      }

      this.setState({saving: true});

      this.props.actions.saveCourse(this.state.course)
        .then(() => this.redirect())
        .catch(error => {
          toastr.error(error);
          this.setState({saving: false});
        });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  updateCourseState(event) {
      const field = event.target.name;
      //todo: see how to do this with immutable.js
      let course  = Object.assign({}, this.state.course);
      course[field] = event.target.value;
      return this.setState({ course: course });
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// Pull in the react router context so router is available on this.context.router

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if (course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  // see routes.js <Route path="course/:id" component={ManageCoursePage}/>
  const courseId = ownProps.params.id; // from the path `/course/:id`

  let course = {
    id: "",
    watchHref: "",
    title: "",
    authorId: "",
    length: "",
    category: ""
  };

  if (courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }

  // we need to look at the url to see if the user is trying to add a new course or editing an existign course

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
