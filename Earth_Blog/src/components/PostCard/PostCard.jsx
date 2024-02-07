import React from 'react'
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import TimeAgo from '../TimeAgo/TimeAgo';

function PostCard({ post }) {

    return (
        <>
            <div className='shadow-lg p-3 bg-white rounded-xl h-full flex flex-col justify-between' >
                <div className='mb-2' >
                    <img src={post.Featureimage} className='aspect-video rounded-xl mb-6' alt="" />
                    <h3 className='mb-2 lg:text-2xl md:text-xl text-lg font-extrabold hover:text-lime-700 duration-500' >
                        <Link to={`/post/${post._id}`} >{(post.Title).substring(0, 50) + "..."}</Link>
                    </h3>
                    <div className='text-sm font-medium text-wrap' >{Parser(post.Content.substring(0, 120) + "...")}</div>
                </div>
                <div className='flex justify-between items-center text-sm font-medium' >
                    <p>{post.view ? `${post.view} views` : "No View"}</p>
                    <p>Post : <TimeAgo date={post.createdAt} /></p>
                </div>
            </div>
        </>
    )
}

export default PostCard;