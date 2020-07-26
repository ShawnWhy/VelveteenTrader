import React from 'react';
import { shallow } from 'enzyme';
import Userportal from './userportal';

describe('Userportal', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Userportal />);
    expect(wrapper).toMatchSnapshot();
  });
});
