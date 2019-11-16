import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 200px;
  background: ${colors.white};
  margin-top: ${metrics.baseMargin * 15}px;
  border-radius: ${metrics.baseRadius}px;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min-content;
  p {
    color: ${colors.danger};
    margin-bottom: ${metrics.baseMargin}px;
    text-align: center;
  }
`

export const Img = styled.img`
  padding: 0px 0px ${metrics.basePadding * 4}px 0;
`

export const Text = styled.div`
  padding: ${metrics.basePadding / 2}px 0 ${metrics.basePadding / 2}px 0;
  width: 200px;
  opacity: 0.8;
  font-size: 16px;
`

export const Button = styled.button`
  background: ${colors.success};
  height: 32px;
  border-radius: ${metrics.baseRadius * 3}px;
  color: ${colors.white};
  line-height: 32px;
  padding: 0 35px;
  border: 0;
  margin-top: ${metrics.baseMargin}px;
  font-size: 12px;
  width: 200px;
  cursor: pointer;
`
