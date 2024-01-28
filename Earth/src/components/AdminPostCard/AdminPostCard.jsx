import React, { useEffect, useState } from 'react'
import postService from '../../Appwrite/PostData';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

function AdminPostCard({ data, getpost }) {

    const [img, setImg] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const deleteHandler = () => {
        if (window.confirm('Are you sure to delete this Post?')) {
            setLoading(false)

            postService.delatePost(data.$id)
                .then((res) => {
                    if (res) {
                        postService.delatePost(data.Featureimage);
                        navigate('/dashboard');
                    }
                })
                .catch((err) => console.error("err in delete post", err))
                .finally(() => getpost());
        }
    }
    // Get Image Url for Featured image
    useEffect(() => {
        postService.getFilePreview(data.Featureimage)
            .then((res) => setImg(res.href))
            .catch((error) => console.error("error in image previwe", error))
    })

    return (
        <>
            {
                loading ? <div className='grid grid-cols-12 gap-4 my-4 p-4 lg:w-[85%]  mx-auto bg-[#F4F6FF] rounded-lg'>
                    <div className='md:col-span-3 col-span-full' >
                        <div className='rounded-lg overflow-hidden' >
                            <img src={img} className='aspect-video' alt="" />
                        </div>
                    </div>
                    <div className='md:col-span-7 col-span-full' >
                        <h3 className='font-semibold text-lg mb-2' >{(data.Title).substring(0, 50) + "..."}</h3>
                        <p className='text-sm font-medium tracking-tighter mb-1' >{data.$createdAt.split('T')[0].split('-')[2]} - {data.$createdAt.split('T')[0].split('-')[1]} - {data.$createdAt.split('T')[0].split('-')[0]}</p>
                        <p className='text-sm font-medium tracking-tight' >{data.View ? `${data.View} views` : "No View"}</p>
                    </div>
                    <div className='md:col-span-2 col-span-full  flex flex-row  md:flex-col items-center md:justify-between justify-center gap-2' >
                        <Button classname='md:w-[70px] md:p-2 bg-blue-600 hover:bg-blue-900 rounded-lg text-sm' onClick={() => navigate(`/editpost/${data.$id}`)} >Edit</Button>
                        <Button classname='md:w-[70px] md:p-2 bg-red-500 hover:bg-red-900 rounded-lg text-sm' onClick={deleteHandler} >Delete</Button>
                    </div>
                </div> : <Spinner />
            }
        </>
    )
}

export default AdminPostCard