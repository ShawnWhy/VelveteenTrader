import React from 'react';
import { shallow } from 'enzyme';
import Hearts from './hearts';

describe('Hearts', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Hearts />);
    expect(wrapper).toMatchSnapshot();
  });
});
