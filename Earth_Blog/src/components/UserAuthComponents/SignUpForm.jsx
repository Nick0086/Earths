import React, { useEffect, useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Spinner from '../Spinner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../../store/authSlice';
import Cookies from 'js-cookie';

function SignUpForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleSignup = async (data) => {
        setLoading(false)
        axios.post(`${import.meta.env.VITE_URL}/users/register`, data)
            .then((res) => {
                if (res) {
                    // Calculate expiration time for the cookie (e.g., expires in 2 days)
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 2);
                    Cookies.set('JWT', res.data.token, { expires: expirationDate })
                    dispatch(login(res.data.data))
                    navigate('/');
                }
            })
            .catch((err) => notify(err.response.data.message))
            .finally(() => setLoading(true))
    }
    const notify = (error) => {
        toast.error(`${error}`, {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: true,
            delay: 200,
        }
        );
    }
    useEffect(() => {
        // Add 'show' class to trigger the fade-in animation when component mounts
            const sliderElement = document.querySelector('.signup');
            sliderElement.classList.add('show');
    }, []);

    return (
        <>
            {
                loading ?
                    <div className='bg-gray-100 login-bg' >
                        <div className='lg:py-24 md:py-12 py-10 container min-h-screen  flex justify-center items-center' >
                            <div className='lg:w-2/4 md:w-2/3 backdrop-brightness-105 backdrop-opacity-80 shadow-xl backdrop-blur-sm mx-auto rounded-xl signup' >
                                <form className='w-full md:p-8 p-6 mx-auto' onSubmit={handleSubmit(handleSignup)}>
                                    <h3 className='md:text-2xl text-xl font-medium text-dark-green text-center mb-10'>Registration to Our World</h3>
                                    <div className='md:w-3/4 mx-auto' >
                                        <Input
                                            label="Name"
                                            placeholder="Enter Your Full Name"
                                            required
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                        <Input
                                            type="email"
                                            label="Email"
                                            placeholder="Enter Your Email Here"
                                            {...register("email", {
                                                required: true,
                                                validate: {
                                                    matchPatern: (value) => /^[A-Za-z]{3,}[0-9]{1,}@[A-Za-z]{3,}[.]{1}[A-Za-z]{2,3}$/.test(value) ||
                                                        "Email address must be a valid address",
                                                }
                                            })}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message || ""}</p>}
                                        <Input
                                            type="password"
                                            label="password"
                                            placeholder="*****"
                                            {...register("password", {
                                                required: true,
                                                validate: {
                                                    matchPatern: (value) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9@#$%^&*]{8,15}$/.test(value) ||
                                                        "Password must Contain atleast 1 UpperCase , 1 Lowwercase, 1 Symbol and min length 8 ",
                                                }
                                            })}
                                        />
                                        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message || ""}</p>}
                                    </div>
                                    <div className='text-center my-2' >Already Have an account?<Link to="/login" className='text-blue-600 ms-2'>Login here</Link></div>
                                    <div className='text-center mt-6'>
                                        <Button type='submit'>create account</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> :
                    <Spinner />
            }
            <ToastContainer />
        </>
    )
}

export default SignUpForm;