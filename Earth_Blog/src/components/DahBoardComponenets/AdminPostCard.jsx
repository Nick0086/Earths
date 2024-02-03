import React, { useEffect, useState } from 'react'
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import TimeAgo from '../TimeAgo/TimeAgo';

function AdminPostCard({ data, getpost }) {

    const [img, setImg] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // const deleteHandler = () => {
    //     if (window.confirm('Are you sure to delete this Post?')) {
    //         setLoading(false)

    //         postService.delatePost(data.$id)
    //             .then((res) => {
    //                 if (res) {
    //                     postService.delatePost(data.Featureimage);
    //                     navigate('/dashboard');
    //                 }
    //             })
    //             .catch((err) => console.error("err in delete post", err))
    //             .finally(() => getpost());
    //     }
    // }
    // Get Image Url for Featured image
    // useEffect(() => {
    //     postService.getFilePreview(data.Featureimage)
    //         .then((res) => setImg(res.href))
    //         .catch((error) => console.error("error in image previwe", error))
    // })

    return (
        <>
            {
                loading ? <div className='grid grid-cols-12 gap-4 my-4 p-4 lg:w-[85%]  mx-auto bg-[#F4F6FF] rounded-lg'>
                    <div className='md:col-span-4 col-span-full flex items-center justify-center' >
                        <div className='rounded-lg overflow-hidden' >
                            <img src={data.Featureimage} className='aspect-video' alt="" />
                        </div>
                    </div>
                    <div className='md:col-span-6 col-span-full' >
                        <h3 className='font-semibold text-lg mb-2' >{(data.Title).substring(0, 40) + "..."}</h3>
                        <p className='text-sm font-medium tracking-tighter mb-1' >{data.createdAt.split(' ')[0]}</p>
                        <p className='text-sm font-medium tracking-tight' >{data.view ? `${data.view} views` : "No View"}</p>
                        <p><TimeAgo date={data.createdAt} /> ago</p>
                    </div>
                    <div className='md:col-span-2 col-span-full  flex flex-row  md:flex-col items-center md:justify-between justify-center gap-2' >
                        <Button classname='md:w-[70px] md:p-2 bg-blue-600 hover:bg-blue-900 rounded-lg text-sm'  >Edit</Button>
                        <Button classname='md:w-[70px] md:p-2 bg-red-500 hover:bg-red-900 rounded-lg text-sm'  >Delete</Button>
                    </div>
                </div> : <Spinner />
            }
        </>
    )
}

export default AdminPostCard;