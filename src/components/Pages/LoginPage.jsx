import styled from "styled-components";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import UsersContext from "../../contexts/UsersContext";

const StyledMain = styled.main`
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
  
`;
const LoginPage = () => {

    const values = {
        userName: '',
        password: ''
    };




    return ( 
        <StyledMain>
            <h1>Login</h1>
            <StyledForm>
                <input type="text" placeholder="Enter UserName"/>
                <input type="password" placeholder="Enter password" />

                <input type="submit" value="Login"/>
            </StyledForm>
        </StyledMain>
     );
}
 
export default LoginPage;