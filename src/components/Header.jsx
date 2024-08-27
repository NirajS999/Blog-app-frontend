import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import { navLinks } from '../constants';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'

import { UserContext } from '../context/userContext';

const Header = () => {
  const [ isNavShowing, setIsNavShowing ] = useState(window.innerWidth > 800 ? true : false)
  const {currentUser} = useContext(UserContext)


  const closeNavHandler = () => {
    if(window.innerWidth < 800 ){
      setIsNavShowing(false)
    }else {
      setIsNavShowing(true)
    }
  }
  return (
    <nav>
      <div className="container nav__container">
        <Link className="nav__logo" to="/" onClick={closeNavHandler}>
          <img src={Logo} alt="Blog App Logo" />
        </Link>
        {currentUser?.id && isNavShowing && <ul className='nav__menu'>
          <li><Link onClick={closeNavHandler} to={`/profile/${currentUser.id}`} className='hover:text-gray-400'>{currentUser.name}</Link></li>
        {navLinks.map((data)=>(
          <li key={data.title}>
            <Link onClick={closeNavHandler} to={data.href} className='hover:text-gray-400'>{data.title}</Link>
          </li>
        ))}
        </ul>
        }
        {!currentUser?.id && isNavShowing && <ul className='nav__menu'>
        
          <li>
            <Link onClick={closeNavHandler} to='register'>Register</Link>
          </li>
          <li>
            <Link onClick={closeNavHandler} to='/login'>Login</Link>
          </li>
        </ul>
        }
        <button className="nav__toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>

      </div>
    </nav>

  )
}

export default Header



