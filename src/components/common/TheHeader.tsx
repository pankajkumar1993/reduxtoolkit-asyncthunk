import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'

const TheHeader = () => {
    return (
        <header className='bg-white py-4 shadow'>
            <div className="container flex justify-between items-center">
                <div>
                    <Link to="/" className='font-bold uppercase text-2xl'>Logo</Link>
                </div>
                <NavLinks />
            </div>
        </header>
    )
}

export default TheHeader