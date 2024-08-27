import React, {useContext, useEffect, useState} from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import Loader from '../components/Loader'

const DeletePost = ({postId: id}) => {
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  // redirect to login page if the user is not logged In
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  }, [])

  const removePost = async () => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if(response.status == 200){
        if(location.pathname == `/myposts/${currentUser.id}`){
          navigate(0)
        } else {
          navigate('/')
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  if(isLoading){
    return <Loader />
  }

  return (
    <div>
      <Link className='btn bg-red-500 text-white hover:bg-red-700' onClick={() => removePost(id)}>Delete</Link>
    </div>
  )
}

export default DeletePost
