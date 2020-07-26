import React from 'react';
import { shallow } from 'enzyme';
import DMchat from './DMchat';

describe('DMchat', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DMchat />);
    expect(wrapper).toMatchSnapshot();
  });
});
