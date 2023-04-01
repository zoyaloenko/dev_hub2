import { useContext } from 'react'
import { AuthContext } from '../AppContext/AppContext'

const UserLinks = () => {

  const { signOutUser, user, userData } = useContext(AuthContext) 

  return (
    <>
    <div className="flex justify-center items-center cursor-pointer">
      <div className="mx-4 flex items-center">
        <div className='ml-4 text-md text-black font-medium no-underline' onClick={signOutUser}>Sign Out</div>
        {/* <p className='ml-4 text-sm text-black font-medium no-underline'>
          {user?.displayName || userData?.name}
        </p> */}
      </div>
    </div>
    </>
  )
}

export default UserLinks