import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as generatedId } from 'uuid';
import UsersContext from "../../contexts/UsersContext";
import CommentsContext from "../../contexts/CommentsContext";
import styled from "styled-components";

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
        <main>
            <h1>Edit Your Post</h1>
            <form onSubmit={formHandler}>
                
                <div>
                    <label htmlFor="replay">Edit Your Comment:</label>
                    <input
                        type="text"
                        name="replay"
                        id="replay"
                        value={formInputs.replay}
                        onChange={inputHandler}
                    />
                </div>
                <input type="submit" value="Create New Post" />
            </form>
        </main>
     );
}

 
export default EditComment;