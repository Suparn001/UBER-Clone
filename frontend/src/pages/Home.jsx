import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='bg-cover bg-[url(https://media.istockphoto.com/id/1388572012/photo/red-traffic-light-against-sky.jpg?s=1024x1024&w=is&k=20&c=8-Hqjh_-8-CQKlnxH6xZGE_bdjas6GMRZjYdYpnJdEc=)] pt-8 h-screen flex w-full justify-between flex-col'>

            <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-8 py-4 px-4'>
                <h2 className='text-[30px] font-semibold'>Get Started with Uber</h2>
                <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 mt-5 rounded'>Continue</Link>
            </div>
        </div>
    )
}

export default Home
