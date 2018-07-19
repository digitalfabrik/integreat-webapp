// @flow

import extrasEndpoint from '../../endpoint/endpoints/extras'
import wohnenEndpoint from '../../endpoint/endpoints/wohnen'
import { createAction } from 'redux-actions'

import type { Dispatch, GetState } from 'redux-first-router'
import ExtraModel from '../../endpoint/models/ExtraModel'

export const WOHNEN_ROUTE = 'WOHNEN'

export const goToWohnenExtra = (city: string, language: string) =>
  createAction(WOHNEN_ROUTE)({city, language})

export const getWohnenExtraPath = (city: string, language: string): string =>
  `/${city}/${language}/extras/wohnen`

export const wohnenRoute = {
  path: '/:city/:language/extras/wohnen',
  thunk: async (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const {city, language} = state.location.payload

    const extrasPayload = await extrasEndpoint.loadData(dispatch, state.extras, {city, language})
    const data = extrasPayload.data

    if (Array.isArray(data)) {
      const extras: Array<ExtraModel> = []
      data.forEach(extra => {
        if (extra instanceof ExtraModel) {
          return extras.push(extra)
        }
      })

      const wohnenExtra: ExtraModel | void = extras.find(extra => extra.alias === 'wohnen')
      if (wohnenExtra) {
        const params = {city: 'neuburgschrobenhausenwohnraum'}
        await wohnenEndpoint.loadData(dispatch, state.wohnen, params)
      }
    }
  }
}