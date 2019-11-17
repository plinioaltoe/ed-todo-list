import styled from 'styled-components'

import { colors, metrics } from '~/styles'

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: ${metrics.baseRadius}px;
  padding: ${metrics.basePadding * 3}px;
  margin: 0 ${metrics.baseMargin * 3}px;
  position: relative;
  background-color: ${colors.lighter};
`

export const Text = styled.span`
  color: ${colors.dark};
  font-size: ${metrics.font.bigger}px;
  font-weight: 500;
  margin-bottom: ${metrics.baseMargin / 2}px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min-content;
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
export const Error = styled.p`
  color: ${colors.danger};
  padding-left: ${metrics.basePadding}px;
`
