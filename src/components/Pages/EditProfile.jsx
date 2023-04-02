import { useState, useContext } from "react";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { AuthContext } from "../AppContext/AppContext";
import PlacesAutocomplete from 'react-places-autocomplete';
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { user, userData } = useContext(AuthContext);
  const [location, setLocation] = useState(userData?.location || "");
  const [languages, setLanguages] = useState(userData?.languages || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(userQuery);
      const userDocRef = doc(collection(db, "users"), querySnapshot.docs[0].id);
      await updateDoc(userDocRef, {
        location,
        languages,
      });
      alert("Profile updated successfully!");
      setLocation("");
      setLanguages("");
    } catch (err) {
      console.log(err.message);
      alert("Failed to update profile");
    }

    setIsSubmitting(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Go to Home Page
    </Link>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-2xl font-bold mb-8">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="location">
                Where do you live?
              </label>


              <PlacesAutocomplete
                value={location}
                onChange={setLocation}
                >
  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    <div>
      <input
        {...getInputProps({
          placeholder: 'Location',
          className: 'location-search-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
          id: 'location',
          
        })}
      />
      <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map((suggestion, index) => {
          const className = suggestion.active
            ? 'suggestion-item--active'
            : 'suggestion-item';
          // inline style for demonstration purpose
          const style = suggestion.active
            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
            : { backgroundColor: '#ffffff', cursor: 'pointer' };
          return (
            <div
              key={index}
              className={className}
              style={style}
              {...getSuggestionItemProps(suggestion)}
            >
              <span>{suggestion.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  )}
</PlacesAutocomplete>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="languages">
                What programming languages do you learn?
              </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    list="languages"
                    placeholder="Select a programming language"
                    onChange={(e) => setLanguages(e.target.value)}
                    />
                    <datalist id="languages">
                    <option value="JavaScript" />
                    <option value="TypeScript" />
                    <option value="Java" />
                    <option value="Python" />
                    <option value="C#" />
                    <option value="PHP" />
                    <option value="C++" />
                    </datalist>
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submited" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
