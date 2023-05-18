import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";
import PostsContext from "../../contexts/PostsContext";
import Post from "../Molecules/Post";
import styled from "styled-components";

const PostoKortelesPage = () => {

    const { posts } = useContext(PostsContext)
    const { currentUser } = useContext(UsersContext);

    return ( 
        <main>
            <h1>Profile</h1>
            <NavLink to="/addNewPost">
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