import React from 'react'
import { mount, shallow } from 'enzyme'
import PropTypes from 'prop-types'
import ConnectedI18nRedirect, { I18nRedirect } from '../I18nRedirect'
import CityModel from '../../../../modules/endpoint/models/CityModel'
import configureMockStore from 'redux-mock-store'
import createReduxStore from '../../../../modules/app/createReduxStore'
import createHistory from '../../../../modules/app/createHistory'
import { Provider } from 'react-redux'
import { goToLanding } from '../../../../modules/app/routes/landing'
import { goToMainDisclaimer } from '../../../../modules/app/routes/mainDisclaimer'
import { goToNotFound } from '../../../../modules/app/routes/notFound'
import { goToCategories } from '../../../../modules/app/routes/categories'

describe('I18nRedirect', () => {
  const language = 'de'

  const cities = [
    new CityModel({
      name: 'City',
      code: 'random_city',
      live: true,
      eventsEnabled: false,
      extrasEnabled: false
    })
  ]

  describe('get redirect action', () => {
    it('should return goToLanding action if there is no param or  the param is landing or  a language code', () => {
      const instanceWithoutParam = shallow(
        <I18nRedirect cities={cities} redirect={() => {}} />,
        {context: {i18n: {language}}, childContextTypes: {i18n: PropTypes.object.isRequired}}
      ).instance()

      expect(instanceWithoutParam.getRedirectAction()).toEqual(goToLanding(language))

      const instanceWithLandingParam = shallow(
        <I18nRedirect cities={cities} redirect={() => {}} param='landing' />,
        {context: {i18n: {language}}, childContextTypes: {i18n: PropTypes.object.isRequired}}
      ).instance()

      expect(instanceWithLandingParam.getRedirectAction()).toEqual(goToLanding(language))

      const instanceWithLanguageParam = shallow(
        <I18nRedirect cities={cities} redirect={() => {}} param={language} />,
        {context: {i18n: {language}}, childContextTypes: {i18n: PropTypes.object.isRequired}}
      ).instance()

      expect(instanceWithLanguageParam.getRedirectAction()).toEqual(goToLanding(language))
    })

    it('should return goToMainDisclaimer action if the param is disclaimer', () => {
      const instance = shallow(
        <I18nRedirect cities={cities} redirect={() => {}} param='disclaimer' />,
        {context: {i18n: {language}}, childContextTypes: {i18n: PropTypes.object.isRequired}}
      ).instance()

      expect(instance.getRedirectAction()).toEqual(goToMainDisclaimer())
    })

    it('should return goToCategories action if the param is a city', () => {
      const instance = shallow(
        <I18nRedirect cities={cities} redirect={() => {}} param='random_city' />,
        {context: {i18n: {language}}, childContextTypes: {i18n: PropTypes.object.isRequired}}
      ).instance()

      expect(instance.getRedirectAction()).toEqual(goToCategories('random_city', language))
    })

    it('should return goToNotFound action if the param is not_found or as default', () => {
      const instance = shallow(
        <I18nRedirect cities={cities} redirect={() => {}} param='not_found' />,
        {context: {i18n: {language}}, childContextTypes: {i18n: PropTypes.object.isRequired}}
      ).instance()

      expect(instance.getRedirectAction()).toEqual(goToNotFound())

      const instanceWithInvalidParam = shallow(
        <I18nRedirect cities={cities} redirect={() => {}} param='invalid_param' />,
        {context: {i18n: {language}}, childContextTypes: {i18n: PropTypes.object.isRequired}}
      ).instance()

      expect(instanceWithInvalidParam.getRedirectAction()).toEqual(goToNotFound())
    })
  })

  describe('connect', () => {
    it('should map state to props', () => {
      const param = 'param'

      const location = {payload: {param}}

      const mockStore = configureMockStore()
      const store = mockStore({
        location: location,
        cities: {data: cities}
      })

      const i18nRedirect = shallow(
        <ConnectedI18nRedirect store={store} />
      )

      expect(i18nRedirect.props()).toEqual({
        param,
        cities,
        store: store,
        storeSubscription: expect.any(Object),
        redirect: expect.any(Function)
      })
    })

    it('should map dispatch to props', () => {
      const store = createReduxStore(createHistory, {
        cities: {data: cities}
      })

      store.dispatch = jest.fn()
      expect(store.dispatch).not.toHaveBeenCalled()

      mount(
        <Provider store={store}>
          <ConnectedI18nRedirect />
        </Provider>,
        {context: {i18n: {language}}, childContextTypes: {i18n: PropTypes.object.isRequired}}
      )
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
  })
})