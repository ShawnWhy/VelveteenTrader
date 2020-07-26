import React from 'react';
import { shallow } from 'enzyme';
import Usersidebar from './usersidebar';

describe('Usersidebar', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Usersidebar />);
    expect(wrapper).toMatchSnapshot();
  });
});
