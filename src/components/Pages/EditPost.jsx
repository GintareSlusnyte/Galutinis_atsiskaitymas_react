import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as generatedId } from 'uuid';
import UsersContext from "../../contexts/UsersContext";
import PostsContext from "../../contexts/PostsContext";
import styled from "styled-components";


const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { currentUser } = useContext(UsersContext);
    const { setPosts, PostsActionTypes } = useContext(PostsContext);
    const [ formInputs, setFormInputs ] = useState({
        title: '',
        article: ''
    });

    const inputHandler = e => {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
        });
    };

    const formHandler = async e => {
        e.preventDefault();
        const editPost = {
            id: id,
            userId: currentUser.id,
            title: formInputs.title,
            article: formInputs.article
        };

        try {
            const response = await fetch(`http://localhost:8080/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editPost)
            });

            if (response.ok) {
                setPosts({
                    type: PostsActionTypes.edit,
                    id: id,
                    data: editPost
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
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formInputs.title}
                        onChange={inputHandler}
                    />
                </div>
                <div>
                    <label htmlFor="article">Article:</label>
                    <input
                        type="text"
                        name="article"
                        id="article"
                        value={formInputs.article}
                        onChange={inputHandler}
                    />
                </div>
                <input type="submit" value="Create New Post" />
            </form>
        </main>
     );
}
 
export default EditPost;