import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    height: 60px;
    padding: 0 50px;
    border-bottom: 1px solid black;
    >div img{
        height: 20px;
    }
    input{
        width: calc(100vh - 150px);
        height: 20px;
    }
    a{
        margin:10px;
        >button{
            cursor: pointer;
            border: 1px solid black;
        }
        .login{
            background-color: #00b3e8;
        }
        .signIn{
            background-color: #fabd0f;
        }
    }
`

const Header = () => {
    return ( 
        <StyledHeader>
            <div>
                <NavLink to="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/800px-Friends_logo.svg.png" alt="logo" />
                </NavLink>
            </div>
            <input type="text" />
            <div>
            <NavLink to="/login">
                <button className="login">Login</button>
            </NavLink>
            <NavLink to="/register">
                <button className="signIn">Sign In</button> 
            </NavLink>
            </div>
            
        </StyledHeader>
     );
}
 
export default Header;