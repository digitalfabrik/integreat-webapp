/* eslint-disable react/jsx-boolean-value */
import React from 'react'
import { mount } from 'enzyme'

import ConditionalLink, { DisabledLink } from '../ConditionalLink'
import { Link } from 'redux-little-router'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

describe('ConditionalLink', () => {
  it('should render a Link if active', () => {
    const mockStore = configureMockStore()
    const store = mockStore({router: {}})

    const tree = mount(<Provider store={store}>
        <ConditionalLink prob='value' active={true} href='/augsburg/de' />
      </Provider>
    )
    const link = tree.find(Link)
    console.log(tree.debug())
    expect(link.length).not.toBe(0)
    expect(link.props()).toEqual({prob: 'value', href: '/augsburg/de'})
  })

  it('should render a DisabledLink if inactive', () => {
    const tree = mount(<ConditionalLink prob='value' active={false} />)
    const disabledLink = tree.find(DisabledLink)
    expect(disabledLink.length).not.toBe(0)
    expect(disabledLink.props()).toEqual({prob: 'value'})
  })
})
