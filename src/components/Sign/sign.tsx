import React, { useState } from 'react'
import {  signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firbase';
import { Navigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg'
import { Message } from './message';
export const Sign = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [emailError,setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((res:any)=> {
            console.log(res)
            console.log('res', res.user);
            
            localStorage.setItem("token", JSON.stringify(res.user.uid));
            window.location.assign('/')         
        })
          .catch((err: any) => {
            // console.log('err',err)
            switch (err.code) {
              case "auth/Invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError('User not found!');
                break;
              case "auth/wrong-password":
                setPasswordError('Combination does not match!');
                break;
              default:
            }
          });
      };

      const handleSignUp = () => {
        console.log('creating');
        
        createUserWithEmailAndPassword(auth,email, password)
          .catch((err:any) => {
            console.log('err', err)
            switch (err.code) {
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                setEmailError(err.message);
                break;
              case "auth/weak-password":
                setPasswordError(err.message);
                break;
              default:
            }
          });
      };

      const onMsgClose = () => {
        setEmailError('')
        setPasswordError('')
      }

    return (
        <>
        {(passwordError || emailError) &&
        <Message msg={passwordError || emailError} onClose={onMsgClose}/>
}
      <div className="flex min-h-full flex-1 flex-col justify-center z-10 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-[50px] w-[30%]"
            src={logo}
            alt="Your Company"
          />
          {isSignUp ? 
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up 
        </h2> :
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                    onChange={(e)=> setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {!isSignUp &&
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
}
              </div>
              <div className="mt-2">
                <input
                onChange={(e)=> setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                {isSignUp ?
                 <button
                 onClick={()=> handleSignUp()}
                 type="submit"
                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
                 Sign Up
               </button> :
              <button
              onClick={() => handleLogin()}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
}
            </div>
          {/* </form> */}

          <p className="mt-10 text-center text-sm text-gray-500">{isSignUp ? 'Have an account?' :
            "Not a member?" }
            <a onClick={()=> setIsSignUp(!isSignUp)}className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              {!isSignUp ? "Sign Up" : 'Sign In' }
            </a>
          </p>
        </div>
      </div> 
        
    </>
    )
}