// import { useState, useEffect, useContext } from "react";
// import { updateDoc, doc, query, where, getDocs, collection } from "firebase/firestore";
// import { db } from '../firebase/firebase';
// import { AuthContext } from "../AppContext/AppContext";
// import { auth } from "../firebase/firebase";

// const EditProfile = () => {
//   const { user, userData } = useContext(AuthContext);
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [languages, setLanguages] = useState("");
//   const [profilePicture, setProfilePicture] = useState(null);

//   const fetchUserData = async () => {
//     const user = auth.currentUser;
//     if (user) {
//       const q = query(collection(db, "users"), where("uidField", "==", user.uid));
//       const docs = await getDocs(q);
//       const userData = docs.docs[0]?.data(); // use optional chaining to avoid null/undefined values
//       if (userData) {
//         setName(userData.name || '');
//         setLocation(userData.location || '');
//         setLanguages(userData.languages || '');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const userDoc = doc(db, "users", userData.uidField);
//     await updateDoc(userDoc, {
//       name,
//       location,
//       languages,
//       profilePicture,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//       </label>
//       <label>
//         Location:
//         <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
//       </label>
//       <label>
//         Languages:
//         <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} />
//       </label>
//       <label>
//         Profile picture:
//         <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
//       </label>
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default EditProfile;
