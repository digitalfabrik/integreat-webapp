// @flow

import React from 'react'
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '../../app/constants/icons'
import type { ThemeType } from '../../theme/constants/theme'
import styled from 'styled-components'

const DropdownContainer = styled.div`
  position: relative;
  box-sizing: border-box;
`

const StyledMenuButton = styled(Button)`
  display: flex;
  cursor: pointer;
  box-sizing: border-box;
  align-items: center;
  border-style: solid;
  border-color: ${props => props.theme.colors.textDecorationColor};
  border-radius: 4px;
  border-width: 1px;
  justify-content: space-between;
`

const StyledMenuButtonText = styled.div`
  display: flex;
  padding: 8px;
  color: ${props => props.theme.colors.textSecondaryColor};
`

const StyledMenuButtonIcon = styled.div`
  padding: 8px 16px;
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 1;
  top: 100%;
  box-sizing: border-box;
  margin: 8px 0;
  position: absolute;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.backgroundColor};
  box-shadow: 0 0 0 1px ${props => props.theme.colors.textDecorationColor},
  0 4px 11px ${props => props.theme.colors.textDecorationColor};
`

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  padding: 8px;
  color: ${props => props.theme.colors.textSecondaryColor};
  cursor: pointer;

  :focus, :hover {
    background-color: ${props => props.theme.colors.textDecorationColor};
  }
`

type DropdownItemType = { label: string }

type DropdownPropsType<T: DropdownItemType> = {
  items: Array<T>,
  selectedItem: T,
  onOptionChanged: (item: T) => void,
  theme: ThemeType
}

class Dropdown<T: DropdownItemType> extends React.Component<DropdownPropsType<T>> {
  render () {
    const { onOptionChanged, items, selectedItem, theme } = this.props

    return <DropdownContainer>
      <Wrapper onSelection={onOptionChanged}>
        <StyledMenuButton>
          <StyledMenuButtonText>
            {selectedItem.label}
          </StyledMenuButtonText>
          <StyledMenuButtonIcon>
            <FontAwesomeIcon icon={faAngleDown} size='lg' color={theme.colors.textDecorationColor} />
          </StyledMenuButtonIcon>
        </StyledMenuButton>
        <Menu>
          <MenuWrapper>
            {
              items.map((option, index) =>
                <StyledMenuItem key={index} value={option} text={option.label} theme={theme}>
                  {option.label}
                </StyledMenuItem>)
            }
          </MenuWrapper>
        </Menu>
      </Wrapper>
    </DropdownContainer>
  }
}

export default Dropdown