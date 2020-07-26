import React from 'react';
import { shallow } from 'enzyme';
import ObjectDiv from './objectDiv';

describe('ObjectDiv', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ObjectDiv />);
    expect(wrapper).toMatchSnapshot();
  });
});
