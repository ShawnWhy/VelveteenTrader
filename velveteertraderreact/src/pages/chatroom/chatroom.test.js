import React from 'react';
import { shallow } from 'enzyme';
import Chartroom from './chartroom';

describe('Chartroom', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Chartroom />);
    expect(wrapper).toMatchSnapshot();
  });
});
