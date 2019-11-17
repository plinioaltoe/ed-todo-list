import styled from 'styled-components'

import { colors, metrics } from '~/styles'

export const Container = styled.div`
  align-items: left;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: ${metrics.baseRadius}px;
  padding: ${metrics.basePadding}px;
  margin: 0 ${metrics.baseMargin}px;
  position: relative;
  background-color: ${colors.lighter};
`

export const Text = styled.span`
  color: ${colors.dark};
  font-size: ${metrics.font.bigger}px;
  font-weight: 500;
  margin-bottom: ${metrics.baseMargin / 2}px;
`
export const TextField = styled.input`
  margin-bottom: ${metrics.baseMargin}px;
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseDefault * 2.5}px;
  height: ${metrics.inputHeight}px;
  border: 1px solid ${colors.light};
  padding-left: ${metrics.basePadding}px;
  font-family: Helvetica;
  font-size: ${metrics.font.big}px;

  text-align: left;

  ::placeholder {
    opacity: 0.5;
  }
`
