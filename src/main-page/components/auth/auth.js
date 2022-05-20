// this is where you place all the authenticate logic
// retrieve token from localStorage or whatever
import axios from "axios";
import { useNavigate } from "react-router-dom";

// axios object, contains http methods and what not
const api = axios.create({
    baseURL: "http://localhost:4000/users",
});

class Auth {
    // state carries over rerenders
    state = {};

    constructor() {

    }

    login = async (authenticateRequest) => {
        await api.post('/authenticate', {
            Username: authenticateRequest.Username,
            Password: authenticateRequest.Password
          })
          .then(function (response) {
            localStorage.setItem('token', response.data.token);
            return response.message
          })
          .catch(function (error) {
            console.log(error)
            // display error message here
            return error.response.data
          });
    };

    // register = async (registerRequest) => {
    //     await api
    //         .post("/register", {
    //             registerRequest
    //         })
    //         .then(function (response) {
    //             console.log(response);
    //             return response.message
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             return error.response.data
    //         });
    // };

    register = async (registerRequest) => {
        
        await axios
            .post("http://localhost:4000/users/register", registerRequest, {
            })
            .then(function (response) {
                console.log("Success:", response.data);
                return response.message
            })
            .catch(function (error) {
                console.log(error);
                return error.response.data
            });
    };

    logout() {
        localStorage.removeItem("token");
        window.location.reload();
    }
}

export default new Auth();
