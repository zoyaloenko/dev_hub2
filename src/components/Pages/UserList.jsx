import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const usersRef = collection(db, "users");
      let queryRef = query(usersRef);
      if (selectedLanguage) {
        queryRef = query(usersRef, where('languages', '==', selectedLanguage));
      }
      const snapshot = await getDocs(queryRef);
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    }
    fetchUsers();
  }, [selectedLanguage]);


  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  

  return (
    <div className="py-4 px-8 grid grid-cols-3 gap-4">
      <h2 className="text-2xl font-bold mb-4 col-span-3">Find other developers</h2>
      <div className="col-span-3">
        <select
          value={selectedLanguage}
          onChange={(e) => handleLanguageSelect(e.target.value)}
          className="border-gray-300 border-2 p-2 rounded-md"
        >
          <option value="">Show all developers</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="C#">C#</option>
          <option value="PHP">PHP</option>
          <option value="C++">C++</option>
        </select>
      </div>
      {users.map((user) => (
  <Link key={user.id} to={`/profile/${user.uid}`}>
    <div key={user.id} className="bg-white p-2 rounded-md shadow-md flex items-center">
      <img src={user.image} alt="userImage" className="w-10 h-10 mr-3 rounded-full"/>
      <div>
        <p className="text-base font-semibold">{user.name}</p>
        <p className="text-gray-500 text-xs">{user.location}</p>
        <p className="text-green-600 text-xs">{user.languages}</p>
      </div>
    </div>
  </Link>
))}
    </div>
  );
}

export default UserList;
