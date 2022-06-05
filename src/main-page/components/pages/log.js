import { useState, useEffect } from "react";
import LogComponent from "./inner-components/logComponent";
import axios from "axios";

const Log = () => {
  const [userLogs, setUserLogs] = useState([]);

  useEffect(() => {
      getUserLogs();
  }, [null]);

  const getUserLogs = async () => {
    await axios
      .get("http://localhost:4000/userlogs/getAuthenticatedUserLogs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        console.log("Success:", response.data);
        setUserLogs(response.data);
        
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  };

  return (
    <div>
      {userLogs.map((log, index) => (
          <LogComponent Log={log}></LogComponent>
      ))}
    </div>
  );
};

export default Log;
