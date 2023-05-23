import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import { v4 as generatedId } from 'uuid';

const StyledMain = styled.main`

  background-color: #ffffff8b;
    background-image: url('https://www.travelandleisure.com/thmb/44-4gLqFVAtX1Ja_KQldq9nif_k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/friends-central-perk-new-york-CENTRALPERK1117-46b8d89f2f334d5f85b306abd47fd70e.jpg');
    background-blend-mode: lighten;
    background-size: cover;
    background-repeat: no-repeat;

    height: calc(100vh - 130px);
    text-align: center;

    h1{
      margin: 0;
      padding: 20px;
    }
    >form{
      background-color: #ffffffd1;
        height: 350px;  
        width: 450px;
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
        box-shadow: 0 0 1px;
        #submit{
            cursor: pointer;
            background-color: #00b3e8;
            border:1px solid black;
  }
    }
`;


const RegisterPage = () => {
    
    const [ formInputs, setFormInputs ] = useState({
        userName: '',
        email: '',
        picture: '',
        password: '',
        passwordRepeat: ''
    });

    const { users, setUsers, UsersActionTypes } = useContext(UsersContext);

    const navigate = useNavigate();

    const inputHandler = e => {
        setFormInputs({
            ...formInputs,
            [e.target.name]:e.target.value
        });
    }

    const formHandler = async (e) => {
        e.preventDefault();
        
        const newUser = {
          id: generatedId(),
          userName: formInputs.userName,
          email: formInputs.email,
          picture: formInputs.picture,
          password: formInputs.password,
          passwordRepeat: formInputs.passwordRepeat
        };
      
        try {
          const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          });
      
          if (response.ok) {
            // User added successfully
            const updatedUsers = [...users, newUser];
            setUsers({
              type: UsersActionTypes.update,
              data: updatedUsers
            });
            navigate(`/profile/`);
          } else {
            // Handle error if the request fails
            console.error('Failed to add user.');
          }
        } catch (error) {
          console.error('An error occurred while adding the user:', error);
        }
      };
    

    return ( 
        <StyledMain>
            <h1>Sign In</h1>
            <form onSubmit={(e) => {formHandler(e)}}>
                <input 
                    type="text" 
                    name="userName" id="userName"
                    value={formInputs.userName}
                    onChange={(e) => {inputHandler(e)}}
                    placeholder="Create Your user name"
                    required
                />
                <input 
                    type="text" 
                    name="email" id="email"
                    value={formInputs.email}
                    onChange={(e) => {inputHandler(e)}}
                    placeholder="Enter Your email"
                    required
                />
                <input
                    type="url"
                    name="picture" id="picture"
                    value={formInputs.picture}
                    onChange={(e) => {inputHandler(e)}}
                    placeholder="Your picture"
                    required
                />
                <input 
                type="password" 
                name="password" id="password"
                value={formInputs.password}
                onChange={(e) => {inputHandler(e)}}
                placeholder="Enter Your password"
                />
                <input 
                type="password" 
                name="passwordRepeat" id="passwordRepeat"
                value={formInputs.passwordRepeat}
                onChange={(e) => {inputHandler(e)}}
                placeholder="Repeat Your password"
                />
                <input type="submit" id="submit" value="Sign In"/>
            </form>
        </StyledMain>
     );
}
 
export default RegisterPage;