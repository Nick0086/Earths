import React, { useEffect, useState } from 'react'
import TimeAgo from '../TimeAgo/TimeAgo'
import Button from '../Button'
import { useSelector } from 'react-redux';

function CommentCard({ data,commentDeleteHandler }) {

    const [FullComment, setFullComment] = useState(false)
    const userId = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if(data.Comment.length <= 50){
            setFullComment(true)
        }
    },[])

    return (
        < >
            <h4 className='text-base font-medium text-light-green mb-2' >{data.userId.name}</h4>
            <p className='text-sm tracking-tight mb-2' >
                {
                    FullComment && FullComment ? data.Comment : data.Comment.substring(0, 70) + "..."
                }
                {
                    data.Comment.length >= 50 && <span className='cursor-pointer ms-2 font-medium text-dark-green' onClick={() => setFullComment(!FullComment)}>
                        {
                            FullComment ? "Load Less" : "Load More"
                        }
                    </span>
                }
            </p>
            <div className='flex justify-between items-center' > 
            <p className='text-xs font-extrabold mb-1' ><TimeAgo date={data.createdAt} /> ago</p>
            {
                data.userId._id === userId._id ? <Button onClick={() => commentDeleteHandler(data._id)} classname='md:w-[auto] md:p-[4px] rounded-md text-xs' >Delete</Button> : ""
            }
            </div>
        </>
    )
}

export default CommentCard;