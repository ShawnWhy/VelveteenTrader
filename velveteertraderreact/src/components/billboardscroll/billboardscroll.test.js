import React from 'react';
import { shallow } from 'enzyme';
import Billboardscroll from './billboardscroll';

describe('Billboardscroll', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Billboardscroll />);
    expect(wrapper).toMatchSnapshot();
  });
});
