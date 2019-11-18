import styled from 'styled-components'

import { colors, metrics } from '~/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
`

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  color: ${colors.white};
  padding: 0 ${metrics.basePadding * 4}px;
  border-right: 1px solid ${colors.lighter};
`
