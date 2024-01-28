import React, { useEffect, useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../Appwrite/Auth';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import Spinner from '../Spinner/Spinner';
import "./LoginForm.css"

function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loding, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState()

    const create = async (data) => {
        setLoading(false);
        try {
            const response = await authService.loginUser({ ...data });
            dispatch(login(response))
            navigate('/');
        } catch (error) {
            setError(error.message)
        }
        setLoading(true);
    }

    useEffect(() => {

        // Add 'show' class to trigger the fade-in animation when component mounts
        const sliderElement = document.querySelector('.loginform');
        sliderElement.classList.add('show');
    }, []);

    return (
        <>
            {
                loding ?
                    <div className='bg-gray-100 login-bg'>
                        <div className='lg:py-24 md:py-12 py-10 container min-h-screen  flex justify-center items-center' >
                            <div className='lg:w-2/4 md:w-2/3 w-full backdrop-brightness-105 backdrop-opacity-80 shadow-xl backdrop-blur-sm mx-auto rounded-xl loginform' >
                                <form className='w-full md:p-8 p-6 mx-auto' onSubmit={handleSubmit(create)}>

                                    <h3 className='md:text-2xl text-xl font-medium text-dark-green text-center mb-10'>Sign In to Our World</h3>
                                    <div className='md:w-3/4 mx-auto' >
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
                                    {error && <p className="text-red-600 my-6 text-center">{error}</p>}
                                    <div className='text-center my-2' >Don't have an account?<Link to="/signup" className='text-blue-600 ms-2'>Register here</Link></div>
                                    <div className='text-center mt-6'>
                                        <Button type='submit'>Sign In</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> :
                    <Spinner />
            }
        </>
    )
}

export default LoginForm