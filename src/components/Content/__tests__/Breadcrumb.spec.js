import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'

import { Breadcrumb } from '../Breadcrumb'
import PageModel from '../../../endpoints/models/PageModel'
import Hierarchy from 'routes/LocationPage/Hierarchy'
import LocationModel from '../../../endpoints/models/LocationModel'
import store from '../../../store'

describe('Breadcrumb', () => {
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

  const rootPage = new PageModel({
    id: 'rootId',
    numericId: 0,
    title: 'augsburg',
    children: [page2, page3]
  })

  const locations = [
    new LocationModel({
      name: 'Augsburg',
      code: 'augsburg'
    }),
    new LocationModel({
      name: 'Other city',
      code: 'otherCity'
    })]

  let hierarchy = new Hierarchy('augsburg/page2/page4')
  hierarchy.build(rootPage)

  test('should render', () => {
    const wrapper = renderer.create(
      <Provider store={store}>
        <Breadcrumb
          hierarchy={hierarchy}
          location={'augsburg'}
          language={'de'}
          locations={locations}/>
      </Provider>)

    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('getFormattedTitle', () => {
    const component = shallow(
      <Breadcrumb
        hierarchy={hierarchy}
        location={'augsburg'}
        language={'de'}
        locations={locations}/>)
      .instance()

    expect(component.getFormattedTitle(rootPage)).toBe('Augsburg')
    expect(component.getFormattedTitle(page2)).toBe(null)
  })
})
