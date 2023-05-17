import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import PostsContext from "../../contexts/PostsContext";
import styled from "styled-components";

const StyledPost = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 10px 50px;
  height: 130px;
  box-shadow: 0 0 1px;
`;

const StyledUser = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    height: 90px;
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
            {
                currentUser && data.userId === currentUser.id &&
                <button
                    onClick={ () => setPosts({
                        type: PostsActionTypes.delete,
                        id: data.id
                    }) }
                >Delete Post</button>
            }
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
                    <h2>{data.title}</h2>
                    <p>{data.article}</p>
            </div>
        </StyledPost>
        
     );
}
 
export default Post;