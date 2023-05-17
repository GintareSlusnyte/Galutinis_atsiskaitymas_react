import { useContext } from "react";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";
import Post from "../Molecules/Post";


const HomePage = () => {

    const { posts } = useContext(PostsContext);
    

    return ( 
        <main>
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
        </main>
     );
}
 
export default HomePage;