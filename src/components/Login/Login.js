import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import {
  getAuth, signInWithPopup,
  GoogleAuthProvider, signOut,
  updateProfile, signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  FacebookAuthProvider
}
  from "firebase/auth";
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
const fbProvider = new FacebookAuthProvider();
const app = initializeApp(firebaseConfig)

function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    userName: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new GoogleAuthProvider();
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user
        const signedInUser = {
          isSignedIn: true,
          userName: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser)

      })
      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage)
      })
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      const signOutUser = {
        isSignedIn: false,
        userName: '',
        email: '',
        photo: '',
        error: ''
      }
      setUser(signOutUser)
    }).catch((error) => {
      console.log(error)
    });
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)

    }
    if (event.target.name === 'password') {
      const isPassValid = event.target.value.length > 6
      const passwordHasNumber = /\d{1}/.test(event.target.value)
      isFieldValid = isPassValid && passwordHasNumber

    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) => {
    console.log(user.email, user.password)
    // if new user and  user.name = true and user.password = true
    if (newUser && user.name && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user }
          newUserInfo.success = true
          newUserInfo.error = ""
          setUser(newUserInfo)
          updateUserName(user.name)

        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.success = false
          setUser(newUserInfo)
        });
    }
    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          const newUserInfo = { ...user }
          newUserInfo.success = true
          newUserInfo.error = ""
          setUser(newUserInfo)
          setLoggedInUser(newUserInfo)
          history.replace(from);
          console.log('sign in user info', userCredential.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.success = false
          setUser(newUserInfo)
        });
    }
    e.preventDefault()
  }

  const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      console.log('user name updated successfuly')
    }).catch((error) => {
      // An error occurred
      console.log(error)
    });
  }

  const handleFbSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        console.log('fb user after sign in', result)

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }
  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={handleFbSignIn}>Sign In using facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome {user.userName}</p>
          <p>Your Email {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newuser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {
          newUser &&
          <input type="text" name="name" onBlur={handleBlur} placeholder='your name' required />

        }
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder='your email' required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder='your password' required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p>{user.error}</p>
      {
        user.success && <p>User {newUser ? 'create' : 'logged In'} successfully</p>
      }
    </div>
  );
}

export default Login;
