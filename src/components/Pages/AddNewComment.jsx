import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as generatedId } from 'uuid';
import UsersContext from "../../contexts/UsersContext";
import CommentsContext from "../../contexts/CommentsContext"
import styled from "styled-components";

const StyledMain = styled.main`
    height: calc(100vh - 150px);
    text-align: center;
    h1 {
        padding: 15px;
    }
    >form {
        margin: 100px auto;
        height: 400px;
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        box-shadow: 0 0 1px;
        >div >input {
            margin: 10px;
            width: 350px;
        }
        #article {
            height: 200px;
        }
    }
`;

const AddNewComment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { currentUser } = useContext(UsersContext);
    const { setComments, CommentsActionTypes } = useContext(CommentsContext);
    const [formInputs, setFormInputs] = useState({
      replay: ''
    });
  
    const inputHandler = e => {
      setFormInputs({
        ...formInputs,
        [e.target.name]: e.target.value
      });
    };
  
    const formHandler = async e => {
      e.preventDefault();
      const newComment = {
        id: generatedId(),
        userId: currentUser.id,
        postId: id,
        replay: formInputs.replay
      };
  
      try {
        const response = await fetch(`http://localhost:8080/replies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
        });
  
        if (response.ok) {
          console.log('pavyko')
          setComments({
            type: CommentsActionTypes.add,
            data: newComment
          });
          navigate(`/comments/${id}`);
        } else {
          console.log(response)
        }
      } catch (error) {
        console.error('ERORAS', error);
      }
    };
  
    return (
      <StyledMain>
        <h1>Add New Comment</h1>
        <form onSubmit={formHandler}>
          <div>
            <label htmlFor="replay">Comment:</label>
            <input
              type="text"
              name="replay"
              id="replay"
              value={formInputs.replay}
              onChange={inputHandler}
            />
          </div>
          <input type="submit" value="Create New Comment" />
        </form>
      </StyledMain>
    );
  };
  
  export default AddNewComment;