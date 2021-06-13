import React,{useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';//상대경로로 지정, jsconfig.json 작성해준덕에 이렇게 쓸수 있음

function App() {
  const [init, setInit] = useState(false);//아직 초기화 되지않은 상태/파이어베이스가 프로그램을 초기화할때까지 기다려야됨
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //라우터에게 isLoggedIn prop을 전달해준다.
  //AppRouter을 쓰고 다른것을 분리하여 쓸 수 있도록. ex)footer

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){//변화가 있는지를 듣고 있는 부분(누군가 Create Account나 Log In을 눌렀을 때!)
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])

  //auth의 currentUser를 통해 유저의 로그인 여부를 알 수 있게 되었다.
  return (
  <>
  {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..." }
  <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
  );
}

export default App;
