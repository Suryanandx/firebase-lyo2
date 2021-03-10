import React, { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import {SidebarData} from './SidebarData'
import SubMenu from './SubMenu';
import CloseIcon from '@material-ui/icons/Close';
import { Container } from '@material-ui/core';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;


const Sidebar = ({match}) => {
 const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
           <Nav>
               <NavIcon to="#">
                <MenuIcon style={{color: "white"}} onClick={showSidebar}/>
               </NavIcon>
               <img style={{marginLeft: "20px"}} src="http://arizonsystems.com/img/arizon.webp"/> 

           </Nav>
           
           <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <CloseIcon style={{color: "white"}}  onClick={showSidebar} />
              <img style={{marginLeft: "20px"}} src="http://arizonsystems.com/img/arizon.webp"/> 
           </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu match={match} item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
        </>
    )
}

export default Sidebar
