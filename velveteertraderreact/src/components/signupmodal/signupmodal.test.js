import React from 'react';
import { shallow } from 'enzyme';
import Signupmodal from './signupmodal';

describe('Signupmodal', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Signupmodal />);
    expect(wrapper).toMatchSnapshot();
  });
});
