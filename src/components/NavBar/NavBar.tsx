import NavLinks from './NavLinks'
import UserLinks from './UserLinks'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 w-full px-4 lg:px-10 md:px-8 sm:px-6 py-2">
      <Link to="/">
        <div className='sm:text-sm md:text-xl lg:text-3xl xl:text-4xl font-extrabold sm:text-green-500 text-gray-900 dark:text-white'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-red-400'>
                Dev-Hub
            </span>{" "}
            App
        </div>
      </Link>
      
      <div className="flex items-center">
      <NavLinks />
      <UserLinks />
    </div>
    </div>
  )
}

export default NavBar