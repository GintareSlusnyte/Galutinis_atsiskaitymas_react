import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;


    .user, .profile{
        display: flex;
        justify-content: center;
        align-items: center;
        
        >img{
            border-radius: 50%;
        }
        >a{
            text-decoration: none;
            color: black;
        }
        button{
            cursor: pointer;
            border: none;
            box-shadow: 0 0 1px;
        }
        .signIn{
            background-color: #ea1b21;
        }
        .login{
            background-color: #03b2e7;
        }
        .logout{
            background-color: #fabc15;
        }
    }

    @media (max-width: 800px){
        gap: 5px;
        height: 60px;
        padding: 0 30px;
        .logo img{
        height: 20px;
        width: 60px;
    }
        >input{
            width: 400px;
            height: 10px;
        }
        .user, .profile{
            gap: 10px;

            >img{
                height: 30px;
                width: 30px;
                border-radius: 50%;
            };
            >a{
                font-size: 12px;
            }
            button{
                font-size: 12px;
                padding: 2px 4px;
            }
        }
    };


    @media (min-width: 800px){
        gap: 10px;
        height: 60px;
        padding: 0 50px;
        .logo img{
        height: 20px;
        width: 100px;
    }
        >input{
            width: 900px;
        }
        .user, .profile{
            gap: 20px;

            >img{
                height: 40px;
                width: 40px;
                border-radius: 50%;
            }

            >a{
                font-size: 14px;
            }
            button{
                font-size: 13px;
                padding: 2px 6px;
            }
        }
    }
`;

const Header = () => {

    const { currentUser, setCurrentUser } = useContext(UsersContext);

    return ( 
        <StyledHeader>
            <div className="logo">
                <NavLink to="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/800px-Friends_logo.svg.png" alt="logo" />
                </NavLink>
            </div>
            <input type="text" />
            <div className="user">
            {    
                currentUser ? 
            <>
                <NavLink to="/profile/:id"><div className="profile">
                    <img className="userImg" src={currentUser.picture} alt="user picture" />
                    <p>{currentUser.userName}</p>
                </div></NavLink>
                <NavLink to="/">
                    <button
                        className="logout" onClick={() => {
                            setCurrentUser(null);
                        }}
                        >Logout
                    </button>
                </NavLink>
            </> : 
            <>
            <NavLink to="/login">
                    <button className="login">Login</button>
                </NavLink>
                <NavLink to="/register">
                    <button className="signIn">Sign In</button> 
                </NavLink>
                
            </>
            }
            </div>
            
        </StyledHeader>
     );
}
 
export default Header;