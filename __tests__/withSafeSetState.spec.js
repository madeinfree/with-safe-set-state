import React, { Component } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { withSafeSetState } from '../lib/index';
Enzyme.configure({ adapter: new Adapter() });

let GlobalBasic = null;
let GlobalBox = null;
let GlobalBoxHOC = null;
jest.useFakeTimers();

beforeEach(() => {
  GlobalBox = class Box extends Component {
    constructor() {
      super();
      this.state = { info: 'Default' };
    }
    _onClick() {
      setTimeout(() => {
        this.setState(_ => ({
          info: 'OK'
        }));
      }, 1000);
    }
    render() {
      return <button onClick={this._onClick.bind(this)}>Click</button>;
    }
  };
  GlobalBoxHOC = withSafeSetState(GlobalBox);
  GlobalBasic = class Basic extends Component {
    constructor() {
      super();
      this.state = {
        hide: false
      };
    }
    _onClick() {
      this.setState(_ => ({
        hide: true
      }));
    }
    render() {
      return (
        <div>
          <button onClick={this._onClick.bind(this)} />
          {this.state.hide ? null : <GlobalBoxHOC />}
        </div>
      );
    }
  };
  return Promise.resolve();
}, 200);
describe('withSafeSetState', () => {
  test('is Function', () => {
    expect(typeof withSafeSetState).toBe('function');
    return Promise.resolve();
  });
  test('replace setState is empty function', () => {
    const callback = jest.fn();
    const wrap = mount(<GlobalBasic />);
    const hoc = wrap.find(GlobalBoxHOC);
    const box = hoc.find(GlobalBox);
    wrap
      .childAt(0)
      .childAt(0)
      .simulate('click');
    expect(box.instance().setState.toString()).toBe('function () {}');
  });
});
