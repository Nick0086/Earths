import React, { useEffect, useState } from 'react'
import { DetailPostCard } from '../components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PostCard from '../components/PostCard/PostCard';
function FullPostCardPage() {

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  const { postid } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(false);
    axios.get(`${import.meta.env.VITE_URL}/posts/post/${postid}`)
      .then((res) => {
        setPost(res.data.data)
        console.log(res.data.data)
        // fetch data for related posts
        // axios.get(`${import.meta.env.VITE_URL}/posts/post?category=${res.data.data.Category}&status=Active&limit=60`)
        //   .then((res) => {
        //     let relateds = res.data.data.filter((item) => item._id !== postid)
        //     const shuffledPosts = relateds.sort(() => 0.5 - Math.random());
        //     const sortPosts = shuffledPosts.slice(0, 3);
        //     setRelatedPost(sortPosts);
        //   })
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(true))
  }, [postid])

  return (
    <>
      {
        loading ?
          <div className='bg-gray-50' >
            <div className='container' >
              <div className='grid grid-cols-12 lg:py-20 md:py-14 py-10 md:gap-0 md:gap-x-4 gap-y-8'  >
                <div className='md:col-span-8 col-span-full' >
                  <DetailPostCard post={post} />
                </div>
                <div className='md:col-span-4 col-span-full'>
                  <h3 className='text-2xl font-bold text-center mb-8' >Related Posts</h3>
                  <div className='grid grid-cols-12 lg:gap-y-10 md:gap-y-8 gap-y-6' >
                    {
                      relatedPost && relatedPost.map((post) => (
                        <div key={post._id} className=' col-span-12 ' >
                          <PostCard post={post} />
                        </div>
                      ))
                    }
                    {
                      relatedPost && relatedPost.length === 0 && <p className='text-gray-900 col-span-12 text-center font-medium' >No Related Posts</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <Spinner />
      }
    </>
  )
}

export default FullPostCardPage;