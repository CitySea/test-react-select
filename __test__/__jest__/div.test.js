import { mount } from "enzyme";
import React from "react";
import Select from "../../src/index.js";

const options = [
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 1 },
  { name: 2 },
  { name: 3 }
];

describe("test suite: Test component", () => {
  it("case: expect Test render a div with className: exepoc-select-wrapper", () => {
    const wrapper = mount(<Select />);

    expect(wrapper.find(".exepoc-select-wrapper").length).toEqual(1);
  });
  it("case: exepoc-select & select-icon & click", () => {
    const wrapper = mount(<Select />);
    const _exeporSelect = wrapper.find(".exepoc-select").at(0);
    const _selectIcon = wrapper.find(".select-icon").at(0);

    expect(_exeporSelect.exists());
    expect(_selectIcon.exists());
    _exeporSelect.simulate("click");
    expect(wrapper.find(".select-options-box").length).toEqual(1);
    expect(wrapper.find(".empty").length).toEqual(1);
    _selectIcon.simulate("click");
    expect(
      wrapper.find(".select-options-box").get(0).props.style
    ).toHaveProperty("display", "none");
  });
  it("case: options", () => {
    const wrapper = mount(<Select attributes={{ options }} />);
    const _exeporSelect = wrapper.find(".exepoc-select").at(0);

    _exeporSelect.simulate("click");
    expect(wrapper.find(".select-options div").length).toEqual(9);
  });
  it("case: input", () => {
    const wrapper = mount(<Select />);
    const _input = wrapper.find("input").at(0);

    _input.simulate("change", {
      target: {
        value: "hello jest"
      }
    });
    expect(wrapper.find("input").props()["value"]).toEqual("hello jest");
  });
  it("case: select-options div & click", () => {
    const wrapper = mount(<Select attributes={{ options }} />);
    const _exeporSelect = wrapper.find(".exepoc-select").at(0);

    _exeporSelect.simulate("click");
    const _optionDiv = wrapper.find(".select-options div").at(0);

    expect(_optionDiv.exists());

    _optionDiv.simulate("click");
    expect(wrapper.find("input").props()['value']).toEqual(options[0].name);
  });
  it("case: scrollBar", () => {
    const wrapper = mount(<Select attributes={{ options }} />);
    const _exeporSelect = wrapper.find(".exepoc-select").at(0);
    // const _document = wrapper.find(document).at(0);

    _exeporSelect.simulate("click");
    document.dispatchEvent(new Event('keydown', {keyCode: 38}));
    // document.simulate("keydown", {key: 'down', keyCode: 38, which: 38});
    const _optionDiv = wrapper.find(".select-options div").at(8);
    console.log(_optionDiv.hasClass('hover'));
    expect(_optionDiv.exists());
    expect(_optionDiv.hasClass('hover')).toEqual(false);
  });
});
