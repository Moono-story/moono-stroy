import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from '../components/form/Header';
import Container from '../components/css/Container';
import BoardInput from '../components/form/BoardInput';
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import { GetBoardAPI, PostBoardAPI, DeleteBoardAPI } from 'api/BoardAPI';
import Contents from '../components/css/Contents';
import theme from 'styles/theme';

const CheerUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useRecoilState(userAtom);
  const [textList, setTextList] = useState([]);
  const [postText, setPostText] = useState({
    userId: user.sub,
    content: '',
    title: user.nickName,
  });
  const [refresh, setRefresh] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null); // 마지막 메시지에 대한 Ref

  useEffect(() => {
    if (user && user.nickName) {
      setPostText({
        ...postText,
        title: user.nickName,
        userId: user.sub,
      });
    }
  }, [user]);

  useEffect(() => {
    const getData = async () => {
      const data = await GetBoardAPI();
      setTextList(data);
    };
    getData();
  }, [refresh]);

  useEffect(() => {
    // 메시지가 업데이트될 때마다 스크롤을 마지막 메시지로 이동
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [textList]); // textList가 업데이트될 때 실행

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostText({
      ...postText,
      content: e.target.value,
    });
  };

  const onClickInputBtn = async () => {
    try {
      await PostBoardAPI(postText);
      setRefresh(!refresh);
      setPostText({ ...postText, content: '' });
    } catch (error) {
      console.error('에러입니다:', error);
    }
  };

  const onClickDeleteBtn = async (postId: any) => {
    try {
      await DeleteBoardAPI(postId);
      setRefresh(!refresh);
    } catch (error) {
      console.error('에러입니다:', error);
    }
  };

  return (
    <Container style={{ backgroundColor: 'black', color: '#fff' }}>
      <Header
        bgColor="#121212"
        iconSrc={`${process.env.PUBLIC_URL}/images/header/whiteBack.png`}
      >
        {'무너 응원하기'}
      </Header>
      <Contents style={{ backgroundColor: '#121212', color: '#fff' }}>
        <ImgArea>
          <img
            src={`${process.env.PUBLIC_URL}/images/cheerup/cheer.png`}
            alt="무퀴즈"
            style={{ width: '100%' }} // 이미지 크기 조정
          />
        </ImgArea>
        <div
          style={{ fontSize: '1.6em', fontWeight: '700', marginBottom: '2%' }}
        >
          <span style={{ color: '#ffd900' }}>응원</span>의 한마디
        </div>
        <BoardArea>
          {textList.map((data: any, idx) => (
            <TextLine
              key={idx}
              ref={idx === textList.length - 1 ? lastMessageRef : null}
            >
              <span>
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: `${theme.color.pointColor}`,
                  }}
                >
                  {data.title}{' '}
                </span>
                <span style={{ fontWeight: '500', fontSize: '12px' }}>
                  : {data.content}{' '}
                </span>
              </span>
              {data.userId === user.sub && (
                <span>
                  <InputBtn
                    onClick={() => onClickDeleteBtn(data.postId)}
                    style={{ fontSize: '10px' }}
                  >
                    삭제
                  </InputBtn>
                </span>
              )}
            </TextLine>
          ))}
        </BoardArea>
        <InputArea style={{ color: '#fff' }}>
          <BoardInput onChange={onChangeText} value={postText.content} />
          <InputBtn onClick={onClickInputBtn}>입력</InputBtn>
        </InputArea>
      </Contents>
    </Container>
  );
};

export default CheerUpPage;

const ImgArea = styled.div`
  margin-top: 14%;
  margin-bottom: 20px;
`;

const BoardArea = styled.div`
  width: 90%;
  height: 40%;
  max-height: 300px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
`;

const InputArea = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const InputBtn = styled.button`
  background-color: #ea3636;
  color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const TextLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;
