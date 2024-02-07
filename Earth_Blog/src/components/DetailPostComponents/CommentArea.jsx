import React, { useEffect, useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import CommentCard from './CommentCard';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function CommentArea({ data }) {

    const [comments, setcomments] = useState([]);
    const [total, settotal] = useState(0);
    const [input, setInput] = useState("");

    const allCommentGetHandler = () => {
        axios.get(`${import.meta.env.VITE_URL}/comments/${data.postId}`)
            .then((res) => {
                setcomments(res.data.data);
                settotal(res.data.total);
            })
            .catch((err) => console.error(err))
    }

    const commentHandler = (e) => {
        e.preventDefault();
        if (input) {
            const commentData = {
                ...data,
                Comment: input,
            }

            axios.post(`${import.meta.env.VITE_URL}/comments/addComment`, commentData)
                .then((res) =>
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 1500,
                        pauseOnHover: true
                    }))
                .catch((err) => console.error(err))
                .finally(() => {
                    allCommentGetHandler();
                    setInput('');
                })

        } else {
            toast.error("Enter Comment...", {
                position: "top-right",
                autoClose: 1500,
                pauseOnHover: true
            })
        }
    };

    const commentDeleteHandler = (id) => {
        axios.delete(`${import.meta.env.VITE_URL}/comments/deletecomment/${id}`)
            .then((res) => {
                if (res) {
                    allCommentGetHandler();
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 1500,
                        pauseOnHover: true,
                    })
                }
            })
            .catch((err) => console.error(err))
    };


    useEffect(() => {
        allCommentGetHandler();
    }, [])

    return (
        <div className='my-5 py-4 border-t-2 border-opacity-50 border-green-700' >
            <h3 className='text-3xl font-bold mb-3' >Comments <span className='text-2xl font-medium' >({total})</span></h3>
            <form className='grid grid-cols-12 md:gap-x-2 gap-x-1' onSubmit={commentHandler} >
                <Input
                    placeholder="Enter Your Comment..."
                    classname="bg-white shadow-md rounded-xl px-2 lg:col-span-10 col-span-9 mb-[0px] "
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button
                    classname="md:w-[auto] w-[auto] rounded-xl lg:col-span-2 col-span-3 text-xs tracking-tight px-[2px]"
                    type='submit'
                >Comment</Button>
            </form>
            <div className='bg-white rounded-lg overflow-auto custom-scrollbar comment-scroll mt-2 shadow-md max-h-screen ' >
                {
                    comments && comments.map((data) => (
                        <div key={data._id} className='p-3 my-1 last:border-b-0 border-b-[1px] border-gray-600' >
                            <CommentCard data={data} commentDeleteHandler={commentDeleteHandler} />
                        </div>
                    ))
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default CommentArea;