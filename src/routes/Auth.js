import { authService } from 'fbase';
import React, {useState} from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {//다른 onChange를 각각 만들지 않기 위해서.
        //event는 무슨일이 일어났는것.즉 input이 변경된것. 그중 하나의 정보가 target
        //target은 변경이 일어난 곳이고, 그안에 name과 value가 있다.
        const {
            target:{name, value},
        } = event;
        if(name === "email"){
            setEmail(value);
        }else if(name ==="password"){
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();//기본행위인 새로고침이되는 것을 막는다.
        try{
            let data;
            if(newAccount){
                //새 계정을 생성
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );//계정을 생성하면 자동으로 로그인 될 것이다.
                //웹페이지 검사에서 Application - IndexDB - firbase로 가서 새로고침해보면
                //유저가 하나 있는것을 볼 수 있다.(파이어베이스가 접속된 유저 정보를 기억)
                //App.js에 currentUser도 null이 아닌 값으로 바뀌어야한다.
                //처음에 authService.current유저는 매우빠르게 들어가기때문에 null값이 됨.

            }
            else{
                //로그인
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }
        catch(error){
            setError(error.message);
            //이미 있는 이메일로 가입해도 에러남.
        }
        
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);//반대되는 값을 리턴
    //newAccount값을 바꿔서 로그인 또는 계정생성을 선택할 수 있게 한다.
    return (
<div>
    <form onSubmit={onSubmit}>
        <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        required 
        value={email} //input은 value를 받아온다. 만약 input에 "hi"를 적어두면 계속 hi라는 글자만 보임
        //여기서는 onchange를 통해 계속 변경되는 email값을 보여준다
        //input의 value는 state에 저장된다.
        onChange={onChange}//키를 누르는 순간마다 onChange 발생
        />
        <input 
        name="password" 
        type="password" 
        placeholder="Password" 
        required 
        value={password} 
        onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} /> 
        {error}
    </form>
    <sapn onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account"}</sapn>
    <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
    </div>
</div>
    )
}
export default Auth;
//이런식으로 작성하면 라우터에서 Auth르 ㄹ쓰면 자동으로 import 할 수 있게 된다.
//<Auth를 쓰고 엔터 누르면 자동으로 import 됨.

// export default () => <span>Auth</span>
//function component

//라우터를 사용하기위해 npm i react-router-dom