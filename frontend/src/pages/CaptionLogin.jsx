import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptionLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captionData, setCaptionData] = useState({});
    const submitHandler = (e) => {
        e.preventDefault();
        // clear the form
        setCaptionData({
            email: email,
            password: password
        });
        setEmail("");
        setPassword("");

    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>

                <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

                <div>
                    <form action="" onSubmit={submitHandler}>
                        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                        <input type="email" required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            placeholder='email@example.com'
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border border-gray-300 w-full mb-4 text-lg placeholder:text-base'
                        />
                        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                        <input type="password" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border border-gray-300 w-full mb-4 text-lg placeholder:text-base'
                        />

                        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border-gray-300 w-full mb-4 text-lg placeholder:text-base'>
                            Login</button>
                        <p className='text-center'>
                            Join a fleet? <Link to="/caption-signup" className='text-blue-600'> Register as a Driver</Link>
                        </p>
                    </form>
                </div>
            </div>

            <div>
                <Link
                    to='/login'
                    className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border-gray-300 w-full mb-4 text-lg placeholder:text-base'>
                    Sign in as a User</Link>
            </div>


        </div>
    )
}

export default CaptionLogin
