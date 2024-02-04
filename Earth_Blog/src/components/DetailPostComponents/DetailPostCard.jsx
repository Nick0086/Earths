import React, { useEffect, useState } from 'react'
import Parser from 'html-react-parser';
import Button from '../Button';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Input from '../Input';
import axios from 'axios';

function DetailPostCard({ post }) {

    const [likeCount, setLikeCount] = useState(0);
    const [isUserLike, setIsUserLike] = useState(false);
    const [likeid, setLikeID] = useState();
    const [btndis,setBtnDis] = useState(false)
    const userData = useSelector((state) => state.auth.userData);
    const data = {
        userId: userData._id,
        postId: post._id
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
                })
                .finally(() => setBtnDis(false))
        } else {
            axios.delete(`${import.meta.env.VITE_URL}/like/removeLike/${likeid}`)
                .then((res) => {
                    setLikeCount(likeCount - 1);
                    setIsUserLike(false);
                })
                .finally(() => setBtnDis(false))
        }
    };



    return (
        <div>
            <div className='md:w-[90%] mx-auto' >
                <h2 className='md:text-4xl text-3xl font-bold mb-8 text-center' >{post.Title}</h2>
                <div className='mx-auto mb-8'>
                    <img src={post.Featureimage} className=' w-full aspect-video rounded-xl   mb-4' alt="" />
                    <Button  disable={btndis} classname='bg-transparent flex align-items-center hover:bg-transparent md:w-[auto] md:p-[2px] p-[0px]' onClick={likeHandler} >
                        {
                            !isUserLike ? <FaRegHeart className='text-black text-xl' /> : <FaHeart className='text-red-600 text-xl' />
                        }
                        <p className='text-black capitalize ms-2' >{likeCount ? likeCount : "No Like"}</p>
                    </Button>
                </div>
                <h3 className='lg:text-3xl md:text-2xl text-xl font-extrabold tracking-wide mb-6' >{post.Title}</h3>
                <div className='text-lg font-medium  opacity-70 tracking-tight' >{Parser(post.Content)}</div>

                {/* code for comment on post    */}
                {/* <div className='my-5 py-4 border-t-2 border-opacity-50 border-green-700' >
                    <h3 className='text-3xl font-bold mb-3' >Comments <span className='text-2xl font-medium' >({allcomments && allcomments.length})</span></h3>
                    <form className='grid grid-cols-12 md:gap-x-2 gap-x-1' onSubmit={commentHandler} >
                        <Input
                            placeholder="Enter Your Comment..."
                            classname="bg-white shadow-md rounded-xl px-2 lg:col-span-10 col-span-9 mb-[0px] "
                            value={Comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            classname="md:w-[auto] w-[auto] rounded-xl lg:col-span-2 col-span-3 text-xs tracking-tight px-[2px]"
                            type='submit'
                        >Comment</Button>
                    </form>
                    <div className='bg-white rounded-lg overflow-auto custom-scrollbar comment-scroll mt-2 shadow-md max-h-screen ' >
                        {
                            allcomments && allcomments.map((data, index) => (
                                <div key={index} className='p-3 my-1 last:border-b-0 border-b-[1px] border-gray-600' >
                                    <CommentCard data={data} commentDeleteHandler={commentDeleteHandler} />
                                </div>
                            ))
                        }
                    </div>
                    <ToastContainer />
                </div> */}
            </div>
        </div>
    )
}

export default DetailPostCard