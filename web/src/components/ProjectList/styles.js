import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  padding-top: ${metrics.basePadding}px;
  padding-bottom: ${metrics.basePadding * 3}px;
  color: ${metrics.white};

  ul {
    list-style: none;
    li {
      display: flex;
      align-items: center;
      padding-top: ${metrics.basePadding * 1.5}px;

      div {
        font-size: ${metrics.font.mean}px;
        color: ${colors.white};
        padding-left: ${metrics.basePadding}px;
      }
    }
  }
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseMargin}px;
  height: ${metrics.baseMargin}px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: 0;
  background: ${colors.whiteTransparent};
  cursor: pointer

  :checked {
    background: ${colors.primary};
  }
`

export const Text = styled.div`
  padding: ${metrics.basePadding * 2}px 0 0 0;
  font-size: ${metrics.font.small}px;
  color: ${colors.white};
  opacity: 0.6;
  cursor: pointer;
`

export const Button = styled.button`
  border-radius: ${metrics.baseRadius * 5}px;
  height: ${metrics.baseMargin * 2.5}px;
  width: ${metrics.baseMargin * 15}px;
  background: ${colors.primary};
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
