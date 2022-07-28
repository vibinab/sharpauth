import { useState ,useRef} from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailinputref=useRef();
  const passwordinputref=useRef()

  const [isLogin, setIsLogin] = useState(true);
  const [isloading,setisloading]=useState(false);
  const [iserror, setiserror]=useState(false);
  const [errormsg, seterrormsg]=useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  const submitHanlder=(event)=> {
    event.preventDefault();
    const enterredemail= emailinputref.current.value;
    const enteredpassword=passwordinputref.current.value
  
setisloading(true)
if(isLogin){


  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBr5cZmLLfc1pErz8GPHgjftiPbbtnjkU',{
    method:'POST',
    body:JSON.stringify({
      email:enterredemail,
      password:enteredpassword,
      returnSecureToken:true
    }),
    headers: {
      'Content-Type':'application/json'
     }

  }).then((res)=> {
    setisloading(false)
   
    if(res.ok){
      return res.json();
    }
    else {
      return res.json().then((data)=> {
        let errormessage="Authenication failed";

        throw new Error(errormessage)
      });
    }


  }).then(data=> {
    console.log(data)
  })
  .catch(err=> {
   alert(err.message)
  })

}
else
{
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBr5cZmLLfc1pErz8GPHgjftiPbbtnjkU', {
   method:'POST',
   body:JSON.stringify({
    email:enterredemail,
    password:enteredpassword,
    returnSecureToken:true

   }),
   headers: {
    'Content-Type':'application/json'
   }

  }).then(res=> {
    setisloading(false)
    if(res.ok){

    }
    else {
      res.json().then((data)=> {
        // let errormessage='Authenctication failed';
        let errormessage
        if(data && data.error && data.error.message){
          errormessage=data.error.message;
          seterrormsg(errormessage)

        }
        setiserror(true)
        // alert(errormessage)
      });
    }

  });
} 

}



  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHanlder}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailinputref}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordinputref}/>
        </div>
        <div className={classes.actions}>
          {!isloading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isloading && <p>Sending request</p>}
          {iserror && <p>{errormsg}</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
