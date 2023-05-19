import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
// import PostsContext from "../../contexts/PostsContext";
import CommentsContext from "../../contexts/CommentsContext";

const StyledCommentDiv = styled.div`
    width: 300px;
    height: 100px;
    display: flex;

`;

const StyledUserDiv = styled.div`
    img{
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
`


const Comment = ({ data }) => {

    const { users, currentUser } = useContext(UsersContext);
    const { setComments, CommentsActionTypes } = useContext(CommentsContext);
    const user = users.find(el => el.id === data.userId);

    return ( 
        <StyledCommentDiv>
            <div>
                {
                    currentUser && data.userId === currentUser.id &&
                    <button
                        onClick={ () => setComments({
                            type: CommentsActionTypes.delete,
                            id: data.id
                        }) }
                    >Delete Comment</button>
                }
                {
                    users.length ?
                    <StyledUserDiv>
                        <img src={user.picture} alt="user picture" />
                        <p>{user.userName}</p>
                    </StyledUserDiv>: <p>loading user...</p>
                }
            </div>
            <div>
                <p>{data.replay}</p>
            </div>
            
        </StyledCommentDiv>
     );
}
 
export default Comment;