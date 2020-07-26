import React from 'react';
import { shallow } from 'enzyme';
import Loginmodal from './loginmodal';

describe('Loginmodal', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Loginmodal />);
    expect(wrapper).toMatchSnapshot();
  });
});
