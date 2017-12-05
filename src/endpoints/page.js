import { find, forEach } from 'lodash/collection'

import EndpointBuilder from './EndpointBuilder'

import PageModel from './models/PageModel'

export default new EndpointBuilder('pages')
  .withUrl('https://cms.integreat-app.de/{location}/{language}/wp-json/extensions/v0/modified_content/pages?since=1970-01-01T00:00:00Z')
  .withStateMapper().fromArray(['location', 'language'], (state, paramName) => state.router.params[paramName])
  .withMapper((json, urlParams) => {
    const pages = json.filter((page) => page.status === 'publish')
      .map((page) => {
        const id = decodeURIComponent(page.permalink.url_page).split('/').pop()
        const numericId = page.id
        return new PageModel({
          id,
          numericId,
          title: page.title,
          parentNumericId: page.parent,
          content: page.content,
          thumbnail: page.thumbnail,
          order: page.order,
          availableLanguages: page.available_languages
        })
      })

    const baseUrl = `/${urlParams.location}/${urlParams.language}`
    const pageTree = new PageModel({numericId: 0, id: 'rootId', title: urlParams.location, url: baseUrl})
    pages.push(pageTree)

    // Assign children relations
    forEach(pages, page => {
      const parent = find(pages, p => p.numericId === page.parentNumericId)
      if (parent) {
        parent.addChild(page)
        page.setParent(parent)
      }
    })

    return pageTree
  })
  .build()
