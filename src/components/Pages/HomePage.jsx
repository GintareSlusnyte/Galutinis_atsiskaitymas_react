import { useContext } from "react";
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
`


const HomePage = () => {

    const { posts } = useContext(PostsContext);
    
    

    return ( 
        <StyledMain>
            <h1>Posts</h1>

            <div>
                <button>Theme</button>
                <button>Filter</button>
            </div>

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