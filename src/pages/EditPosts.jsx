import React, { useState, useEffect, useContext } from 'react'
import { footerLinks } from '../constants'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

const EditPost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const {id} = useParams();

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  // redirect to login page if the user is not logged In
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  }, [])

  const modules = {
    toolbar:[
      [{ 'header' : [ 1, 2, 3, 4, 5, 6, false ] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote' ],
      [{ 'list' : 'ordered'}, { 'list' : 'bullet'}, { 'indent' : '-1'}, { 'indent' : '+1'}],
      [ 'link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'

  ]

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setTitle(response.data.title)
        setDescription(response.data.description)

      } catch (error) {
        console.log(error)
      }
    }
    getPost();
  },[])

  const editPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set('title',title)
    postData.set('category',category)
    postData.set('description',description)
    postData.set('thumbnail',thumbnail)

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {withCredentials:true, headers: {Authorization: `Bearer ${token}`}})
      if(response.status === 200){
        return navigate('/')
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className="form-section mb-64">
      <div className="container ">
        <h2 className='mb-6'>Edit Post</h2>
        {error && <p className='form__error-message mb-6'>
          {error}
        </p>}
        <form className="form register__form" onSubmit={editPost}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              footerLinks.map(data => <option key={data.title}>{data.title}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg, jfif' />
          <button type='submit' className='btn blue__btn'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost
