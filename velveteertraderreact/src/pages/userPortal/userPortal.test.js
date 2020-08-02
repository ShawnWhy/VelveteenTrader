import React from 'react';
import { shallow } from 'enzyme';
import UserPortal from './userPortal';

describe('UserPortal', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserPortal />);
    expect(wrapper).toMatchSnapshot();
  });
});
