import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UsersContext from "../../contexts/UsersContext";

const StyledMain = styled.main`

    background-color: #ffffff8b;
    background-image: url('https://www.travelandleisure.com/thmb/44-4gLqFVAtX1Ja_KQldq9nif_k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/friends-central-perk-new-york-CENTRALPERK1117-46b8d89f2f334d5f85b306abd47fd70e.jpg');
    background-blend-mode: lighten;
    background-size: cover;
    background-repeat: no-repeat;

    height: calc(100vh - 130px);
    text-align: center;
    margin: 0 auto;
    h1{
        margin: 0;
        padding:15px;
    }
`
const StyledForm = styled.form`
    background-color: #ffffffd1;
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