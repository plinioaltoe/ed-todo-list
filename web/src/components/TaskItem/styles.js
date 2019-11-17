import styled from 'styled-components'

import { colors, metrics } from '~/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${metrics.baseMargin / 2}px;
  width: 100%;
  margin-top: ${metrics.baseMargin / 4}px;
`

export const Text = styled.div`
  font-size: ${metrics.font.medium}px;
  width: 80%;
  color: ${({ done }) => (done ? colors.dark : colors.editabledColor)};
  padding-left: ${metrics.basePadding}px;
  font-weight: 500;
  text-align: left;
  min-height: ${metrics.baseMargin}px;
  display: flex;
  align-items: center;
  cursor: default;
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border-radius: ${metrics.baseRadius}px;
  cursor: ${({ disabled }) => !disabled && `pointer`};
`

export const IconGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const Icon = styled.div`
  color: ${colors.editabledColor};
  padding-left: ${metrics.basePadding}px;
  font-size: ${metrics.font.big}px;
  cursor: pointer;
`
