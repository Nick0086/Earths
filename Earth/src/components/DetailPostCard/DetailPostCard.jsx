import React, { useEffect, useState } from 'react'
import postService from '../../Appwrite/PostData';
import Parser from 'html-react-parser';
import Button from '../Button';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import CommentCard from '../CommentCard/CommentCard';
import Input from '../Input';

function DetailPostCard({ post }) {

    const userId = useSelector((state) => state.auth.userData);
    const [img, setImg] = useState();
    const [btndis, setBtnDis] = useState(false);
    const [LikeID, setlike] = useState();
    const [likeCount, setLikeCount] = useState();
    const [userlike, seruerlike] = useState(false);
    const [Comment, setComment] = useState("");
    const [allcomments, setAllComments] = useState();

    const userData = {
        userId: userId.$id || "",
        postId: post.$id
    }
    useEffect(() => {
        // function for count view
        postService.updatePost(post.$id, {
            ...post,
            View: parseInt(post.View + 1),
        })
        // function for get image
        postService.getFilePreview(post.Featureimage)
            .then((res) => setImg(res.href))
            .catch((error) => console.error("error in image previwe", error))

        // function for check user like post or not  on page load
        postService.getLike(userData)
            .then((res) => {
                if (res.documents.length !== 0) {
                    setlike(res.documents[0].$id);
                    seruerlike(true);
                }
            })

        // function for count like on post
        likeCountHandler();
        // function for fetch all comments on this post
        allCommentsHandler();
    }, [])


    // function for handel like on post 

    const likeHandler = async () => {
        setBtnDis(true)
            postService.createLike(userId.$id, post.$id)
                .then((res) => {
                    if (res) {
                        setlike(res.$id);
                        seruerlike(true);
                        likeCountHandler();
                    }
                })
                .finally(() => setBtnDis(false))
    }

    const deleteHandler = async () => {
        setBtnDis(true)
        postService.removeLike(LikeID)
            .then((res) => {
                if (res) {
                    seruerlike(false)
                    likeCountHandler();
                }
            })
            .finally(() => setBtnDis(false))
    }

    const likeCountHandler = async () => {
        postService.getLike({ ...userData, userId: null })
            .then((res) => setLikeCount(res.total))
    }

    // function for handel comments on post 

    const commentHandler = async (e) => {
            e.preventDefault();

            if (Comment !== "") {

                const com = {
                    UserId: userId.$id,
                    PostId: post.$id,
                    Comments: Comment,
                    UserName: userId.name,
                }

                setBtnDis(true)
                postService.createComments(com)
                    .then((res) => {
                        if (res) {
                            console.log("commentres", res)
                            allCommentsHandler()
                            setComment("")
                        }
                    })
                    .finally(() => setComment(""))
            } else {
                toast.error("Enter Comment...", {
                    position: "top-right",
                    autoClose: 1500,
                    pauseOnHover: true
                })
            }


    }

    const commentDeleteHandler = async (id) => {
        postService.removeComments(id)
            .then((res) => {
                if (res) {
                    allCommentsHandler()
                }
            })
    }
    const allCommentsHandler = async () => {
        postService.getAllComments(post.$id)
            .then((res) => setAllComments(res.documents))
    }

    return (
        <div>
            <div className='md:w-[90%] mx-auto' >
                <h2 className='md:text-4xl text-3xl font-bold mb-8 text-center' >{post.Title}</h2>
                <div className='mx-auto mb-8'>
                    <img src={img} className=' w-full aspect-video rounded-xl   mb-4' alt="" />
                    <Button disable={btndis} classname='bg-transparent flex align-items-center hover:bg-transparent md:w-[auto] md:p-[2px] p-[0px]' onClick={userlike ? deleteHandler : likeHandler} >
                        {
                            !userlike ? <FaRegHeart className='text-black text-xl' /> : <FaHeart className='text-red-600 text-xl' />
                        }
                        <p className='text-black capitalize ms-2' >{likeCount > 0 ? likeCount : "No Like"}</p>
                    </Button>
                </div>
                <h3 className='text-2xl font-extrabold tracking-wide mb-6' >{post.Title}</h3>
                <div className='text-lg font-medium  opacity-70 tracking-tight' >{Parser(post.Content)}</div>

                {/* code for comment on post    */}
                <div className='my-5 py-4 border-t-2 border-opacity-50 border-green-700' >
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
                </div>
            </div>
        </div>
    )
}

export default DetailPostCard