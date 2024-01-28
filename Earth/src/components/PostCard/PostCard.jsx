import React, { useEffect, useState } from 'react'
import postService from '../../Appwrite/PostData';
import Parser from 'html-react-parser';
import TimeAgo from '../TimeAgo/TimeAgo';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PostCard({ post }) {

    const [img, setImg] = useState();
    const userId = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    const pagehandler = () => {
        if (userId) {
            navigate(`/post/${post.$id}`)
        } else {
            toast.error("User must be Login", {
                position: "top-right",
                autoClose: 1500,
                pauseOnHover: true
            })
        }
    }

    useEffect(() => {
        postService.getFilePreview(post.Featureimage)
            .then((res) => setImg(res.href))
            .catch((error) => console.error("error in image previwe", error))
    }, [post.Featureimage])

    return (
        <div className='shadow-lg p-3 bg-white rounded-xl h-full flex flex-col justify-between' >
            <div className='mb-2' >
                <img src={img} className='aspect-video rounded-xl mb-6' alt="" />
                <h3 className='mb-2 lg:text-2xl md:text-xl text-lg font-extrabold hover:text-lime-700 duration-500 cursor-pointer ' onClick={pagehandler} >{(post.Title).substring(0, 50) + "..."}</h3>
                <div className='text-sm font-medium text-wrap' >{Parser(post.Content.substring(0, 120) + "...")}</div>
            </div>
            <div className='flex justify-between items-center text-sm font-medium' >
                <p>{post.View ? `${post.View} views` : "No View"}</p>
                <p><TimeAgo date={post.$createdAt} /> ago</p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default PostCard;