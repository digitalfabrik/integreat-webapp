import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import PageModel from '../../../endpoints/models/PageModel'
import ContentList from '../ContentList'
import store from '../../../store'

describe('ContentList', () => {
  const page4 = new PageModel({
    id: 'page4',
    numericId: 4,
    title: 'Page4',
    parent: 2
  })

  const page2 = new PageModel({
    id: 'page2',
    numericId: 2,
    title: 'Page2',
    parent: 0,
    children: [page4]
  })

  const page3 = new PageModel({
    id: 'page3',
    numericId: 3,
    title: 'Page3',
    parent: 0
  })

  const pages = [
    {page: page2, url: '/augsburg/de/page2'},
    {page: page3, url: '/augsburg/de/page3'},
    {page: page4, url: '/augsburg/de/page3/page4'}
  ]

  test('should render', () => {
    const wrapper = renderer.create(
      <Provider store={store}>
        <ContentList pages={pages} />
      </Provider>)

    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
