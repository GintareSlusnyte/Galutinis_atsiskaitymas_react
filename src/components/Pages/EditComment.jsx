import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as generatedId } from 'uuid';
import UsersContext from "../../contexts/UsersContext";
import CommentsContext from "../../contexts/CommentsContext";
import styled from "styled-components";

const StyledMain = styled.main`

    background-color: #ffffff8b;
    background-image: url('https://www.travelandleisure.com/thmb/44-4gLqFVAtX1Ja_KQldq9nif_k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/friends-central-perk-new-york-CENTRALPERK1117-46b8d89f2f334d5f85b306abd47fd70e.jpg');
    background-blend-mode: lighten;
    background-size: cover;
    background-repeat: no-repeat;

    height: calc(100vh - 150px);
    text-align: center;
    h1 {
        padding: 15px;
        margin: 0px;

    }
    >form {
        background-color: #ffffffd1;
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
        textarea{
            margin: 10px;
        }
        #submit{
        background-color: #fabc15;
        cursor: pointer;
        border: none;
        box-shadow: 0 0 1px;
        padding: 2px 6px;
        text-align: center;
        }
    }
`;

const EditComment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { currentUser } = useContext(UsersContext);
    const { setComments, CommentsActionTypes } = useContext(CommentsContext);
    const [ formInputs, setFormInputs ] = useState({
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
        const editComment = {
            id: generatedId(),
            userId: currentUser.id,
            postId: id,
            replay: formInputs.replay
        };

        try {
            const response = await fetch(`http://localhost:8080/replies/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editComment)
            });

            if (response.ok) {
                setComments({
                    type: CommentsActionTypes.edit,

                    data: editComment
                });
                navigate(`/comments/${id}`);
            } else {
                console.error("ne editina");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };


    return ( 
        <StyledMain>
            <h1>Edit Your Post</h1>
            <form onSubmit={formHandler}>
                
                <div>
                    <label htmlFor="replay">Edit Your Comment:</label>
                    <textarea 
                        name="replay"
                        id="replay" 
                        cols="46" 
                        rows="10"
                        value={formInputs.replay}
                        onChange={inputHandler}>
                    </textarea>
                    
                </div>
                <input type="submit" id="submit" value="Create New Post" />
            </form>
        </StyledMain>
     );
}

 
export default EditComment;