import { useContext } from "react";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";
import Post from "../Molecules/Post";
import styled from "styled-components";
import CommentsContext from "../../contexts/CommentsContext";
import Comment from "../Molecules/Comment";


const CommentsPage = () => {

    const { posts } = useContext(PostsContext);
    const { comments } = useContext(CommentsContext);
    

    return ( 
        <main>
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
            <div>
                {
                    comments.map(comment => 
                        <Comment 
                        key={comment.id}
                        data={comment}
                        />
                    )
                }
            </div>
        </main>
     );
}
 
export default CommentsPage;