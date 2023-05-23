import { useParams } from "react-router-dom";
import { createContext, useReducer, useEffect, useState } from "react";

const UsersContext = createContext();
const UsersActionTypes = {
    get: 'get_all_users'
};

const reducer = (state, action) => {
    switch (action.type) {
      case UsersActionTypes.get:
        return action.data;
      case UsersActionTypes.add:
        fetch(`http://localhost:8080/users`, {
          method: "POST", // Use POST method to add a new user
          headers: {
            "Content-Type": "application/json" // Corrected the content type
          },
          body: JSON.stringify(action.data)
        })
          .then(res => res.json())
          .then(newUser => {
            return [...state, newUser]; // Append the new user to the existing state
          })
          .catch(error => console.error(error)); // Handle any errors
        return state; // Return the state as is while waiting for the API response
      default:
        return state;
    }
  };
  
  const UsersProvider = ({ children }) => {
    const [users, setUsers] = useReducer(reducer, []);
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:8080/users`)
        .then(res => res.json())
        .then(data =>
          setUsers({
            type: UsersActionTypes.get,
            data: data
          })
        )
        .catch(error => console.error(error)); // Handle any errors
    }, []);
  
    return (
      <UsersContext.Provider
        value={{
          users,
          setUsers,
          UsersActionTypes,
          currentUser,
          setCurrentUser
        }}
      >
        {children}
      </UsersContext.Provider>
    );
  };
  
  export { UsersProvider };
  export default UsersContext;