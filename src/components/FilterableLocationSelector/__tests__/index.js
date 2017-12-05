import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import LocationModel from 'endpoints/models/LocationModel'
import FilterableLocationSelector from '../index'
import store from 'store'
import { mount } from 'enzyme'
import LocationSelector from 'components/FilterableLocationSelector/LocationSelector'
import Search from 'components/UIComponents/SearchInput'

jest.mock('react-i18next')

describe('FilterableLocationSelector', () => {
  const locations = [
    new LocationModel({
      name: 'City',
      code: 'city',
      live: true,
      eventsEnabled: false,
      extrasEnabled: false
    }),
    new LocationModel({
      name: 'Other city',
      code: 'otherCity',
      live: true,
      eventsEnabled: false,
      extrasEnabled: false
    }),
    new LocationModel({
      name: 'Not-live',
      code: 'nonlive',
      live: false,
      eventsEnabled: false,
      extrasEnabled: false
    }),
    new LocationModel({
      name: 'Yet another city',
      code: 'yetanothercity',
      live: true,
      eventsEnabled: false,
      extrasEnabled: false
    })
  ]

  test('should render', () => {
    const component = renderer.create(
      <Provider store={store}>
        <FilterableLocationSelector
          language="de"
          locations={locations}/>
      </Provider>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  test('should pass filterText to LocationSelector and filter', () => {
    const wrapper = mount(
      <Provider store={store}>
        <FilterableLocationSelector
          language="de"
          locations={locations}/>
      </Provider>
    )

    const search = wrapper.find(Search)
    search.prop('onFilterTextChange')('City')

    const selector = wrapper.find(LocationSelector)
    expect(selector.instance().filter()).toHaveLength(3)
  })
})
