import { Avatar } from '@material-tailwind/react';
import avatar from '../../assets/images/developer.jpeg';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AppContext/AppContext'; 
import { arrayRemove, collection, getDocs, query, updateDoc, where, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMessage, faTrash } from "@fortawesome/free-solid-svg-icons";
import NavBar from '../NavBar/NavBar';


const RightSide = () => {
    const [input, setInput] = useState('');
    const { user, userData } = useContext(AuthContext);
    const friendList = userData?.friends;


    const searchFriends = (data) => {
      return data.filter((item) =>
        item["name"].toLowerCase().includes(input.toLowerCase())
      );
    };
  

    const removeFriend = async (id, name, image) => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const getDoc = await getDocs(q);
      const userDocumentId = getDoc.docs[0].id;
  
      await updateDoc(doc(db, "users", userDocumentId), {
        friends: arrayRemove({ id: id, name: name, image: image }),
      });
    };
  

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
      <div className="fixed top-0 z-10 w-full bg-white">
        <NavBar />
      </div>
    <div className="mx-2 mt-16">
      <p className="font-medium text-sm text-gray-700 no-underline tracking-normal leading-non">
        Friends:{' '}
      </p>
      <input
      className='border-0 outline-none mt-4'
        type="text"
        placeholder="Search friends"
        name="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      {friendList?.length > 0 
        ? searchFriends(friendList)?.map((friend) => {
          return <div 
            className="flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out"
            key={friend.id}>
                <Link to={`/profile/${friend.id}`} >
                  <div className="flex items-center my-2 cursor-pointer">
                    <div className="flex items-center">
                      <Avatar
                        size="sm"
                        variant="circular"
                        src={friend?.image || avatar}
                        alt="avatar"
                      ></Avatar>
                      <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                        {friend.name}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className='mr-4'>
                    <FontAwesomeIcon 
                      icon={faTrash}  
                      onClick={() => removeFriend(friend.id, friend.name, friend.image)} 
                      className='mr-3 cursor-pointer'/>
                    <Link to={{ pathname: `/chat/${friend.id}`, state: { friend } }}>
                      <FontAwesomeIcon icon={faMessage} >
                      </FontAwesomeIcon>
                    </Link>
                </div>
            </div>;
        }) : (
          <p className="mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            Add friends to check their profile
          </p>
        )}
    </div>
  </div>
  )
}

export default RightSide