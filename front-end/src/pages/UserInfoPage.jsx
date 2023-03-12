import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

export const UserInfoPage = () => {
  // const navigate = useNavigate();
  const user = useUser();
  const [token, setToken] = useToken();

  const { id, email, userInfo = {} } = user;

  const [favoriteFood, setFavoriteFood] = useState(userInfo.favoriteFood || '');
  const [hairColor, setHairColor] = useState(userInfo.hairColor || '');
  const [bio, setBio] = useState(userInfo.bio || '');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${id}`, {
        favoriteFood,
        hairColor,
        bio
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const {token: newToken} = response.data;

      setToken(newToken);
      setShowSuccessMessage(true);

    } catch(e) {
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {};

  const resetValues = () => {
    setFavoriteFood(userInfo.favoriteFood);
    setHairColor(userInfo.hairColor);
    setBio(userInfo.bio)
  };

  return (
    <div className="content-container">
      <h1>Info for {email}</h1>
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showErrorMessage && (
        <div className="fail">
          Uh oh... something went wrong and we couldn't save changes
        </div>
      )}
      <label>
        Favorite Food:
        <input
          onChange={({ target }) => setFavoriteFood(target.value)}
          value={favoriteFood}
        />
      </label>
      <label>
        Hair Color:
        <input
          onChange={({ target }) => setHairColor(target.value)}
          value={hairColor}
        />
      </label>
      <label>
        Bio:
        <input onChange={({ target }) => setBio(target.value)} value={bio} />
      </label>
      <hr />
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={resetValues}>Reset Values</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
