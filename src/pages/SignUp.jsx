import React from 'react'

function SignUp() {
  
  
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
        <div className="SignIn d-flex container align-items-center justify-content-center overflow-hidden" style={{height: '100%'}}>
            <form action="" className="form" style={{width: '400px'}}>
                <h1 className="display-2">Sign Up</h1>
                <hr />
                <div className="form-group mb-2">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" name="name" id="name" className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" id="email" className="form-control" />
                </div>
                {/* ----------------------------------------------------------------------- */}
                <div className="form-group">
                    <label for="category">Category</label>
                    <select className="TaskForm__category form-control" name='categories' id='categories'>
                    {_buildCategoryOptions()}
                    </select>
                </div>
                {/* ---------------------------------------------------------- */}
                <div className="form-group mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="email" className="form-control" />
                </div>
                    <button className="btn btn-primary w-100 my-2">Sign In</button>
                {/* ----------------------------------------------*/}
            <hr />
            <button className="btn btn-outline-secondary w-100">Sign in with google</button>
            </form>
        
        </div>
    )
}

export default SignUp
