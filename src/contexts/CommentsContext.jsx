import { createContext, useReducer, useEffect } from "react";

const CommentsContext = createContext();
const CommentsActionType = {
    get: 'get_all_comments'
};

const reducer = (state, action) => {
    switch(action.type){
        case CommentsActionType.get:
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
            type: CommentsActionType.get,
            data: data
        }));
    },[]);

    return ( 
        <CommentsContext.Provider
            value={{
                comments,
                setComments,
                CommentsActionType
            }}
        >
            { children }
        </CommentsContext.Provider>
     );
}
 
export { CommentsProvider}
export default CommentsContext;