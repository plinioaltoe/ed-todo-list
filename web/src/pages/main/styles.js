import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const ContainerList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: inherit;
  color: ${colors.white};
  font-size: ${metrics.font.small}px;
  font-weight: bold;
  padding: ${metrics.basePadding}px 10px ${metrics.basePadding}px 10px;
  margin-bottom: ${metrics.baseMargin}px;
  align-items: center;
`
export const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`
