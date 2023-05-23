import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as generatedId } from 'uuid';
import UsersContext from "../../contexts/UsersContext";
import PostsContext from "../../contexts/PostsContext";
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

const AddNewPost = () => {
    const navigate = useNavigate();
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
        const newPost = {
            id: generatedId(),
            userId: currentUser.id,
            title: formInputs.title,
            article: formInputs.article
        };

        try {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                // Post added successfully
                setPosts({
                    type: PostsActionTypes.add,
                    data: newPost
                });
                navigate('/');
            } else {
                // Handle error if the request fails
                console.error('Failed to add post.');
            }
        } catch (error) {
            console.error('An error occurred while adding the post:', error);
        }
    };

    return (
        <StyledMain>
            <h1>Add New Post</h1>
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
        </StyledMain>
    );
};

export default AddNewPost;
