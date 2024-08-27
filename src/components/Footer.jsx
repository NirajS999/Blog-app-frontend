import React from 'react'
import { footerLinks } from '../constants'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className='footer__categories'>
        {footerLinks.map((data)=>(
          <li key={data.title}>
            <Link to={data.href}>{data.title}</Link>
          </li>
        ))}
      </ul>
      <div className='footer__copyrights'>
        <small>All Rights Reserved &copy; Copyright, Niraj Satarkar</small>
      </div>
    </footer>
  )
}

export default Footer
