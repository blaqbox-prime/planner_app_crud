import React from 'react'

function SignIn() {
    return (
        <div className="SignIn d-flex container align-items-center justify-content-center overflow-hidden" style={{height: '100%'}}>
            <form className="form" style={{width: '400px'}}>
                <h1 className="display-2">Sign In</h1>
                <hr />
                <div className="form-group mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" id="email" className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="email" className="form-control" />
                </div>
                    <button type="submit" className="btn btn-primary w-100 my-2">Sign In</button>
                {/* ----------------------------------------------*/}
            </form>
        </div>
    )
}

export default SignIn
