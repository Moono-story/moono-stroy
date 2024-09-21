import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      <BackIcon onClick={() => navigate(-1)}>
        <img
          src={`${process.env.PUBLIC_URL}/images/header/back.png`}
          alt="Back"
        />
      </BackIcon>
      <Title>{children}</Title> {/* children으로 타이틀을 받음 */}
    </HeaderStyle>
  );
};

export default Header;

const HeaderStyle = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
  max-width: 480px;
  padding: 3%;
  box-sizing: border-box;
`;

const BackIcon = styled.div`
  /* flex: 0.5; */
  cursor: pointer;
`;

const Title = styled.span`
  flex: 1;
  font-size: 1.4em;
  font-weight: 700;
  text-align: center;
  flex: 1;
`;
