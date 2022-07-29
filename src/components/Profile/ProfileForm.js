import { useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {

  const history=useHistory();
  const newpasswordInputRef=useRef();
  const authctx=useContext(AuthContext)

  const submitHanlder=event=>{
    event.preventDefault();
    const enteredpassword=newpasswordInputRef.current.value;

   fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBBr5cZmLLfc1pErz8GPHgjftiPbbtnjkU', {
    method:'POST',
    body:JSON.stringify({
      idToken:authctx.token,
      password:enteredpassword,
      returnSecureToken:false


    }),
    headers: {
      'Content-Type':'application/json'
    }
   }).then(res=> {
    // success
    // console.log(res)
    if(res.ok){
      return res.json()
      

    }
    else {
      return res.json().then((data)=> {
        let errormessages="vertication failed";

        throw new Error(errormessages)
      });

    }
   
   }).then((data)=> {
    history.replace('/');
   })
   .catch((err)=> {
    alert(err.message)
   })


  };
  return (
    <form className={classes.form} onSubmit={submitHanlder}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newpasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
