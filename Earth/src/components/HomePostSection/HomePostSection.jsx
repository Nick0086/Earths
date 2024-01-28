import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import postService from '../../Appwrite/PostData';
import Spinner from "../Spinner/Spinner"
import Button from "../Button"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function HomePostSection() {

    const [postData, setPostData] = useState();
    const [Loading, setLoading] = useState(false)
    const userId = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();


    const pagehandler = () => {
        if (userId) {
            navigate('/AllPosts')
        } else {
            toast.error("User must be Login", {
                position: "top-right",
                autoClose: 1500,
                pauseOnHover: true
            })
        }
    }

    useEffect(() => {
        setLoading(false)
        const getData = async () => {
            try {
                await postService.getAllPost()
                    .then((res) => {
                        setPostData(res);
                    })
            } catch (error) {
                console.error(error)
            }
        }
        getData();
        setLoading(true)
    }, [])

    return (
        <>
            {
                Loading ?
                    <div className='bg-gray-100' >
                        <div className='md:py-14 py-8 container '>
                            <h2 className='md:text-5xl text-4xl font-bold text-center capitalize md:mb-10 mb-6' >feature post</h2>
                            <div className='grid grid-cols-12 md:gap-8 md:gap-y-10 gap-y-6' >
                                {
                                    postData ? postData.map((post) => (
                                        <div key={post.$id} className='lg:col-span-4 md:col-span-6 col-span-12 ' >
                                            <PostCard post={post} />
                                        </div>
                                    )) 
                                    : <h2 className='col-span-12 text-4xl font-bold flex justify-center items-center h-[50vh] ' >No post available</h2>
                                }
                            </div>
                            <div className='text-center mt-6' >
                                <Button onClick={pagehandler} >View More</Button>
                            </div>
                        </div>
                    </div> :
                    <Spinner />
            }
            <ToastContainer />
        </>
    )
}

export default HomePostSection