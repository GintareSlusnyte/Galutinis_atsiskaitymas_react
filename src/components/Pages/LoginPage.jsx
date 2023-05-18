import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UsersContext from "../../contexts/UsersContext";

const StyledMain = styled.main`
    height: calc(100vh - 230px);
    text-align: center;
    margin: 50px auto;
`
const StyledForm = styled.form`
  height: 300px;  
  width: 400px;
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
`;
const LoginPage = () => {

    const [ formInputs, setFormInputs ] = useState({
        userName: '',
        password: ''
    });
    const [ failedLogin, setFailedLogin ] = useState(false);
    const { users, setCurrentUser } = useContext(UsersContext);

    const navigate = useNavigate();

    const inputHandler = e => {
        setFormInputs({
            ...formInputs,
            [e.target.name]:e.target.value
        });
        setFailedLogin(false);
    }

    const formSubmit = e => {
        e.preventDefault();
        const loggedInUser = users.find(user => user.userName === formInputs.userName &&  user.password === formInputs.password);

        if(loggedInUser){
            setCurrentUser(loggedInUser);
            navigate('/');
        } else {
            setFailedLogin(true);
        }
    }




    return ( 
        <StyledMain>
            <h1>Login</h1>
            <StyledForm onSubmit={(e) => {formSubmit(e)}}>
                <input 
                    type="text" 
                    name="userName" id="userName"
                    value={formInputs.userName}
                    onChange={(e) => {inputHandler(e)}}
                    placeholder="Enter UserName"
                />

                <input 
                    type="password" 
                    name="password" id="password"
                    value={formInputs.password}
                    onChange={(e) => {inputHandler(e)}}
                    placeholder="Enter password" />

                <input type="submit" id="submit" value="Login"/>
                
            </StyledForm>

            {
                    failedLogin &&
                    <h1
                        style={{color: 'red'}}    
                    >
                        Neteisingi prisijungimo duomenys
                    </h1>
                }
        </StyledMain>
     );
}
 
export default LoginPage;