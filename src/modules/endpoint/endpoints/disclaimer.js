import { isEmpty } from 'lodash/lang'

import EndpointBuilder from '../EndpointBuilder'

import DisclaimerModel from '../models/DisclaimerModel'
import { apiUrl } from '../constants'

export default new EndpointBuilder('disclaimer')
  .withStateToUrlMapper(state => `${apiUrl}/${state.router.params.location}` +
    `/${state.router.params.language}/wp-json/extensions/v0/modified_content/disclaimer?since=1970-01-01T00:00:00Z`)
  .withMapper(json => {
    if (isEmpty(json)) {
      throw new Error('disclaimer:notAvailable')
    }

    const disclaimers = json
      .filter(disclaimer => disclaimer.status === 'publish')
      .map(disclaimer => {
        return new DisclaimerModel({
          id: disclaimer.id,
          title: disclaimer.title,
          content: disclaimer.content
        })
      })

    if (disclaimers.length !== 1) {
      throw new Error('There must be exactly one disclaimer!')
    }

    return disclaimers[0]
  })
  .build()