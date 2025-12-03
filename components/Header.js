import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import {useEffect, useState} from "react";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
  background-color: #222;
  padding: 12px 0;
`;
const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 22px;
  font-weight: 600;
  
  @media screen and (max-width: 768px) {
    gap: 10px;
    font-size: 18px;
  }
`;

const LogoImage = styled(Image)`
  @media screen and (max-width: 768px) {
    width: 80px !important;
    height: 32px !important;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;
const NavArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-end;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: ${props => props.mobileNavActive ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 120px 20px 20px;
    background-color: #222;
    z-index: 9998;
    overflow-y: auto;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  position: static;
  padding: 0;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    color: #fff;
    transform: translateY(-2px);
  }
  
  @media screen and (max-width: 768px) {
    padding: 16px 0;
    font-size: 20px;
    
    &:hover {
      transform: none;
    }
  }
  
  @media screen and (min-width: 768px) {
    padding:0;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 44px;
  height: 44px;
  border:0;
  color: white;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: relative;
  z-index: 10000;
  flex-shrink: 0;
  
  @media screen and (max-width: 768px) {
    display: flex;
  }
  
  svg {
    width: 28px;
    height: 28px;
  }
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-size: 14px;
  
  button {
    background: transparent;
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 4px 10px;
    color: #fff;
    cursor: pointer;
    font-size: 13px;
  }
`;


export default function Header() {
  const [mobileNavActive,setMobileNavActive] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const isLoggedIn = !!userEmail;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('menu-open', mobileNavActive);
    }
  }, [mobileNavActive]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedEmail = window.localStorage.getItem('userEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
      // опитваме да вземем името от бекенда
      fetch(`/api/user?email=${encodeURIComponent(savedEmail)}`)
        .then(res => res.json())
        .then(data => {
          if (data?.name) {
            setUserName(data.name);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('userEmail');
      setUserEmail('');
      setUserName('');
    }
  };
  return (
    <StyledHeader>
      <HeaderInner>
        <Wrapper>
          <Logo href={'/'}>
            <LogoImage 
              src="/натруфенка.png" 
              alt="Туристическа агенция - Лого" 
              width={120} 
              height={48}
              style={{objectFit: 'contain'}}
            />
            Туристическа агенция
          </Logo>
          <NavArea>
            <StyledNav>
              <NavLink href={'/'}>Начало</NavLink>
              <NavLink href={'/trips'}>Екскурзии</NavLink>
              <NavLink href={'/categories'}>Категории</NavLink>
              <NavLink href={'/destinations'}>Дестинации</NavLink>
              <NavLink href={'/account'}>Акаунт</NavLink>
            </StyledNav>
            {isLoggedIn && (
              <UserArea>
                <span>Здравей, {userName || userEmail}</span>
                <button onClick={handleLogout}>Изход</button>
              </UserArea>
            )}
          </NavArea>
          <MobileNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'} onClick={() => setMobileNavActive(false)}>Начало</NavLink>
            <NavLink href={'/trips'} onClick={() => setMobileNavActive(false)}>Екскурзии</NavLink>
            <NavLink href={'/categories'} onClick={() => setMobileNavActive(false)}>Категории</NavLink>
            <NavLink href={'/destinations'} onClick={() => setMobileNavActive(false)}>Дестинации</NavLink>
            <NavLink href={'/account'} onClick={() => setMobileNavActive(false)}>Акаунт</NavLink>
            {isLoggedIn && (
              <div style={{marginTop: '24px', textAlign: 'center', color: '#fff'}}>
                <div style={{marginBottom: '8px'}}>
                  Здравей, {userName || userEmail}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileNavActive(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #fff',
                    borderRadius: '4px',
                    padding: '6px 14px',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Изход
                </button>
              </div>
            )}
          </MobileNav>
          <NavButton className="nav-toggle" mobileOpen={mobileNavActive} onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon className="w-8 h-8" />
          </NavButton>
        </Wrapper>
      </HeaderInner>
    </StyledHeader>
  );
}