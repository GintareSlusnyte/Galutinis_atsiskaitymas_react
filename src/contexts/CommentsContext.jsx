import { createContext, useReducer, useEffect } from "react";

const CommentsContext = createContext();
const CommentsActionTypes = {
    get: 'get_all_comments'
};

const reducer = (state, action) => {
    switch(action.type){
        case CommentsActionTypes.get:
            return action.data;
        default:
            return state;
    }
}


const CommentsProvider = ({ children }) => {

    const [comments, setComments] = useReducer(reducer, []);

    useEffect(() => {
        fetch(`http://localhost:8080/replies`)
        .then(res => res.json())
        .then(data => setComments({
            type: CommentsActionTypes.get,
            data: data
        }));
    },[]);

    return ( 
        <CommentsContext.Provider
            value={{
                comments,
                setComments,
                CommentsActionTypes
            }}
        >
            { children }
        </CommentsContext.Provider>
     );
}
 
export { CommentsProvider}
export default CommentsContext;