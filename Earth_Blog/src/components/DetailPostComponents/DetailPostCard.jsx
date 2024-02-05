import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import Button from '../Button';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Input from '../Input';
import axios from 'axios';
import CommentArea from './CommentArea';

function DetailPostCard({ post }) {

    const [likeCount, setLikeCount] = useState(0);
    const [isUserLike, setIsUserLike] = useState(false);
    const [likeid, setLikeID] = useState();
    const [btndis, setBtnDis] = useState(false)
    const userData = useSelector((state) => state.auth.userData);
    const data = {
        userId: userData._id,
        postId: post._id
    }

    const notify = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2500,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    useEffect(() => {
        // function for update views
        axios.put(`${import.meta.env.VITE_URL}/posts/update/${post._id}`, { view: post.view + 1 });
        // function for check user already like or not and count like on post
        axios.get(`${import.meta.env.VITE_URL}/like/`, { params: { ...data } })
            .then((res) => {
                setLikeID(res.data.likeId)
                setLikeCount(res.data.countLikes);
                setIsUserLike(res.data.isUserLiked);
            })
            .catch((err) => console.error(err))
    }, []);

    // function for handel like on posts
    const likeHandler = () => {
        setBtnDis(true)
        if (isUserLike === false) {
            axios.post(`${import.meta.env.VITE_URL}/like/addLike`, data)
                .then((res) => {
                    setLikeID(res.data.likeId)
                    setLikeCount(likeCount + 1);
                    setIsUserLike(true);
                    notify(res.data.message);
                })
                .catch((err) => console.error(err))
                .finally(() => setBtnDis(false))
        } else {
            axios.delete(`${import.meta.env.VITE_URL}/like/removeLike/${likeid}`)
                .then((res) => {
                    setLikeCount(likeCount - 1);
                    setIsUserLike(false);
                    notify(res.data.message);
                })
                .catch((err) => console.error(err))
                .finally(() => setBtnDis(false))
        }
    };



    return (
        <div>
            <div className='md:w-[90%] mx-auto' >
                <h2 className='md:text-4xl text-3xl font-bold mb-8 text-center' >{post.Title}</h2>
                <div className='mx-auto mb-8'>
                    <img src={post.Featureimage} className=' w-full aspect-video rounded-xl   mb-4' alt="" />
                    <Button disable={btndis} classname='bg-transparent flex align-items-center hover:bg-transparent md:w-[auto] md:p-[2px] p-[0px]' onClick={likeHandler} >
                        {
                            !isUserLike ? <FaRegHeart className='text-black text-xl' /> : <FaHeart className='text-red-600 text-xl' />
                        }
                        <p className='text-black capitalize ms-2' >{likeCount ? likeCount : "No Like"}</p>
                    </Button>
                </div>
                <h3 className='lg:text-3xl md:text-2xl text-xl font-extrabold tracking-wide mb-6' >{post.Title}</h3>
                <div className='text-lg font-medium  opacity-70 tracking-tight' >{Parser(post.Content)}</div>

                {/* code for comment on post    */}
                <CommentArea data={data} />
                
            </div>
        </div>
    )
}

export default DetailPostCard;