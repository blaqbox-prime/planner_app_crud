import React, {useRef, useState, useLayoutEffect} from 'react'
import {gsap} from 'gsap';
import {useAuth} from '../zustand/store';
import { useHistory, useLocation } from 'react-router';
import User from '../models/User';

function SignIn() {
    const tl = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {authUser, loginUser} = useAuth();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // Animation
    useLayoutEffect(() => {
        tl.current = gsap.timeline()
        .from(".form",{y: -50, opacity: 0, duration: 1.5 ,ease: 'Power2.easeInOut'});
    }, [])

    // update email state
    const updateEmail = (e) => {
        setEmail(e.target.value);
    }
    // update password state
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const closeAlert = (e) => {
        setError(null);
    }
    
    const login = (e) => {
        e.preventDefault();
        console.log({email: email, password: password});
        if(email !== '' && password !== '') {
            fetch(`https://planout-server.herokuapp.com/auth/signin`, {
            method: 'POST',
            headers : {
                
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password,})
        }).then(res => res.json()).then(user => {
            console.log(user);
            if(user.error === "true"){
                setError(user);
            }else{
                const newUser = new User(user._id,user.email,user.firstName,user.lastName,user.accountType);
                loginUser(newUser);
                sessionStorage.setItem('logged_user', JSON.stringify(authUser));
                setEmail('');
                setPassword('');
                history.replace(from);
            }
        }).catch(err => {
            console.log(err);
        });
        }

    }

    return (
        <div className="SignIn">
            <img src="/images/signin-bg.jpg" className="SignIn__bg"></img>
            <form className="form" style={{width: '400px', margin:"0 5rem"}}>
            <h1 className="">Plan <span className="text-green">Out</span></h1>
            {error && <div className="alert-error">{error && error.message} <span className="alert-close" onClick={closeAlert}>x</span> </div>}
                <div className="form-group">
                    <input type="email" name="email" id="email" className="form-control" placeholder="Email address" value={email} onChange={updateEmail}/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" id="password" className="form-control" placeholder="Password" value={password} onChange={updatePassword}/>
                </div>
                <div className="form-goup">
                <button className="form-btn form-control" onClick={login}>Sign In</button>
                </div>
                {/* ----------------------------------------------*/}
                <a href="/signup" className="secondary-link">Don't have an account? <span className="text-green">Sign Up</span></a>
            </form>
        </div>
    )
}

export default SignIn
