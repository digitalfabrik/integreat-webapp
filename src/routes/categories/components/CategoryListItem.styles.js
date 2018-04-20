import styled from 'styled-components'
import Highlighter from 'react-highlighter'
import Link from 'redux-first-router-link'

export const Row = styled.div`
  margin: 20px 0;
  
  & > * {
    width: 100%;
  }
`

export const CategoryThumbnail = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  padding: 8px;
  object-fit: contain;
`

export const SubCategory = styled.div`
  text-align: end;
  
  & > * {
    width: calc(100% - 50px);
    text-align: start;
    
    @media ${props => props.theme.dimensions.smallViewport} {
      width: 100%;
    }
  }
`

export const SubCategoryThumbnail = CategoryThumbnail.extend`
  width: 26px;
  height: 26px;
  padding: 5px 10px;
  
  @media ${props => props.theme.dimensions.smallViewport} {
    padding: 5px 15px;
  }  
`
export const SubCategoryThumbnailDiv = SubCategoryThumbnail.extend`
  width: 15px;
  
  @media ${props => props.theme.dimensions.smallViewport} {
    width: 40px;
  }  
`.withComponent('div')

export const CategoryCaption = styled(Highlighter)`
  height: 100%;
  min-width: 1px; /* needed to enable line breaks for to long words, exact value doesn't matter, @Max: DO NOT CHANGE */
  flex-grow: 1;
  padding: 15px 0;
  border-bottom: 2px solid ${props => props.theme.colors.themeColor};
  word-wrap: break-word;
`

export const SubCategoryCaption = CategoryCaption.extend`
  padding: 8px 0;
  border-bottom: 1px solid ${props => props.theme.colors.themeColor};
`

export const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin: 0 auto;
`
