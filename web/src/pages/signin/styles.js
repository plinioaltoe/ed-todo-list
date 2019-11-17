import styled from 'styled-components'

import { colors, metrics } from '~/styles'

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
`

export const Text = styled.span`
  color: ${colors.dark};
  font-size: ${metrics.font.big}px;
  font-weight: 400;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min-content;
  background-color: ${colors.lighter};
  border-radius: ${metrics.baseRadius}px;
  padding: ${metrics.basePadding * 3}px;
  margin: ${metrics.baseMargin * 3}px;
  a {
    margin-top: ${metrics.baseMargin / 2}px;
  }
`
export const Button = styled.button`
  border-radius: ${metrics.baseRadius}px;
  height: ${metrics.baseMargin * 2.5}px;
  width: ${metrics.baseDefault * 2.5}px;
  background: ${colors.addProjectBtn};
  border: 1px solid ${colors.light};
  color: ${colors.white};
  font-size: ${metrics.font.small}px;
  font-weight: bold;
  cursor: pointer;
`
export const Error = styled.p`
  color: ${colors.danger};
  padding-left: ${metrics.basePadding}px;
`
