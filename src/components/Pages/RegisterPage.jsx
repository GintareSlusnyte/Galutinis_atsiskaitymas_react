import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UsersContext from "../../contexts/UsersContext";
import { v4 as generatedId } from 'uuid';

const StyledMain = styled.main`
    text-align: center;
    margin: 50px auto;
    >form{
        height: 350px;  
        width: 450px;
        margin: 50px auto;
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

    // const [ failedSignIn, setFailedSignIn ] = useState(false);
    const { setUsers, UsersActionTypes } = useContext(UsersContext);

    const navigate = useNavigate();

    const inputHandler = e => {
        setFormInputs({
            ...formInputs,
            [e.target.name]:e.target.value
        });
    }

    const formHandler = e => {
        e.preventDefault();
        const newUser = {
            id: generatedId(),
            userName: formInputs.userName,
            email: formInputs.email,
            picture: formInputs.picture,
            password: formInputs.password,
            passwordRepeat: formInputs.passwordRepeat
        }
        setUsers({
            type: UsersActionTypes.add,
            data: newUser
        });
        navigate('/');
    }

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