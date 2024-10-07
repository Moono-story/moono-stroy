import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

// 유저 정보 불러오는 API 함수
export const UserInfoAPI = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/api/user/${id}`, {
      withCredentials: true, // 자격증명(Cookies) 포함
    });
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('데이터 불러오기 실패 : ', error);
    throw error; // 오류 발생 시 예외
  }
};
