import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";

import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";
import PostList from "../components/posts/postList";


import {PageContext} from "../context/PageContext"

interface IParams {
    userId: string
}

const UserPosts : React.FC = () => {

    const {getAllUserPosts, clearPostStore} = useAction()

    const [pageNumber, setPageNumber] = useState(1)
    const [limit, setLimit] = useState(5)


    const {userId} = useParams<IParams>()

    const {users} = useTypedSelector(state => state.user)

    const [userName, setUserName] = useState("")

    useEffect(() => {
        clearPostStore()
        getAllUserPosts(userId, pageNumber, limit)

        console.log(users)

        const userData = users?.filter(user => user.id === userId)

        if (userData !== undefined) {
            setUserName(userData[0].email)
        }

        return () => {
            clearPostStore()
            setPageNumber(1)
        }
    }, [])


    useEffect(() => {
        console.log("change page number")
        getAllUserPosts(userId, pageNumber, limit)
    }, [pageNumber])



    return (
        <PageContext.Provider value={{pageNumber, setPageNumber, limit, setLimit}}>
            <PostList author={userName} />
        </PageContext.Provider>
    );
};

export default UserPosts;