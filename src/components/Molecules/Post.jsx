import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import PostsContext from "../../contexts/PostsContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledPost = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
div{
    display: flex;
    align-items: center;
     gap: 30px;
}
  
  margin: 10px 50px;
  height: 130px;
  box-shadow: 0 0 1px;

  background-color: #ebe9e9;

  a{
    color: black;
    text-decoration: none;
  }
  a:hover{
        color: #00b3e8;
    }
    button{
        position: absolute;
        bottom: 5px;
        right: 20px;
        font-size: 10px;
        width: 50px;
    }
`;

const StyledUser = styled.div`
        padding: 10px;
        padding-left: 10px;
        justify-content: center;
        height: 90px;
    div{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    }
    p{
        margin: 5px;
    }
    div >img{
        height: 60px;
        border-radius: 50%;
    }

`;


const Post = ({ data }) => {

    const { users, currentUser } = useContext(UsersContext);
    const { setPosts, PostsActionTypes } = useContext(PostsContext);
    const user = users.find(el => el.id === data.userId);

    
    
    return ( 
        <StyledPost>
            <div>
                <StyledUser>
                    { 
                        users.length ? 
                            <div>
                                <img src={user.picture} alt="user avatar" />
                                <p>{user.userName}</p>
                            </div>: <p>loading user....</p>
                    }
                    
                    </StyledUser>
                <div>
                        <NavLink to={`/comments/${data.id}`}>
                            <h2>{data.title}</h2>
                            <p>{data.article}</p>
                        </NavLink>
                </div>
            </div>

            {
                currentUser && data.userId === currentUser.id &&
                <button
                    onClick={ () => setPosts({
                    type: PostsActionTypes.delete,
                    id: data.id
                    }) }
                    >Delete</button>
            }

{
                currentUser && data.userId === currentUser.id &&
                <button
                    onClick={ () => setPosts({
                    type: PostsActionTypes.edit,
                    id: data.id
                    }) }
                    >Edit</button>
            }
            

        </StyledPost>
                
        
     );
}
 
export default Post;