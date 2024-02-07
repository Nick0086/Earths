import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './PostForm.css';
import { ToastContainer, toast } from 'react-toastify';
import Input from '../Input';
import Button from '../Button';
import Selector from '../Selector';
import RTE from '../RTE/RTE';
import axios from 'axios';
import Spinner from '../Spinner';

function PostForm({ editPost }) {

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            Title: editPost?.Title || '',
            Content: editPost?.Content || '',
            status: editPost?.status || 'Active',
            Category: editPost?.Category || "Personal",
        }
    });
    const [loading, SetLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState();
    const [isImageChange, setIsImageChange] = useState(false)
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate();


    // function for submit post or edit post
    const postHandler = async (data) => {

        SetLoading(false)
        const formData = new FormData();
        formData.append('Title', data.Title);
        formData.append('Content', data.Content);
        formData.append('status', data.status);
        formData.append('Category', data.Category);
        formData.append('file', data.file[0]);
        formData.append('userId', userData._id);  // Append user ID to the form data
        if (editPost) {
            if (isImageChange) {
                formData.append('imageId', editPost.imageId);
            } else {
                formData.delete('file', data.file[0]);
            }
            axios.put(`${import.meta.env.VITE_URL}/posts/update/${editPost._id}`,formData,{
                headers: {"Access-Control-Allow-Origin":"https://earths.vercel.app"}
        })
                .then((res) => {
                    if (res) {
                        navigate(`/post/${res.data.data._id}`);
                    }
                })
                .catch((err) => notify(err.response))
                .finally(() => {
                    setImagePreview('')
                    SetLoading(true)
                })
        } else {
            data.file = data.file[0];
            data.Featureimage = data.file;
            try {
                axios.post(`${import.meta.env.VITE_URL}/posts/create`,data)
                    .then((res) => {
                        console.log("formData",data)
                        console.log("post res",res)
                        if (res) {
                            navigate(`/post/${res.data.data._id}`);
                        }
                    })
                    .catch((err) => {
                        console.log("formData",data)
                    console.log("err.response",err)
                    notify(err.response)
                    })
                    .finally(() => {
                        setImagePreview('')
                        SetLoading(true)
                    })
            } catch (error) {
                console.log(error)
            }


        }
    }

    // function for display image preview
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImagePreview(URL.createObjectURL(img));
            setIsImageChange(true);
        }
    };

    // fuction for send notification error in post data fill
    const notify = () => {
        if (Object.keys(errors).length !== 0) {
            toast.error(`
                        ${errors.Title ? errors.Title.message :
                    errors.Content ? errors.Content.message :
                        errors.Featureimage ? errors.Featureimage.message : ""}
                        `, {
                position: "top-right",
                autoClose: 1000,
                pauseOnHover: true,
            }
            );
        }
    }

    useEffect(() => {
        // prevent unauthorize user for edit post
        if (editPost) {
            if (userData._id !== editPost.userId._id) {
                navigate('/')
            }
            setImagePreview(editPost.Featureimage)
        }
        notify()
    }, [errors]);

    return (
        <>
            {
                loading ?
                    <div className='bg-gray-100 post-bg' >
                        <ToastContainer />
                        <div className='lg:py-24 md:py-12 py-10 container' >
                            <form className=' lg:w-3/4 bg-white bg-opacity-60 shadow-xl backdrop-blur-sm   md:w-[90%] w-[95%] rounded-2xl mx-auto md:p-8 p-4' onSubmit={handleSubmit(postHandler)} >
                                <h3 className='md:text-2xl text-xl font-medium text-dark-green text-center mb-10'>
                                    {
                                        editPost ? "Edit Post " : "Create New Post "
                                    }
                                </h3>
                                <div>
                                    <Input
                                        label="Title"
                                        labelclass="text-[16px]"
                                        type="text"
                                        placeholder="Title"
                                        {...register("Title",
                                            {
                                                required: "Title is required",
                                                minLength: {
                                                    value: 10,
                                                    message: "The title must be at least 10 characters long."
                                                },
                                                maxLength: {
                                                    value: 120,
                                                    message: 'Title cannot exceed 200 characters',
                                                }
                                            })}
                                    />
                                    <RTE
                                        label="Content :"
                                        labelclass="text-[16px]"
                                        name="Content"
                                        control={control}
                                        defaultValue={editPost?.Content || ''}
                                        {...register("Content",
                                            {
                                                required: "Content is required",
                                                minLength: {
                                                    value: 100,
                                                    message: "Your content should contain at least 100 characters.",
                                                },
                                                maxLength: {
                                                    value: 3000,
                                                    message: 'content cannot exceed 3000 characters',
                                                }
                                            }
                                        )}
                                    />
                                    <Input
                                        label="Featured Image"
                                        labelclass="text-[16px]"
                                        placeholder="Featured Image"
                                        type="file"
                                        name="file"
                                        classname="border-b-0"
                                        accept="image/png, image/jpg, image/jpeg, image/gif"
                                        {...register("file", {
                                            onChange: (e) => onImageChange(e),
                                            ...(editPost ? {} : {
                                                required: "Post Thumbnail is required",
                                            }),
                                        })}
                                    />
                                    {imagePreview &&
                                        <div className="my-4 ">
                                            <img src={imagePreview} alt="Featured Image" srcSet="" className="md:w-[50%] w-[95%] h-auto mx-auto rounded-lg shadow-xl" />
                                        </div>
                                    }
                                    <Selector
                                        labelclass="text-[16px]"
                                        label="Status"
                                        options={["Active", "Inactive"]}
                                        className="mb-6"
                                        {...register("status", { required: true })}
                                    />
                                    <Selector
                                        label="Category"
                                        labelclass="text-[16px]"
                                        options={["Personal", "News", "Sport", "Travel", "Food", "Fashion", "Finance", "Music", "Business", "Lifesyle"]}
                                        className="mb-6 "
                                        {...register("Category", { required: true })}
                                    />
                                    <div className='text-center mt-6'>
                                        <Button type='submit' onClick={notify} >{editPost ? "Edit Post" : "Add Post"}</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    : <Spinner />
            }
        </>
    )
}

export default PostForm;