import styled from 'styled-components'

import { colors, metrics } from '../../styles'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${metrics.basePadding * 1.5}px ${metrics.basePadding * 2}px
    ${metrics.basePadding * 1.5}px ${metrics.basePadding * 2}px;
  margin-bottom: ${metrics.baseMargin * 2}px;
  background: linear-gradient(to top, ${colors.light}, ${colors.white});
  color: ${colors.normal};

  border-bottom: 1px solid ${colors.shaddow};
  box-shadow: 0 ${metrics.smallShaddow * 2}px ${metrics.smallShaddow * 2}px
    ${metrics.smallShaddow * -1}px ${colors.ligther};
  -moz-box-shadow: 0 ${metrics.smallShaddow * 2}px ${metrics.smallShaddow * 2}px
    ${metrics.smallShaddow * -1}px ${colors.ligther};
  -webkit-box-shadow: 0 ${metrics.smallShaddow * 2}px ${metrics.smallShaddow * 2}px
    ${metrics.smallShaddow * -1}px ${colors.ligther};
`

export const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 80%;

  a {
    font-weight: bold;
    font-size: ${metrics.font.small}px;
    color: ${colors.normal};
    padding-left: ${metrics.basePadding * 3}px;
    text-decoration: none;
    :hover {
      color: ${colors.normal};
      text-shadow: 0px 0px 5px ${colors.white};
    }
  }
`
export const MenuProfile = styled.div`
  div {
    display: flex;
    min-width: ${metrics.baseDefault / 2}px;
    justify-content: space-around;
  }
  a {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: ${metrics.font.small}px;
    color: ${colors.normal};
    border-radius: ${metrics.basePadding}px;
    background: linear-gradient(to top, ${colors.light}, ${colors.lighter});
    padding: ${metrics.basePadding * 1.3}px ${metrics.basePadding}px
      ${metrics.basePadding * 1.3}px ${metrics.basePadding}px;
    text-decoration: none;
    :hover {
      color: ${colors.normal};
      text-shadow: 0px 0px 5px ${colors.regular};
    }
  }

  li {
    display: block;
  }

  li:hover {
    cursor: pointer;
  }

  ul {
    position: absolute;

    right: 0;
    display: none;
  }

  :hover > ul,
  ul:hover {
    visibility: visible;
    opacity: 1;
    display: block;
  }

  li {
    clear: both;
    width: 100%;
  }
`
