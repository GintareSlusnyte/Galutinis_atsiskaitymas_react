import { useContext } from "react";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";
import Post from "../Molecules/Post";
import styled from "styled-components";

const StyledMain = styled.main`
    height: calc(100vh - 150px);
    h1{
        text-align: center;
    }
`


const HomePage = () => {

    const { posts } = useContext(PostsContext);
    

    return ( 
        <StyledMain>
            <h1>Posts</h1>

            <div>
                {
                    posts.map(post => 
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
 
export default HomePage;