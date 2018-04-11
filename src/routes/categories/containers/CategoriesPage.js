// @flow

import React from 'react'
import type {Node} from 'react'
import { connect } from 'react-redux'

import CategoriesMapModel from 'modules/endpoint/models/CategoriesMapModel'
import Failure from 'modules/common/components/Failure'
import Page from 'modules/common/components/Page'

import Breadcrumbs from 'modules/common/components/Breadcrumbs'
import Tiles from '../../../modules/common/components/Tiles'
import CategoryList from '../components/CategoryList'
import TileModel from '../../../modules/common/models/TileModel'
import CategoryModel from '../../../modules/endpoint/models/CategoryModel'
import CityModel from '../../../modules/endpoint/models/CityModel'
import { apiUrl } from '../../../modules/endpoint/constants'
import Link from 'redux-first-router-link'

type Props = {
  categories: CategoriesMapModel,
  cities: Array<CityModel>,
  city: string,
  path: string,
  uiDirection: 'ltr' | 'rtl'
}

/**
 * Displays a CategoryTable, CategoryList or a single category as page matching the route /<city>/<language>*
 */
export class CategoriesPage extends React.Component<Props> {
  /**
   * Our root categories don't have the right title (city code instead of city title), so we have to compare the
   * title of the root category with the code of every city
   * @param {String} title The title of the category to search for
   * @return {String} The found name or the given title
   */
  getCityName (title: string) {
    const city = this.props.cities.find(_city => title === _city.code)
    return city ? city.name : title
  }

  getTileModels (categories: Array<CategoryModel>) {
    return categories.map(category => new TileModel({
      id: category.id, name: category.title, path: category.url, thumbnail: category.thumbnail
    }))
  }

  /**
   * Returns the content to be displayed, based on the current category, which is
   * a) page with information
   * b) table with categories
   * c) list with categories
   * @param category The current category
   * @return {*} The content to be displayed
   */
  getContent (category: CategoryModel) {
    const categories = this.props.categories
    const children = categories.getChildren(category)

    if (children.length === 0) {
      // last level, our category is a simple page
      return <Page title={category.title}
                   content={category.content} />
    } else if (category.id === 0) {
      // first level, we want to display a table with all first order categories
      return <Tiles tiles={this.getTileModels(children)}
                    title={this.getCityName(category.title)} />
    }
    // some level between, we want to display a list
    return <CategoryList categories={children.map(model => ({model, children: categories.getChildren(model)}))}
                         title={category.title}
                         content={category.content} />
  }

  getBreadcrumbs (categoryModel: CategoryModel): Array<Node> {
    return this.props.categories.getAncestors(categoryModel)
      .map(ancestor => ({
        title: ancestor.id === 0 ? this.getCityName(ancestor.title) : ancestor.title,
        url: ancestor.url
      }))
      .map(({title, url}) => <Link to={url} key={url}>{title}</Link>)
  }

  render () {
    const categoryModel = this.props.categories.findCategoryByUrl(this.props.path)
    if (categoryModel) {
      return <div>
        <Breadcrumbs direction={this.props.uiDirection}>
          {this.getBreadcrumbs(categoryModel)}
        </Breadcrumbs>
        {this.getContent(categoryModel)}
      </div>
    }

    return <Failure error='not-found:page.notFound' />
  }
}

const mapStateToProps = state => ({
  uiDirection: state.uiDirection,
  language: state.location.payload.language,
  city: state.location.payload.city,
  path: state.location.pathname,
  categories: state.categories.data,
  cities: state.cities.data
})

export default connect(mapStateToProps)(CategoriesPage)
