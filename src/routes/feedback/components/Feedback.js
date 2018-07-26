// @flow

import * as React from 'react'
import 'react-dropdown/style.css'

import CityModel from '../../../modules/endpoint/models/CityModel'
import { translate } from 'react-i18next'
import styled from 'styled-components'
import FeedbackDropdown from './FeedbackDropdown'
import type { FeedbackDropdownType } from './FeedbackDropdown'
import FeedbackEndpoint, { DEFAULT_FEEDBACK_LANGUAGE, INTEGREAT_INSTANCE }
  from '../../../modules/endpoint/FeedbackEndpoint'
import type { TFunction } from 'react-i18next'
import FeedbackButton from './FeedbackLink'
import CleanLink from '../../../modules/common/components/CleanLink'

const FeedbackBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: auto;
  box-sizing: border-box;
  border-radius: 10px;
  border-color: #585858;
  font-size: ${props => props.theme.fonts.contentFontSize};
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

const CloseButton = styled(CleanLink)`
  font-size: 2rem;
`

const Title = styled.div`
  font-size: ${props => props.theme.fonts.subTitleFontSize};
  padding: 15px 0 10px;
`

const Description = styled.div`
  padding: 10px 0 5px;
`

const RatingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  
  & > * {
    font-size: 2rem;
  }
`

const RatingItem = styled(FeedbackButton)`
  color: ${props => props.selected ? props.theme.colors.themeColor : props.theme.colors.textSecondaryColor};
  opacity: ${props => props.selected ? '1.0' : '0.5'}
`

const CommentField = styled.textarea`
  resize: none;
`

const SubmitButton = styled(CleanLink)`
  margin: 15px 0;
  padding: 5px;
  background-color: ${props => props.theme.colors.themeColor};
  color: ${props => props.theme.colors.backgroundAccentColor};
  text-align: center;
  border-radius: 0.25em;
`

type PropsType = {
  cities: Array<CityModel>,
  city: string,
  language: string,
  id?: number,
  title: string,
  alias?: string,
  query?: string,
  route: string,
  isPositiveRatingSelected: boolean,
  pathname: string,
  t: TFunction
}

type StateType = {
  selectedFeedbackOption: ?FeedbackDropdownType,
  comment: string
}

class Feedback extends React.Component<PropsType, StateType> {
  constructor (props: PropsType) {
    super(props)
    this.state = {selectedFeedbackOption: null, comment: ''}
  }

  onCommentChanged = (event: {target: {value: string}}) => this.setState({comment: event.target.value})

  onFeedbackOptionChanged = (selectedDropdown: FeedbackDropdownType) => {
    this.setState({selectedFeedbackOption: selectedDropdown})
  }

  componentDidUpdate (prevProps: PropsType) {
    if (prevProps.pathname !== this.props.pathname) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({selectedFeedbackOption: null, comment: ''})
    }
  }

  onSubmit = () => {
    const {selectedFeedbackOption, comment} = this.state
    const {id, city, language, alias, query, isPositiveRatingSelected} = this.props

    if (selectedFeedbackOption) {
      const feedbackData = {
        feedbackType: selectedFeedbackOption.feedbackType,
        isPositiveRating: isPositiveRatingSelected,
        comment,
        id,
        city: city || INTEGREAT_INSTANCE,
        language: language || DEFAULT_FEEDBACK_LANGUAGE,
        alias,
        query
      }
      this.setState({selectedFeedbackOption: null, comment: ''})
      FeedbackEndpoint.postData(feedbackData)
    }
  }

  render () {
    const {comment} = this.state
    const {t, city, cities, route, id, alias, query, title, isPositiveRatingSelected, pathname} = this.props
    return (
      <FeedbackBox>
        <Header>
          <Title>{t('feedback')}</Title>
          <CloseButton to={pathname}>x</CloseButton>
        </Header>
        <RatingContainer>
          <RatingItem selected={isPositiveRatingSelected} isPositiveRatingLink pathname={pathname} />
          <RatingItem selected={!isPositiveRatingSelected} isPositiveRatingLink={false} pathname={pathname} />
        </RatingContainer>
        <Description>{t('feedbackType')}</Description>
        <FeedbackDropdown
          city={city}
          title={title}
          route={route}
          id={id}
          alias={alias}
          query={query}
          cities={cities}
          onFeedbackOptionChanged={this.onFeedbackOptionChanged} />
        <Description>{isPositiveRatingSelected ? t('positiveComment') : t('negativeComment')}</Description>
        <CommentField rows={3} value={comment} onChange={this.onCommentChanged} />
        <SubmitButton to={pathname} onClick={this.onSubmit}>{t('send')}</SubmitButton>
      </FeedbackBox>
    )
  }
}

export default translate('feedback')(Feedback)