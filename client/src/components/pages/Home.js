import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Home = () => {
  const { userData } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/login");
  }, [userData, history]);
  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;
