import firebase from "firebase/app";
import "firebase/auth";
//auth를 사용하기 위해서는 import해야한다.

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID 
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
//auth서비스를 많이 호출하기위해 이렇게 작성한다.

//npm install --save firebase와 함꼐 이 파일을 만들어 준다.

//.env 파일에 적어둠
//환경변수 이름은 이랙트에서 REACT_APP_으로 이름이 시작 되어야 한다.
//gitignore에 .env를 적어준다. 그러면 .env 파일은 git으로부터 ignore 됨.(다른 사람들에게 나의 키를 공개하지 않게 하기 위함)
//그러나 사람들로 하여금 완전히 숨길 수 있게 해주는 것은 아니다. React application을 실행하면 결국 .env에 있는 값들이 들어감.(끄렇지 않으면 파이어베이스에 접근할 수 없음)
//따라서 지금 이것은 오로지 깃허브를 위한 부분임.