import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import PostsContext from "../../contexts/PostsContext";
import Post from "../Molecules/Post";
import styled from "styled-components";

const PostoKortelesPage = () => {

    const { posts } = useContext(PostsContext)
    const { currentUser } = useContext(UsersContext);

    if (!currentUser) {
        return <div>Loading...</div>; // or any other appropriate loading indicator
    }

    return ( 
        <main>
            <h1>Profile</h1>
            <NavLink to="/newPost">
                <button>Add New Post</button>
            </NavLink>
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
        </main>
     );
}
 
export default PostoKortelesPage;