import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  border: 1px solid ${colors.light};
  border-radius: ${metrics.baseRadius}px;
  width: 300px;
  padding-bottom: ${metrics.basePadding * 2}px;
  margin-bottom: ${metrics.baseMargin}px;
  color: ${colors.dark};
  hr {
    border: 0.5px solid ${colors.light};
    margin: ${metrics.baseMargin}px ${metrics.baseMargin / 2}px;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px ${metrics.basePadding * 2}px 0px ${metrics.basePadding * 2}px;
  height: ${metrics.inputHeight + 10}px;
  margin-bottom: ${metrics.baseMargin}px;
  background: linear-gradient(to top, ${colors.light}, ${colors.lighter});
  color: ${colors.normal};

  border-bottom: 1px solid ${colors.shaddow};
  box-shadow: 0 ${metrics.smallShaddow * 2}px ${metrics.smallShaddow * 2}px
    ${metrics.smallShaddow * -1}px ${colors.regular};
  -moz-box-shadow: 0 ${metrics.smallShaddow * 2}px ${metrics.smallShaddow * 2}px
    ${metrics.smallShaddow * -1}px ${colors.regular};
  -webkit-box-shadow: 0 ${metrics.smallShaddow * 2}px ${metrics.smallShaddow * 2}px
    ${metrics.smallShaddow * -1}px ${colors.regular};

  form {
    width: 100%;
  }
`

export const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: ${({ padding }) => (padding ? `0 ${metrics.basePadding}px` : '')};
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

export const Description = styled.span`
  color: ${colors.dark};
  font-size: ${metrics.font.bigger}px;
  font-weight: 500;
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
  cursor: pointer;

  :checked {
    background: ${colors.secondary};
  }
`

export const Text = styled.div`
  padding: ${metrics.basePadding * 2}px 0 0 0;
  font-size: ${metrics.font.small}px;
  color: ${colors.white};
  opacity: 0.6;
  cursor: pointer;
`

export const IconBtn = styled.button`
  border-radius: ${metrics.baseRadius}px;
  height: ${metrics.baseMargin}px;
  width: ${metrics.baseMargin}px;
  background: ${colors.transparent};
  margin-left: ${metrics.minPx * 10}px;
  border: 0;
  color: ${colors.editabledColor};
  font-size: ${metrics.font.bigger}px;
  font-weight: bold;
  cursor: pointer;
`
export const TextField = styled.input`
  background-color: ${colors.lighter};
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseDefault * 2}px;
  height: ${metrics.inputHeight}px;
  border: 0;
  border: 1px solid ${colors.light};

  font-family: Helvetica;
  font-size: ${metrics.font.bigger}px;
  color: ${colors.normal};

  text-align: left;

  ::placeholder {
    opacity: 0.5;
  }
`

export const TextFieldNewTask = styled.input`
  background-color: ${colors.white};
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.baseDefault * 1.8}px;
  height: ${metrics.inputHeight}px;
  border: 0;
  border: 1px solid ${colors.light};

  font-family: Helvetica;
  font-size: ${metrics.font.big}px;
  color: ${colors.normal};

  text-align: left;

  ::placeholder {
    opacity: 0.5;
  }
`

export const Button = styled.button`
  width: ${metrics.inputWidth}px;
  height: ${metrics.inputHeight}px;
  border-radius: ${metrics.baseRadius}px;
  background-color: ${colors.addTaskBtn};
  color: ${colors.white};
  font-weight: bold;
  cursor: pointer;
`
