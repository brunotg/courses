import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// test a sync action
describe('Course Actions', () => {
    describe('createCourseSuccess', () => {
        it ('should create a CREATE_COURSE_SUCCESS  action', () => {
            // arrange 
            const course = { id: 'clean-code', title: 'Clean Code' };
            const expectedAction = {
                type: types.CREATE_COURSE_SUCCESS,
                course: course
            };

            // act
            const action = courseActions.createCourseSuccess(course);

            // assert
            expect(action).toEqual(expectedAction);
        });
    });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    //-- we pass a callbackfunction done to Mocha, call this function when async work is complete
    it ('Should create a BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
        // Here's an example to call nock, we don't need it because we have a mock api
        /*
        nock('http://example.com/')
            .get('/courses)
            .reply(200, { body : {course: [{ id:1 , firstName: 'Cory', lastName: 'House'}]}})
        */

        const expectedActions = [
            { type: types.BEGIN_AJAX_CALL },
            { type: types.LOAD_COURSES_SUCCESS, body: { courses: [{ id: 'clean-code', title: 'Clean Code'}]}}
        ];
        const store = mockStore({ courses: [], expectedActions});

        store.dispatch(courseActions.loadCourses()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
            done();
        });
    });
});