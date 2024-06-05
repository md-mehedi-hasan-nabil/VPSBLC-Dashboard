
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='text-center'>
                <h2 className='text-2xl'>Something was wrong.</h2>
                <div className='mt-6'>
                    <Link to="/" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'>Go Home</Link></div>
            </div>
        </div>
    )
}
