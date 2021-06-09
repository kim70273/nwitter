import {React, useState} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

//인증(로그인) 여부에 따라 다른 라우터
//Hooks를 이용해서 로그인이 되어 있다면 Home을 보여준다.
const AppRouter =  () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <Switch>
                {isLoggedIn ? 
                <>
                <Route exact path="/">
                    <Home />
                </Route>
                </> : <Route exact path="/"><Auth /></Route>}
            </Switch>
        </Router>
    );
};

export default AppRouter;

//<> </>는 Fragment인데 많은 요소를 render 하고 싶을때 사용