import React from "react";
import expect from "expect";
import { mount, shallow } from "enzyme";
import { ManageCoursePage } from "./ManageCoursePage"; // using a named import to reference the class instead of the connected component

describe("Manage Course Page", () => {
  it("sets error message when trying to save empty title", () => {
    let props = {
      authors: [],
      actions: { saveCourse: () => { return Promise.resolve(); }},
      course: {
        id: "",
        watchHref: "",
        title: "",
        authorId: "",
        length: "",
        category: ""
      }
    };


    // option 1:
    //const wrapper = mount(<Provider store={store}><ManageCoursePage /></Provider>); //full dom is created in memory by enzime
    // option2: in the manage course page, export the copmonent so you can instantiate it
    const wrapper = mount(<ManageCoursePage {...props}/>);
    const saveButton = wrapper.find("input").last();
    expect(saveButton.prop("type")).toBe("submit");
    saveButton.simulate('click'); 
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});
