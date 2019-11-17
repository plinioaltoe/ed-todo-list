import styled from 'styled-components'

import { colors, metrics } from '~/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  border: 1px solid ${colors.light};
  border-radius: ${metrics.baseRadius}px;
  width: 400px;
  padding-bottom: ${metrics.basePadding * 2}px;
  margin: 0 ${metrics.baseMargin}px ${metrics.baseMargin}px ${metrics.baseMargin}px;
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
`
export const Error = styled.p`
  color: ${colors.danger};
  padding-left: ${metrics.basePadding}px;
  background: ${({ project }) => project && colors.lighter};
`

export const Description = styled.span`
  color: ${colors.dark};
  font-size: ${metrics.font.bigger}px;
  font-weight: 500;
`

export const IconGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
  background-color: ${({ isTask }) => (isTask ? colors.white : colors.lighter)};
  border-radius: ${metrics.baseRadius}px;
  width: ${({ isTask }) =>
    isTask ? `${metrics.baseDefault * 1.8}px` : `${metrics.baseDefault * 2}px`};
  height: ${metrics.inputHeight}px;
  border: 0;
  border: 1px solid ${colors.light};
  padding-left: ${metrics.basePadding}px;
  font-family: Helvetica;
  font-size: ${({ isTask }) =>
    isTask ? `${metrics.font.big}px` : `${metrics.font.bigger}px`};
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
