import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import axios from "axios"
import { useParams } from 'react-router-dom';
import { PostForm } from '../components';

function EditPostPage() {

  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(false);
  const {postid} = useParams();


  useEffect(() => {
    setLoading(false)
    axios.get(`${import.meta.env.VITE_URL}/posts/post/${postid}`)
      .then((res) => setPostData(res.data.data))
      .catch((err) => console.error(res.res))
      .finally(() => setLoading(true))
  }, [])

  return (
    <>
      {
        loading ? <PostForm editPost={postData} /> : <Spinner/>
      }
    </>
  )
}

export default EditPostPage;