import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0 ${metrics.basePadding * 2}px 0;
  position: relative;
  padding: ${metrics.baseDefault * 2.6}px 0 ${metrics.baseDefault * 3}px 0;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min-content;
  p {
    max-width: ${metrics.baseMargin * 15}px;
    color: ${colors.danger};
    margin-bottom: ${metrics.baseMargin}px;
    border: 1px solid ${colors.danger};
    padding: ${metrics.basePadding}px;
    width: 100%;
    text-align: center;
  }
`

export const Button = styled.button`
  border-radius: ${metrics.baseRadius * 5}px;
  height: ${metrics.baseMargin * 2.5}px;
  width: ${metrics.baseMargin * 15}px;
  background: ${colors.secondary};
  border: 0;
  color: ${colors.white};
  font-size: ${metrics.font.small}px;
  font-weight: bold;
  cursor: pointer;
`
export const TextField = styled.input`
  margin: 0 0 ${metrics.basePadding * 2}px 0;
  background-color: ${colors.secondary};
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseDefault * 3}px;
  height: ${metrics.inputHeight}px;
  border: 0;

  font-family: Helvetica;
  font-size: ${metrics.font.big}px;
  color: ${colors.white};

  text-align: left;

  ::placeholder {
    opacity: 0.5;
  }
`
