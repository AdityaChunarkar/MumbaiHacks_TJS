import React from 'react';
import { Link } from 'react-router-dom';
import Signupimage from "../assets/signuppg.svg";
import instagram from "../assets/instagram_logo_2016.svg";
import x from "../assets/x.svg";
import linkedin from "../assets/linkedin.svg";
import github from "../assets/github.svg";
import googleLogo from "../assets/google.svg";

const Signup = () => {
    return (
        <div className='flex flex-col md:flex-row items-center justify-center md:justify-evenly gap-10 md:gap-16 p-5 md:p-10 min-h-screen bg-secondary flex-wrap'>
            <div className='w-full md:w-auto max-w-sm bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center md:flex-1 md:max-w-md'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>Create an account</h1>
                <form className='space-y-4'>
                    <div className='text-left'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Email'
                            className='input-field'
                        />
                    </div>
                    <div className='text-left'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Password'
                            className='input-field'
                        />
                    </div>
                    <div className='text-left'>
                        <label htmlFor='confirm-password' className='block text-sm font-medium text-gray-700 mb-2'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            id='confirm-password'
                            placeholder='Confirm Password'
                            className='input-field'
                        />
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <input type="checkbox" id="terms" className='w-4 h-4 cursor-pointer' />
                        <label htmlFor="terms" className='text-gray-700 cursor-pointer'>
                            I agree to the Terms of Service and Privacy Policy
                        </label>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-primary hover:bg-accent text-white font-semibold py-2 rounded-lg transition-colors mt-4'
                    >
                        Create account
                    </button>
                </form>
                <div className='mt-6'>
                    <p className='text-gray-700 text-sm mb-3'>Continue with:</p>
                    <div className='flex justify-center gap-3'>
                        <img src={googleLogo} alt="Google" className='w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity' />
                        <img src={github} alt="GitHub" className='w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity' />
                        <img src={linkedin} alt="LinkedIn" className='w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity' />
                        <img src={x} alt="Twitter" className='w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity' />
                        <img src={instagram} alt="Instagram" className='w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity' />
                    </div>
                </div>
                <p className='text-gray-700 text-sm mt-4'>
                    Already have an account?{' '}
                    <Link to='/login' className='text-primary font-semibold hover:text-accent transition-colors'>
                        Log in
                    </Link>
                </p>
            </div>
            <div className='flex flex-col items-center justify-center md:flex-1 md:max-w-md w-full md:w-auto'>
                <h1 className='text-3xl md:text-4xl font-bold text-primary text-center mb-6'>Finance Manager</h1>
                <img src={Signupimage} alt='Signup illustration' className='w-4/5 md:w-full max-w-sm rounded-2xl' />
            </div>
        </div>
    );
};

export default Signup;
