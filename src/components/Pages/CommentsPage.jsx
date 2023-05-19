import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledMain = styled.main`
    /* background-color: #ffffff8b;
    background-image: url('https://www.travelandleisure.com/thmb/44-4gLqFVAtX1Ja_KQldq9nif_k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/friends-central-perk-new-york-CENTRALPERK1117-46b8d89f2f334d5f85b306abd47fd70e.jpg');
    background-blend-mode: lighten;
    background-size: cover;
    background-repeat: no-repeat; */

    height: calc(100vh - 130px);

    h1{
        margin-top: 0;
        padding-top: 20px;
        text-align: center;
    }
`;
const StyledUser = styled.div`
    padding: 10px;
    padding-left: 10px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    height: 90px;
    >img{
        height: 50px;
        border-radius: 50%;
    }
`;
const StyledComment = styled.div`
    /*  */
`;

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  margin: 10px 50px;
  height: 170px;
  box-shadow: 0 0 1px;
  background-color: #ebe9e9;
  
`;


const CommentsPage = () => {

    const { id } = useParams();
    const [post, setPost] = useState();
    const [user, setUser] = useState();
    const [comment, setComment ] = useState();

    useEffect(() => {
        fetch(`http://localhost:8080/posts/${id}`)
          .then(res => res.json())
          .then(data => {
            setPost(data);
            const userId = data.userId;
            fetch(`http://localhost:8080/users/${userId}`)
          .then((res) => res.json())
          .then((userData) => setUser(userData));
          });
      }, []);


      useEffect(() => {
        fetch(`http://localhost:8080/replies/${id}`)
          .then(res => res.json())
          .then(data => {
            setPost(data);
            const userId = data.userId;
            fetch(`http://localhost:8080/users/${userId}`)
          .then((res) => res.json())
          .then((userData) => setUser(userData));
          });
      }, []);
      

    return ( 
        <StyledMain>
            <h1>Post</h1>

            <div>
                <button>Theme</button>
                <button>Filter</button>
            </div>
            <StyledPost>
                {
                    post ?
                    <div>
                        <h2>{post.title}</h2>
                        <p>{post.article}</p>
                    </div> :
                    <p>loading post...</p>
                }

                {
                    user ? 
                    <StyledUser>
                        <img src={user.picture} alt="user picture" />
                        <p>{user.userName}</p>
                        {/* <button>Comment</button> */}
                    </StyledUser> : <p>loading user...</p>
                }
                
            </StyledPost>

                
                <h1>Comments</h1>

                <StyledComment>
                    {
                        comment ?
                        <div>
                            
                            <p>{comment.replay}</p>
                        </div> :
                        <p>loading comment...</p>
                    }

                    {
                        user ? 
                        <StyledUser>
                            <img src={user.picture} alt="user picture" />
                            <p>{user.userName}</p>
                            {/* <button>Comment</button> */}
                        </StyledUser> : <p>loading user...</p>
                    }
                </StyledComment>
        </StyledMain>
     );
}
 
export default CommentsPage;