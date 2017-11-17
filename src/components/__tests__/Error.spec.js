import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import { history } from '__mocks__/store'

import Error from '../Error'

jest.mock('store')
jest.mock('react-i18next')

describe('Error', () => {
  test('should match snapshot', () => {
    const component = renderer.create(
      <Error error="Error Message"/>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })

  test('call history when onBack is called', () => {
    const preventDefault = jest.fn()
    const wrapper = shallow(<Error error="Error Message"/>).dive()

    wrapper.instance().goBack({preventDefault})

    expect(history.goBack.mock.calls).toHaveLength(1)
    expect(preventDefault.mock.calls).toHaveLength(1)
  })
})
