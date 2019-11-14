import { mount } from 'enzyme';
import React from 'react';
import ReactDOM, { render, unmountComponentAtNode } from 'react-dom';
import Select from '../../src/index.js';
import { act, Simulate } from 'react-dom/test-utils';

const options = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }, { name: 7 }, { name: 8 }, { name: 9 }];

describe('test suite: Test component', () => {
  it('case: expect Test render a div with className: exepoc-select-wrapper', () => {
    const wrapper = mount(<Select />);

    expect(wrapper.find('.exepoc-select-wrapper').length).toEqual(1);
    wrapper.unmount();
  });

  it('case: input', () => {
    const wrapper = mount(<Select />);
    const _input = wrapper.find('input').at(0);

    _input.simulate('change', {
      target: {
        value: 'hello jest',
      },
    });
    expect(wrapper.find('input').props()['value']).toEqual('hello jest');
  });
  it('case scrollBar', () => {
    const container = document.createElement('div');

    document.body.appendChild(container);
    render(<Select attributes={{ options }} />, container);
    const _exeporSelect = document.querySelector('.exepoc-select');

    act(() => {
      _exeporSelect.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    let createEvent = new KeyboardEvent('keydown', {
      keyCode: 40,
      which: 40,
      code: 'up arrow',
    });
    act(() => {
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
    });
    expect(document.querySelectorAll('.option')[2].className).toEqual('option hover');

    createEvent = new KeyboardEvent('keydown', { keyCode: 27 });
    act(() => {
      document.dispatchEvent(createEvent);
    });
    expect(document.querySelector('.select-options-box').style.display).toEqual('none');

    createEvent = new KeyboardEvent('keydown', { keyCode: 13 });
    act(() => {
      document.dispatchEvent(createEvent);
    });
    expect(document.querySelector('.select-options-box').style.display).toEqual('block');

    createEvent = new KeyboardEvent('keydown', {
      keyCode: 38,
      which: 38,
      code: 'down arrow',
    });
    act(() => {
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
      document.dispatchEvent(createEvent);
    });
    expect(document.querySelectorAll('.option')[1].className).toEqual('option hover');

    createEvent = new KeyboardEvent('keydown', { keyCode: 13 });
    act(() => {
      document.dispatchEvent(createEvent);
    });
    expect(document.querySelector('.select-input').value).toEqual('2');
    expect(document.querySelector('.select-options-box').style.display).toEqual('none');
    expect(document.querySelectorAll('.option')[1].className).toEqual('option selected hover');

    // createEvent = new KeyboardEvent("keydown", {keyCode: 13});
    // const _exeporScrollbarWrapper = document.querySelector(".scrolllbar-wrapper");
    // const _exeporSelectOptionList = document.querySelector(".select-options");
    // act(() => {
    //   document.dispatchEvent(createEvent);
    // });
    // setTimeout(() => {
    //   done();
    //   console.log(_exeporScrollbarWrapper.clientHeight);
    //   expect(document.querySelector(".select-options-box").style.display).toEqual('none');

    // }, 1000)
    document.body.removeChild(container);
  });

  it('case: select-options div & click', () => {
    const wrapper = mount(<Select attributes={{ options }} />);
    const _exeporSelect = wrapper.find('.exepoc-select').at(0);

    _exeporSelect.simulate('click');
    const _optionDiv = wrapper.find('.select-options div').at(0);

    expect(_optionDiv.exists());
    _optionDiv.simulate('click');
    expect(wrapper.find('input').props()['value']).toEqual(options[0].name);
  });

  it('case: exepoc-select & select-icon & click', () => {
    const wrapper = mount(<Select />);
    const _exeporSelect = wrapper.find('.exepoc-select').at(0);
    const _selectIcon = wrapper.find('.select-icon').at(0);

    expect(_exeporSelect.exists());
    expect(_selectIcon.exists());
    _exeporSelect.simulate('click');
    expect(wrapper.find('.select-options-box').length).toEqual(1);
    expect(wrapper.find('.empty').length).toEqual(1);
    _selectIcon.simulate('click');
    expect(wrapper.find('.select-options-box').get(0).props.style).toHaveProperty('display', 'none');
  });

  it('case: options', () => {
    const wrapper = mount(<Select attributes={{ options }} />);
    const _exeporSelect = wrapper.find('.exepoc-select').at(0);

    _exeporSelect.simulate('click');
    expect(wrapper.find('.select-options div').length).toEqual(9);
  });
});
