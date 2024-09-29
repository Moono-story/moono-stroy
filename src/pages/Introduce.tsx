import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Container from '../components/css/Container';
import Header from '../components/form/Header';
import Contents from '../components/css/Contents';
import IntroduceBtn from '../components/form/IntroduceBtn';
import { useTypingEffect } from '../components/hook/useTypingEffect';
import data from '../assets/introduce.json';
import theme from 'styles/theme';
import { userAtom } from 'recoil/userAtom';
import { useRecoilState } from 'recoil';
import { UserInfoAPI } from '../api/UserInfoAPI';
import { StampAPI } from 'api/StampAPI';

export const Introduce = (props: any) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [currentData, setCurrentData] = useState(data[pageIndex]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [stampStatus, setStampStatus] = useState({
    id: '',
    nickName: '',
    oneMission: false,
    twoMission: false,
    threeMission: false,
    fourMission: false,
    fiveMission: false,
  });

  useEffect(() => {
    if (user && user.sub) {
      UserInfoAPI(user.sub)
        .then((data) => {
          setStampStatus({
            id: data.id,
            nickName: data.nickName,
            oneMission: true,
            twoMission: data.twoMission,
            threeMission: data.threeMission,
            fourMission: data.fourMission,
            fiveMission: data.fiveMission,
          });
        })
        .catch((error) => {
          console.error('유저 정보 API 호출 실패:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (pageIndex >= 0) {
      setCurrentData(data[pageIndex]);
      setIsDataLoaded(true);
    }
  }, [pageIndex]);

  const { displayedText, handleClick } = useTypingEffect(
    isDataLoaded ? currentData.text : '',
    100
  );

  const handleNextPage = () => {
    if (pageIndex < data.length - 1) {
      setPageIndex(pageIndex + 1);
      setIsDataLoaded(false);
    } else {
      setPageIndex(-1);
    }
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      handleClick();
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [handleClick]);

  const goToMain = () => {
    StampAPI(stampStatus)
      .then((data) => {
        console.log('스템 API 호출 성공:', data);
        alert('무너 소개 미션 완료 !');
        window.location.href = '/main';
      })
      .catch((error) => {
        console.error('스템 API 호출 실패:', error);
      });
  };
  return (
    <Container>
      <Header>{'무너 소개서'}</Header>

      {pageIndex >= 0 ? (
        <StyledContents>
          <ContentSection style={{ height: '70%' }}>
            <TextSection style={{ whiteSpace: 'pre-wrap' }}>
              {displayedText && <span>{displayedText}</span>}{' '}
              {/* 타이핑된 텍스트 */}
            </TextSection>
            <ImgSection>
              <img src={currentData.img} alt="무너 이미지" />
            </ImgSection>
          </ContentSection>
          {pageIndex != 5 ? (
            <IntroduceBtn onClick={handleNextPage}>
              <Triangle />
              {currentData.buttonText} {/* 버튼 텍스트 */}
            </IntroduceBtn>
          ) : (
            <button onClick={handleNextPage}>TMI보러가기</button>
          )}
        </StyledContents>
      ) : (
        <StyledContents
          style={{
            backgroundColor: '#f3f3f3',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: '17%',
            }}
          >
            <ContentSection style={{ textAlign: 'center' }}>
              <ContentsStyle>
                <ImgSection>
                  <SemiTitle>SKILL</SemiTitle>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/intro/무너능력.png`}
                    alt="무너 능력치"
                  />
                </ImgSection>
                <SkillText>
                  인내심 말고는 못하는게 없는 <br />
                  <span style={{ fontSize: '0.7em' }}>(거의)</span> 꽉 찬 오각형
                </SkillText>
              </ContentsStyle>
              <ContentsStyle>
                <TMIStyle>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/intro/alien.png`}
                  />
                  무너의 MBTI는 ENTJ이다.
                </TMIStyle>
                <ImgSection style={{ margin: 'auto' }}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/intro/moo3.png`}
                    style={{
                      width: '170px',
                    }}
                  />
                </ImgSection>
              </ContentsStyle>
            </ContentSection>
          </div>
          <IntroduceBtn onClick={goToMain}>미션 완료</IntroduceBtn>
        </StyledContents>
      )}
    </Container>
  );
};

// 스타일 정의
const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledContents = styled(Contents)`
  /* display: flex; */

  align-items: center;
  justify-content: center;
  margin-top: 15%;
`;

const TextSection = styled.div`
  height: 80px;
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
  /* margin-bottom: 10%; */
  line-height: 1.5;
`;

const ImgSection = styled.div`
  /* width: 100%; */
  img {
    width: 290px;
    max-width: 90%;
    height: auto;
    margin: 5% 0;
  }
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SemiTitle = styled.div`
  font-size: 1em;
  text-align: center;
  display: flex;
  font-family: 'RixInooAriDuriR';
  font-weight: 900;
  color: #fff;
  background-color: ${theme.color.mainColor};
  margin: auto;
  padding: 5px 10px;
  border-radius: 20px;
`;

const ContentsStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
`;

const SkillText = styled.div`
  width: 100%;
  margin: auto;
  background-color: #fff;
  border-radius: 0 20px 0 20px;
  padding: 7% 0;
  text-align: center;
  margin: 3% 0;
`;

const TMIStyle = styled.div`
  display: flex;
  text-align: center;
  color: #6d6d6d;
  font-size: 0.9em;
  justify-content: center;

  img {
    width: 1.3em;
    margin-right: 5px;
  }
`;

const Blink = keyframes`
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  margin-right: 15px;
  border-style: solid;
  border-width: 6px 0px 6px 12px;
  border-color: transparent transparent transparent ${theme.color.mainColor};
  animation: ${Blink} 2.5s infinite;
`;
