import styled from 'styled-components'

import { metrics } from '~/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  padding: ${metrics.basePadding}px 0;
  margin: 0 ${metrics.baseMargin}px;
  span {
    font-weight: 500;
    font-size: ${metrics.font.bigger}px;
  }
  ul {
    list-style: none;
    padding-top: ${metrics.basePadding}px;
    li {
      display: flex;
      align-items: center;
    }
  }
`
