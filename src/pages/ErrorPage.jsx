import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className='center'>
        <Link to='/' className="btn bg-black text-white">Go Back Home</Link>
        <h2 className='mt-3'>Page Not Found</h2>
      </div>

    </section>
  )
}

export default ErrorPage
