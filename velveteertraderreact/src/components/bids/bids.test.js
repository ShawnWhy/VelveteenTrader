import React from 'react';
import { shallow } from 'enzyme';
import Bids from './bids';

describe('Bids', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Bids />);
    expect(wrapper).toMatchSnapshot();
  });
});
