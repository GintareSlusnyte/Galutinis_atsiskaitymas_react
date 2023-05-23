import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";

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
    
`;

const StyledPost = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: 10px 50px;
  padding: 15px;
  height: 100px;
  box-shadow: 0 0 1px;

  background-color: #ebe9e9;

  .post h2{
    text-align: center;
    margin: 0;
    padding-top: 15px;
  }
  .post p{
    margin: 0;
    padding-top: 5px
  }

  >.user{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    >p{
        padding-top:15px;
    }
    >img{
        height: 50px;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    >button{
        position: absolute;
        bottom: 5px;
        left:20px;
        height: 20px;
        width: 50px;
        font-size: 10px;
    }
  }
`;

const StyledComment = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin: 10px 50px;
  padding: 10px;
  height: 50px;
  box-shadow: 0 0 1px;
  font-size: 14px;

  background-color: #ebe9e9;

  p{
    margin: 0;
    padding-top: 10px;
  }

  >.user{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-right:20px;
    font-size: 12px;
    >p{
        padding-top: 20px;
    }
    >img{
        height: 40px;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    >button{
        position: absolute;
        bottom: 5px;
        left:20px;
        height: 20px;
        width: 50px;
        font-size: 10px;
    }
  }
`;

const CommentsPage = () => {
  const { users, currentUser } = useContext(UsersContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const postResponse = await fetch(`http://localhost:8080/posts/${id}`);
      const postData = await postResponse.json();
      setPost(postData);

      const userResponse = await fetch(`http://localhost:8080/users/${postData.userId}`);
      const userData = await userResponse.json();
      setUser(userData);

      const commentsResponse = await fetch(`http://localhost:8080/replies?postId=${id}`);
      const commentsData = await commentsResponse.json();
      setComments(commentsData);
    };

    fetchData();
  }, [id]);

  const deletePost = () => {
    fetch(`http://localhost:8080/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log('postas ištrintas')
        } else {
          console.log('nepavyko ištrinti posto')
        }
      })
  };


  const deleteComment = (commentId) => {
    fetch(`http://localhost:8080/replies/${commentId}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {   
          console.log('komentaras ištrintas') 
        } else {
          console.log('nepavyko ištrinti komentaro')
        }
      })
  };

  return (
    <StyledMain>
      <h1>Post</h1>

      {
        post ? 
        <StyledPost>
          <div className="post">
            <h2>{post.title}</h2>
            <p>{post.article}</p>
          </div>

          {
            user && 
              <div className="user">
                {
                  currentUser && post.userId === currentUser.id && 
                  <NavLink to="/"><button onClick={deletePost}>Delete</button></NavLink>
                }

                {
                  currentUser && 
                    <NavLink to={`/newComment/${post.id}`}>
                      <button>Reply</button>
                    </NavLink>
                }
                <p>{user.userName}</p>
                <img src={user.picture} alt="user picture" />
              </div>
          }
        </StyledPost> : <p>Loading post...</p>
      }

      <h1>Comments</h1>

      {comments.length > 0 ? 
        comments.map((comment) => {
          const commentUser = users.find((user) => user.id === comment.userId);

          return (
            <StyledComment 
              key={comment.id}>
              <p>{comment.replay}</p>

              {
                commentUser && 
                  <div className="user">
                    {
                      currentUser && comment.userId === currentUser.id && 
                      <NavLink to="/"><button onClick={() => deleteComment(comment.id)}>Delete</button></NavLink>
                    }
                    <p>{commentUser.userName}</p>
                    <img src={commentUser.picture} alt="User" />
                  </div>
              }
            </StyledComment>
          );
        }) : <p>No comments available.</p>
      }

      {
        newComment && 
          <StyledComment 
            key={newComment.id}>
            <p>{newComment.replay}</p>

            {
              newComment.userId && 
                <div className="user">
                  {currentUser && newComment.userId === currentUser.id && (
                    <button onClick={deleteComment}>Delete</button>
                  )}
                  {newComment.userId && (
                    <p>{users.find((user) => user.id === newComment.userId)?.userName}</p>
                  )}
                  {newComment.userId && (
                    <img src={users.find((user) => user.id === newComment.userId)?.picture} alt="User" />
                  )}
                </div>
            }
          </StyledComment>
      }

      </StyledMain>
  );
};

export default CommentsPage;