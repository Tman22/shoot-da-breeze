import React from 'react';
import firebase, {reference, signIn} from '../firebase';


const Login = ({deteremineLog, logs, text}) => {
  return (
    <button onClick={()=>deteremineLog().then((response) => {
      logs(response);
    })}>{text}</button>
  );
};
export default Login;
