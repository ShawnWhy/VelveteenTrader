import React from 'react';
import { shallow } from 'enzyme';
import ItemCard from './itemCard';

describe('ItemCard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ItemCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
