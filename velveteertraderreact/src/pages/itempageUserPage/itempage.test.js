import React from 'react';
import { shallow } from 'enzyme';
import Itempage from './itempage';

describe('Itempage', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Itempage />);
    expect(wrapper).toMatchSnapshot();
  });
});
