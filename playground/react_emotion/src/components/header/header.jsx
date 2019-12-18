import * as React from 'react';
import { useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import logo from '../../assets/fuse-box-logo.svg';
import hamburger from '../../assets/hamburger.svg';
import github from '../../assets/github.svg';

const navItemStyles = (props) => css`
  float: left;
  display: block;
  color: #f2f2f2;
  text-decoration: none;
  padding: 0 16px;
  text-align: center;
  vertical-align: middle;
  line-height: 56px;

  &:hover {
    background-color: #515151;
  }

  ${props.active
    ? `
      background-color: #1d79bf;
      color: white;
      `
    : ``
  }
`;

const StyledLogoItem = styled('a')`
  float: ${props => props.float || 'left'};
  display: block;
  width: ${props => props.width || '40px'};
  height: ${props => props.height || props.width || '40px'};
  padding: ${props => props.width ? Math.round((56 - parseInt(props.width, 10)) / 2) : 8}px;
  margin-left: 12px;
  margin-right: 12px;
`;

const hamburgerStyles = css({
  display: 'none',
  width: '30px',
  height: '30px',
  padding: '16px 13px 10px',
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '0',
  position: 'absolute',
  right: 0,
  top: 0,
  cursor: 'pointer'
});

const NavigationContainer = styled.div`
  background-color: #223351;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    a:not(:first-of-type) {
      display: none;
    }
    a.icon {
      display: block;
    }
  }

  @media screen and (max-width: 600px) {
    ${props => props.showNav
    ? `
      position: relative;
      > .github-text {
        display: block;
      }
      > .github-logo {
        display: none !important;
      }
      > a.icon {
        background-color: #1d79bf;
      }

      > a {
        float: none;
        display: block !important;
        text-align: left;
      }
      `
    : ``
  }
  }
`;

const NavigationItem = ({ children, to, active, style }) => (
  <a css={navItemStyles({ active })} href={to} style={style}>
    {children}
  </a>
);

export const Header = () => {
  const [showNav, updateShowNav] = useState(false);

  return (
    <NavigationContainer showNav={showNav}>
      <StyledLogoItem href='/'>
        <img src={logo} alt='FuseBox Logo' height='100%' />
      </StyledLogoItem>
      <NavigationItem to='#news'>
        Documentation
      </NavigationItem>
      <NavigationItem to='#about'>
        Plugins
      </NavigationItem>
      <NavigationItem to='#about'>
        Release notes
      </NavigationItem>
      <NavigationItem to='https://github.com/fuse-box/fuse-box' style={{ display: 'none' }}>
        Github
      </NavigationItem>
      <StyledLogoItem href='https://github.com/fuse-box/fuse-box' width='32px' float='right' className='github-logo'>
        <img src={github} alt={`FuseBox's github`} />
      </StyledLogoItem>
      <a css={hamburgerStyles} className='icon' onClick={() => updateShowNav(!showNav)}>
        <img src={hamburger} alt='Show top navigation' />
      </a>
    </NavigationContainer>
  );
};
