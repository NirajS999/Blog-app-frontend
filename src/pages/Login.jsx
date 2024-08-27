import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../context/userContext';

const Login = () => {
  const [userData,setUserData] = useState({
    email : "",
    password : ""
  })

  const [error,setError] = useState('')
  const navigate = useNavigate()

  const {setCurrentUser} = useContext(UserContext)

  const changeInputHandler = (e) =>{
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError(' ')
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,userData);
      const user = await response.data;
      setCurrentUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response.data.message)
    }
  } 

  return (
    <section className="form-section">
      <div className="container">
        <h2 className='mb-6'>Sign In</h2>
        <form action='' className="form register__form" onSubmit={loginUser} >
          {error && <p className="form__error-message">{error}</p>}
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} />
          <button className='btn blue__btn'>Login</button>
        </form>
        <small>Don't have an account? <Link className='text-blue-700 hover:text-sm' to="/register"> Sign Up</Link></small>
      </div>
    </section>
  )
}

export default Login
