import styled from 'styled-components';
import Container from '../components/css/Container';
import Header from '../components/form/Header';
import theme from 'styles/theme';
import { useNavigate } from 'react-router-dom';
import Stamp from '../components/css/Stamp';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import Contents from '../components/css/Contents';

export const StampPage = (props: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);

  // 스탬프 상태 관리
  const [stamps, setStamps] = useState([
    { id: 1, title: '무너 소개', completed: true },
    { id: 2, title: '무퀴즈', completed: true },
    { id: 3, title: '무너 응원', completed: true },
    { id: 4, title: '오늘 운세', completed: true },
    { id: 5, title: '무너 네컷', completed: true },
  ]);

  useEffect(() => {
    setStamps([
      { id: 1, title: '무너 소개', completed: user.oneMission },
      { id: 2, title: '무퀴즈', completed: user.twoMission },
      { id: 3, title: '무너 응원', completed: user.threeMission },
      { id: 4, title: '오늘 운세', completed: user.fourMission },
      { id: 5, title: '무너 네컷', completed: user.fiveMission },
    ]);
  }, []);

  // 미션 완료 함수
  const completeMission = (id: number) => {
    setStamps(
      stamps.map((stamp: any) =>
        stamp.id === id ? { ...stamp, completed: true } : stamp
      )
    );
  };

  return (
    <StyledContainer>
      <StyledHeader>{'미션진행도'}</StyledHeader>
      <StyledContents>
        <CoffeImgSection>
          <CoffeText>
            <div>
              <span style={{ color: `${theme.color.mainColor}` }}>무스</span>
              구경하고
            </div>
            <div>아메리카노 마시자!</div>
          </CoffeText>
          <img
            src={`${process.env.PUBLIC_URL}/images/stamp/coffeimga.png`}
            style={{ width: '80%' }}
          />
        </CoffeImgSection>
        <StampSection>
          <StampText>
            <div style={{ fontSize: '1.2em' }}>
              미션을 완료하고 도장을 모아보세요.
            </div>
            <div style={{ fontSize: '0.8em', marginTop: '10px' }}>
              도장을 다 모으면 응모 가능해요!
            </div>
          </StampText>
          <StampArea>
            <StampRow>
              {stamps.slice(0, 3).map((stamp) => (
                <Stamp
                  key={stamp.id}
                  page={stamp.title}
                  completed={stamp.completed}
                />
              ))}
            </StampRow>
            <StampRow>
              {stamps.slice(3, 5).map((stamp) => (
                <Stamp
                  key={stamp.id}
                  page={stamp.title}
                  completed={stamp.completed}
                />
              ))}
            </StampRow>
          </StampArea>
        </StampSection>
        <ApplyButton onClick={() => completeMission(1)}>응모하기</ApplyButton>
      </StyledContents>
    </StyledContainer>
  );
};

// 스타일 수정 부분
const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 24%,
    rgba(243, 224, 136, 1) 100%
  );
  padding-top: 60px; /* Header와 Contents 간의 간격을 유지 */
`;

const StyledHeader = styled(Header)`
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 1.8em;
  background-color: ${theme.color.mainColor};
  color: white;
  position: relative;
  z-index: 1;
`;

const StyledContents = styled(Contents)`
  width: 100%;
  /* padding-top: 20%; */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 24%,
    rgba(243, 224, 136, 1) 100%
  );
  margin-top: 10%;
  z-index: 0;
`;

const CoffeImgSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  min-height: 350px;
`;

const CoffeText = styled.div`
  font-size: 1.4em;
  font-weight: 700;
  text-align: center;
  margin: 20px;
`;

const StampSection = styled.div`
  width: 100%;
  font-weight: 400;
  align-items: center;
  height: 45%;
  min-height: 310px;
  /* margin-bottom: 10%; */
`;

const StampText = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const StampArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 5% 0 3% 0;
`;

const StampRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 7px;
`;

const ApplyButton = styled.button`
  width: 100%;
  height: 10%;
  min-height: 60px;
  background-color: ${theme.color.mainColor};
  color: #fff;
  font-size: 1.4em;
`;
