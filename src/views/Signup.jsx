import { Link } from "react-router-dom";
import {createRef, useState, useRef} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import '../css/guest.css'


export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
          }
          // console.log(payload);
          axiosClient.post('/signup', payload)
            .then(({data}) => {
              setUser(data.user)
              setToken(data.token)
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors);
                // console.log(response.data.errors);
              }
            })
    }

    return (
      <div className="container">
        <div className="login-signup-form2 animated fadeInDown">
            <div className="form2 text-center">
              <h1 className="title">Registration To KodeGoers</h1>
                <form onSubmit={onSubmit}>
                    <h1>Sign up for Free</h1>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} placeholder="Full Name"/>
                    <input ref={emailRef} type="email" placeholder="Email Address"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password"/>
                    <button className="btn btn-block">Signup</button>
                    <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                </form>
            </div>
        </div>
      </div>

    )
}