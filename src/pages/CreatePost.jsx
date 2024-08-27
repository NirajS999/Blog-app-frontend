import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { footerLinks } from '../constants'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

import { UserContext } from '../context/userContext';

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

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

  const createPost = async (e) =>{
    e.preventDefault();
    const postData = new FormData();
    postData.set('title',title)
    postData.set('category',category)
    postData.set('description',description)
    postData.set('thumbnail',thumbnail)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, {withCredentials:true, headers: {Authorization: `Bearer ${token}`}})
      if(response.status === 201){
        return navigate('/')
      }
    } catch (err) {
      if(err.response.data.message === "TypeError: Cannot read properties of null (reading 'thumbnail')" ){
        setError("Please Choose a thumbnail")
      } else {
        setError(err.response.data.message)
      }
    }

  }

  return (
    <section className="form-section mb-64">
      <div className="container ">
        <h2 className='mb-6'>Create Post</h2>
        {error && <p className='form__error-message mb-6'>
          {error}
        </p>}
        <form className="form register__form" onSubmit={createPost}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              footerLinks.map(data => <option key={data.title}>{data.title}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}  />

          <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg, jfif' />
          <button type='submit' className='btn blue__btn'>Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost
