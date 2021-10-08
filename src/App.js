
import './App.css';
import {getAuth, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import { useState } from 'react';
import initializeAuthentications from './Firebase/firebase.init';
initializeAuthentications();
const googleProvider = new GoogleAuthProvider();
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setLogin] = useState(false);

  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      console.log(user);
    })
  }

  const toggleLogin = e => {
    setLogin(e.target.checked)
  }
 
  const handleNameChange = e => {
    setName(e.target.value);
  }
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }
  
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(result => {})
  }

  const handleRegistration = e => {
    e.preventDefault();
    console.log(email, password);
    if(password.length < 6){
      setError('Password Must be at least 6 characters long.')
      return;
    }
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('Password must contain 2 upper case');
      return;
    }
    if(isLogin){
      processLogin(email, password);
    }
    else{
      registerNewUser(email, password);
    }
  }
  
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setError('');
    })
    .catch(error => {
      setError(error.message);
    })
  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setError('');
      verifyEmail();
      setUserName();
    })
  }
  const setUserName = () => {
    updateProfile(auth.currentUser, {display: name})
    .then(result => {
      console.log(result);
    })
  }
const verifyEmail = () => {
  sendEmailVerification(auth.currentUser)
  .then(result => {
    console.log(result);
  })
}

    return (
    <div className="mx-5">
      <form onSubmit={handleRegistration}>
        <h3 className="text-primary">Please {isLogin ? 'Login' : 'Register'}</h3>
    <label htmlfor="inputName" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input type="text" onBlur={handleNameChange} className="form-control" id="inputName" placeholder="Your Name" />
    </div>
    <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
    <input type="email" onBlur={handleEmailChange}  className="form-control" id="inputEmail3" required/>
    </div>
    </div>
    <div className="row mb-3">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" onBlur={handlePasswordChange} className="form-control" id="inputPassword3" required/>
    </div>
    </div>
    <div className="row mb-3">
      <div className="col-sm-10 offset-sm-2">
        <div className="form-check">
          <input type="checkbox" onChange={toggleLogin} className="form-check-input" id="gridCheck1"/>
          <label htmlFor="gridCheck1" className="form-check-label">
            Already Registered? 
          </label>
        </div>
      </div>
    </div>
    <div className="row mb-3 text-danger">
      {error}
    </div>
    <button type="submit" className="btn btn-primary0000">
      {isLogin ? 'Login' : 'Register'}
    </button>
      <button type="button" onChange={handleResetPassword}>Reset Password</button>
</form>
<br/>
<br/>
<br/>
<div>-------------------------</div>
<br/>
<br/>
<br/>
<button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
