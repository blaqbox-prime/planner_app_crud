import React, {useState} from 'react'
import { useAuth } from '../zustand/store'
import {v4 as guid} from 'uuid';


function SignUp() {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [category, setCategory] = useState('Standard Account')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState(null);
    const loginUser = useAuth(state => state.loginUser);
  
    // update values
    const updateFirstname = (e) => {
        setFirstname(e.target.value)
    }

    const updateLastname = (e) => {
        setLastname(e.target.value)
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }
    const updateConfirmPass = (e) => {
        setConfirmPass(e.target.value)
    }
    const updateCategory = (e) => {
        let categorySelect = document.querySelector('#signUpCategories');
        setCategory(categorySelect.value);
    }
    const closeAlert = (e) => {
        setError(null);
    }
    // Sign Up

    const signup = (e) => {

        e.preventDefault();
        if(noEmptyFields() && PasswordsMatch() ){
            fetch('https://planout-server.herokuapp.com/auth/signup', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: guid(),
                firstName: firstname.trim(),
                lastName: lastname.trim(),
                accountType: category.trim(),
                password: password.trim(),
                email: email.trim(),
                        })
        }).then(res => res.json()).then(data => {
            console.log(data);
            if(data.error === "true"){
                setError(data);
            }else{
                
                loginUser(data);
                // reset fields
                resetFields();
            }
        }).catch(err => {
            console.log(err);
        });
        }

    }

    const resetFields = () => {
        setEmail('');
                setPassword('');
                setFirstname('');
                setLastname('');
                setConfirmPass('');
                setCategory('Standard Account');
                setError(null);
    }

    const noEmptyFields = () => {
        const emptyFields = [];
        if(firstname === ''){
            emptyFields.push('First Name');
        }

        if(lastname === ''){
            emptyFields.push('Last Name');
        }
        if(email === ''){
            emptyFields.push('Email');
        }
        if(password === ''){
            emptyFields.push('Password');
        }
        if(confirmPass === ''){
            emptyFields.push('Confirm password');
        }

        if(emptyFields.length === 0) return true;
        else {
            let message = "The following fields must not be empty: ";
            emptyFields.forEach(field => {
                message += `${field}, `;
            });
            setError({error: "true", message: message});
            return false;
        }
    }

    const PasswordsMatch = () => {
        if(password === confirmPass){
            return true;
        }else{
            setError({error: 'true', message: "passwords do not match"});
            return false;
        }
    }

  
    // Available Task Categories
  const CATEGORIES = ['Standard Account','Management Account','Enterprise Account'];

  const _buildCategoryOptions = () => {
    let selected = 0;
    return(
      CATEGORIES.map((category,idx) => {
        if(idx === selected){
         return <option key={idx} value={category} selected >{`${category[0].toUpperCase()}${category.slice(1)}`}</option>
        }else{
        return  <option key={idx} value={category}>{`${category[0].toUpperCase()}${category.slice(1)}`}</option>
        }
      })
      )
  }

    return (
        <div className="SignUp">
            <img src="./images/Time management.png" width="500px" alt="" className="SignUp__img mobile-hidden" />
            <form action="" className="form">
                <h1 className="SignUp__title">Sign <span className="text-green">Up</span></h1>
                {error && <div className="alert-error">{error && error.message} <span className="alert-close" onClick={closeAlert}>x</span> </div>}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">First Name</label>
                    <input type="text" name="name" id="name" className="form-control" value={firstname} onChange={updateFirstname}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input type="text" name="lastname" id="lastname" className="form-control" value={lastname} onChange={updateLastname}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" id="email" className="form-control" value={email} onChange={updateEmail}/>
                </div>
                {/* ----------------------------------------------------------------------- */}
                <div className="form-group">
                    <label htmlfor="category" className="form-label">Category</label>
                    <select className="TaskForm__category form-control" name='categories' id='signUpCategories' onChange={updateCategory}>
                    {_buildCategoryOptions()}
                    </select>
                </div>
                {/* ---------------------------------------------------------- */}
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="password" className="form-control" value={password} onChange={updatePassword} minLength={6} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword" className="form-label">Confirm password</label>
                    <input type="password" name="confirmpassword" id="confrimpass" className="form-control" value={confirmPass} onChange={updateConfirmPass} minLength={6}/>
                </div>
                    <button onClick={signup} className="form-btn form-control">Sign Up</button>
                {/* ----------------------------------------------*/}
            <a href="/signin" className="secondary-link">Already Have an Account? Sign In</a>
            </form>
        
        </div>
    )
}

export default SignUp
