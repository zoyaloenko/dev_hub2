import { useContext } from "react"
import { AuthContext } from "../AppContext/AppContext";

import { Tooltip } from '@material-tailwind/react';
import { Avatar } from '@material-tailwind/react';

import avatar from '../../assets/images/developer.jpeg';


const LeftSide = () => {

  const { user, userData } = useContext(AuthContext)

  return (
    <div className="flex flex-col h-screen gh-white pb-4 border-2 rounded-r-xl shadow-lg">
    <div className="flex flex-col items-center relative">
      {/* <img
        className="h-28 w-full rounded-r-xl"
        src={nature}
        alt="nature"
      ></img> */}
      <div className="h-28 w-full rounded-r-xl bg-green-500"></div>
      <div className="absolute -bottom-6">
        <Tooltip content="Profile" placement="top">
          <Avatar src={user?.photoURL || avatar} alt="avatar" className="h-16 w-16"></Avatar>
        </Tooltip>
      </div>
    </div>
    <div className="flex flex-col items-center pt-10">
      <p className="font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
        {user?.displayName || userData?.name}
      </p>
    </div>
    <div className="flex flex-col pl-2">
      <div className="flex justify-center items-center pt-4">
        <p className=" font-bold text-md text-black no-underline tracking-normal leading-none mx-2">
          Mobs
        </p>
      </div>
    </div>
 </div>

  )
}

export default LeftSide