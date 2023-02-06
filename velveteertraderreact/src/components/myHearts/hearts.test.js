import React from 'react';
import { shallow } from 'enzyme';
import Hearts from './myHearts';

describe('Hearts', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Hearts />);
    expect(wrapper).toMatchSnapshot();
  });
});
