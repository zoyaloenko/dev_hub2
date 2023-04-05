import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AppContext/AppContext";
import { db } from "../firebase/firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  addDoc,
  serverTimestamp,
  arrayRemove,
} from "firebase/firestore";
import { Link } from "react-router-dom";


const Mobs = () => {
  const { user } = useContext(AuthContext);
  const [mobName, setMobName] = useState("");
  const [mobDescription, setMobDescription] = useState("");
  const [mobs, setMobs] = useState([]);

  useEffect(() => {
    async function fetchMobs() {
      const querySnapshot = await getDocs(collection(db, "mobs"));
      const mobsData = querySnapshot.docs.map((doc) => doc.data());
      setMobs(mobsData);
    }
    fetchMobs();
  }, [mobs]);

  const handleClick = async () => {
    await createGroup(mobName, mobDescription);
    setMobName('');
    setMobDescription('');
  };


  const createGroup = async (groupName, groupDescription) => {
    try {
      const q = query(
        collection(db, "mobs"),
        where("createdBy", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.docs.length === 0) {
        // If no mob is found, create a new mob document for the user
        const mobRef = collection(db, "mobs");        
        const newMob = {
          createdBy: user.uid,
          createdAt: serverTimestamp(),
        };
        
      } else {
        // If a mob is found, add the new group to it as a subcollection
        const docRef1 = querySnapshot.docs[0].ref;
        await updateDoc(docRef1, {
          pendingMembers: arrayUnion(user.uid),
        });
      }
  
      // Add the new group to the mobs collection
      const groupRef = collection(db, "mobs");
      const mobs = doc(collection(db, "mobs"));

      const newGroup = {
        mobId: mobs.id,
        name: groupName,
        description: groupDescription,
        createdBy: user.uid,
        author: user.displayName,
        createdAt: serverTimestamp(),
        // members: [user.displayName],
        members: [
          {
            uid: user?.uid,
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          },
        ],
      };
      const docRef = await addDoc(groupRef, newGroup);
      console.log("Group created with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating group: ", error);
    }
  };
  

  const sendJoinRequest = async (mobName, user) => {
    // const userId = user.uid;
    const q = query(collection(db, "mobs"), where("name", "==", mobName));
    const querySnapshot = await getDocs(q);
    const groupId = querySnapshot.docs[0].id;
    const mobRef = doc(db, "mobs", groupId);
    // await updateDoc(mobRef, {
    //   joinRequests: arrayUnion(user.displayName)
    //   });
    await updateDoc(mobRef, {
      joinRequests: arrayUnion({
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      }),
    });
    
    console.log("Join request sent for group ", groupId);
  };
  


  const handleApprove = async (mobName, user) => {
    const q = query(collection(db, "mobs"), where("name", "==", mobName));
    const querySnapshot = await getDocs(q);
    const groupId = querySnapshot.docs[0].id;
    const mobRef = doc(db, "mobs", groupId);
  
    try {
      // Remove the user from the joinRequests array
      // await updateDoc(mobRef, {
      //   joinRequests: arrayRemove(userName)
      // });
//       await updateDoc(mobRef, {
//         joinRequests: arrayRemove( { uid: user?.uid,
//           name: user?.displayName,
//           email: user?.email,
//           image: user?.photoURL,
// })
//       });
        await updateDoc(mobRef, {
          joinRequests: arrayRemove({ ...user }),
        });


  
      // Add the user to the members array
      // await updateDoc(mobRef, {
      //   members: arrayUnion(userName)
      // });
//       await updateDoc(mobRef, {
//         members: arrayUnion({ uid: user?.uid,
//           name: user?.displayName,
//           email: user?.email,
//           image: user?.photoURL,
// })
//       });

        await updateDoc(mobRef, {
          members: arrayUnion({ ...user }),
        });


  
      console.log(`${user.displayName} has been added to the members array.`);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const handleReject = async (mobName, user) => {
    const q = query(collection(db, "mobs"), where("name", "==", mobName));
    const querySnapshot = await getDocs(q);
    const groupId = querySnapshot.docs[0].id;
    const mobRef = doc(db, "mobs", groupId);
  
    try {
      // Remove the user from the joinRequests array
      await updateDoc(mobRef, {
        joinRequests: arrayRemove({...user})
      });
  
      console.log(`${user.name} has been removed from the joinRequests array.`);
    } catch (error) {
      console.error(error);
    }
  };  



  return (
    <div>
          <div className="w-1/3 p-6 border rounded-lg">
            <Link to="/">
              <button className="mb-4">BACK TO HOME PAGE</button>
            </Link>
            <h1 className="text-3xl font-bold mb-4">Create Mob</h1>
            <div className="mb-4">
              <label htmlFor="mobName" className="block font-bold">Mob Name:</label>
              <input
                id="mobName"
                type="text"
                value={mobName}
                onChange={(e) => setMobName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobDescription" className="block font-bold">Mob Description:</label>
              <input
                id="mobDescription"
                type="text"
                value={mobDescription}
                onChange={(e) => setMobDescription(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Create Mob</button>
          </div>




      <div>

        <h1 className="text-3xl font-bold mb-4">Mobs</h1>
          <div className="grid grid-cols-2 gap-4">
            {mobs.map((mob) => (
              <div key={mob.name} className="p-4 border rounded-lg border-solid border-black border-2">
                <h2 className="text-xl font-bold mb-2">{mob.name}</h2>
                <p className="mb-2">{mob.description}</p>
                <p className="mb-2">Created by: {mob.author}</p>
                {/* <p className="mb-4">Members: {mob.members && mob.members.join(", ")}</p> */}
                <p className="mb-4">Members: {mob.members?.map(member => member.name).join(", ") ?? "No members"}</p>

                {user.uid !== mob.createdBy && (
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2" onClick={() => sendJoinRequest(mob.name, user)}>
                    Join Request
                  </button>
                )}
                <p className="text-left mb-2 ">Pending requests:</p>
                {mob.joinRequests &&
                  mob.joinRequests.map((request, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <p>{request.name}</p>
                      {user.uid === mob.createdBy && (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 ml-3"
                            onClick={() => handleApprove(mob.name, request)}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(mob.name, request)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Mobs;