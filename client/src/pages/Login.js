import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Context from '../context/Context';

const LoginBlock = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f3f5;

  .loginForm {
    width: 370px;
    display: flex;
    height: 450px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.17);
  }

  .loginLogo {
    margin-top: 20px;
    width: 260px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: bold;
    font-family: 'YES24';
    color: green;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }

  .loginInputBox {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
  }

  .loginInput {
    width: 260px;
    height: 45px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #dfdfde;
    background-color: #f8f9fa;
    font-size: 16px;
    font-family: 'GyeonggiBatang';

    &:focus {
      outline: none;
    }
  }

  .loginBtn {
    width: 260px;
    height: 45px;
    background-color: green;
    color: white;
    border: none;
    font-size: 17px;
    font-weight: bold;
    font-family: 'GyeonggiBatang';

    &:hover {
      cursor: pointer;
    }
  }

  .registerBox {
    width: 260px;
    height: 70px;
    border-top: 2px solid #dfdfde;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .registerLink {
    text-decoration: none;
    color: green;
    font-weight: bold;
  }
`;

function Login() {
  //글로벌 전역 상태값 loggedUser, loggedIn, setLoggedUser, setLoggedIn를 받아옴
  const { setLoggedIn, setLoggedUser } = useContext(Context);

  //url 이동을 위한 useNavigate
  const navigate = useNavigate();

  //input에서 입력한 아이디와 비밀번호 정보를 담기위한 state
  const [loginInfo, setLoginInfo] = useState({
    user_id: '',
    password: '',
  });

  //input에 입력하면 자동적으로 loginInfo state값 변경
  const handleChange = e => {
    const { name, value } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setLoginInfo({
      ...loginInfo,
      [name]: value, // input에 지정한 네임 속성에 해당 value 값을 넣어 오버라이딩
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const login = await axios.post(
        'http://localhost:5000/auth/login',
        loginInfo,
        { withCredentials: true }
      );
      setLoggedIn(true);
      setLoggedUser(login.data);
      //성공하면 해당 url로 이동
      navigate('/');
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <LoginBlock>
      <form className='loginForm' onSubmit={handleSubmit}>
        <NavLink to='/' className='loginLogo'>
          영숙마켓
        </NavLink>
        <div className='loginInputBox'>
          <input
            className='loginInput'
            type='text'
            placeholder='아이디'
            name='user_id'
            value={loginInfo.user_id}
            onChange={handleChange}
          />
          <input
            className='loginInput'
            type='password'
            placeholder='비밀번호'
            name='password'
            value={loginInfo.password}
            onChange={handleChange}
          />
          <button className='loginBtn' type='submit'>
            로그인
          </button>
        </div>
        <div className='registerBox'>
          계정이 없으신가요?&nbsp;&nbsp;
          <NavLink className='registerLink' to='/register'>
            가입하기
          </NavLink>
        </div>
      </form>
    </LoginBlock>
  );
}

export default Login;
