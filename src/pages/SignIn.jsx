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
    const loginUser = useAuth(state => state.loginUser);
    const loggedUser = useAuth(state => state.loggedUser);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

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
        setError(undefined);
    }
    
    const login = (e) => {
        e.preventDefault();
        console.log({email: email, password: password});
        if(email !== '' && password !== '') {
            fetch('http://localhost:3002/auth/signin', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password,})
        }).then(res => res.json()).then(data => {
            console.log(data.user);
            if(data.error === "true"){
                setError(data);
            }else{
                const user = new User(data.user.id,data.user.email,data.user.first_name,data.user.last_name,data.user.account_type);
                loginUser(user);
                localStorage.setItem('logged_user', JSON.stringify(user));
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    console.log(loggedUser);
                    // log in to app
                    history.replace(from);
                }, 1000);
            }
        }).catch(err => {
            console.log(err);
        });
        }

    }

    return (
        <div className="SignIn">
            <div className="SignIn__bg"></div>
            <form className="form" style={{width: '400px'}}>
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
