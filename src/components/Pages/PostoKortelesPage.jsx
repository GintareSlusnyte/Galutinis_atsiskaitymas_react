import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import PostsContext from "../../contexts/PostsContext";
import Post from "../Molecules/Post";
import styled from "styled-components";

const StyledMain = styled.main`
    background-color: #ffffff8b;
    background-image: url('https://www.travelandleisure.com/thmb/44-4gLqFVAtX1Ja_KQldq9nif_k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/friends-central-perk-new-york-CENTRALPERK1117-46b8d89f2f334d5f85b306abd47fd70e.jpg');
    background-blend-mode: lighten;
    background-size: cover;
    background-repeat: no-repeat;

    height: calc(100vh - 130px);

    h1{
        margin-top: 0;
        padding-top: 20px;
        text-align: center;
    }
    .addNew{
        text-align: right;
        margin: 10px 50px;
    }
    button{
        background-color: #ea1b21;
        cursor: pointer;
        border: none;
        box-shadow: 0 0 1px;
        padding: 2px 6px;
        text-align: center;
        
    }
`;

const PostoKortelesPage = () => {

    const { posts } = useContext(PostsContext)
    const { currentUser } = useContext(UsersContext);


    return ( 
        <StyledMain>
            <h1>Profile</h1>
            <div className="addNew">
                <NavLink to="/newPost">
                    <button>Add New Post</button>
                </NavLink>
            </div>
            
            <div>
                {
                    posts.map(post =>
                        post.userId === currentUser.id &&
                        <Post
                        key={post.id}
                        data={post}
                        />
                    )
                }
            </div>
        </StyledMain>
     );
}
 
export default PostoKortelesPage;