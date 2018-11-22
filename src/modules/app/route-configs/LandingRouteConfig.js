// @flow

import { RouteConfigInterface } from './RouteConfigInterface'
import { CityModel, citiesEndpoint, Payload } from '@integreat-app/integreat-api-client'
import type { Dispatch, GetState, Route } from 'redux-first-router'
import fetchData from '../fetchData'
import type { AllPayloadsType, GetPageTitleParamsType } from './RouteConfigInterface'

type LandingRouteParamsType = {|language: string|}
type RequiredPayloadsType = {|cities: Payload<Array<CityModel>>|}

export const LANDING_ROUTE = 'LANDING'

/**
 * LandingRoute, matches /landing/de
 * @type {{path: string, thunk: function(Dispatch, GetState)}}
 */
const landingRoute: Route = {
  path: '/landing/:language',
  thunk: async (dispatch: Dispatch, getState: GetState) => {
    await fetchData(citiesEndpoint, dispatch, getState().cities)
  }
}

class LandingRouteConfig implements RouteConfigInterface<LandingRouteParamsType, RequiredPayloadsType> {
  name = LANDING_ROUTE
  route = landingRoute

  getPageTitle = ({t}: GetPageTitleParamsType) => t('pageTitles.landing')

  getRequiredPayloads = (payloads: AllPayloadsType): RequiredPayloadsType => ({cities: payloads.citiesPayload})

  getRoutePath = ({language}: LandingRouteParamsType): string => `/landing/${language}`

  getLanguageChangePath = () => null
}

export default LandingRouteConfig