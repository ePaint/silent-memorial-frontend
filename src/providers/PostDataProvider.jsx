import axios from 'axios';
import React, { createContext, useState, useContext } from "react";
import { useEffect } from 'react';

const PostDataContext = createContext(null)
const PostDataLoadContext = createContext(null);

export function usePostDataContext() {
    return useContext(PostDataContext);
}

export function usePostDataLoadContext() {
    return useContext(PostDataLoadContext);
}

export function PostDataProvider(props) {
    const [postList, setPostList] = useState([]);
    const [activePostList, setActivePostList] = useState([]);
    const [paginator, setPaginator] = useState({current_page: 1});

    const updatePostList = (inputPostList) => {
        inputPostList.forEach(newPost => {
            let found = false;
            postList.forEach(post => {
                if (!found && post.post_id === newPost.post_id) {
                    found = true;
                }           
            });
            
            if (!found) postList.push(newPost);
        });

        setPostList(postList);
    }

    const updateActivePostList = (inputPostList) => {
        setActivePostList(inputPostList);
    }

    const updatePaginator = (data) => {
        const paginatorData = {
            ...paginator,
            current_page: data.current_page,
            total_pages: data?.total_pages ? data?.total_pages : paginator.total_pages,
        };

        paginatorData[data.current_page] = {
            post_id_list: data.results.map(post => post.post_id)
        }

        setPaginator(paginatorData);
    }

    const updateCache = (data) => {
        updatePostList(data.results);
        updateActivePostList(data.results);
        updatePaginator(data);
    }

    const fetchPostList = (page) => {
        console.log('paginator:', paginator);        
        const url = `https://silent-memorial.fly.dev/api/posts/?page=${page}`;
        console.log('Downloading post list. page:', page, ', url:', url);
        axios.get(url).then(response => {
            console.log(response);
            updateCache(response.data);
        });
    }

    const fetchPost = (post_id) => {
        const url = `https://silent-memorial.fly.dev/api/posts/${post_id}/`;
        console.log('Downloading post. post_id:', post_id, ', url:', url);
        axios.get(url).then(response => {
            console.log(response);
            const post = response.data;
            updatePostList([post]);
        });
    }

    const getPageData = (page) => {
        console.log('page (' + page + ') in paginator:', page in paginator, paginator);
        if (!(page in paginator)) {
            fetchPostList(page);
        } else {
            const postIdList = paginator[page].post_id_list;
            console.log('postIdList:', postIdList);
            const loadedPostList = postList.filter(post => postIdList.includes(post.post_id));
            console.log('loadedPostList:', loadedPostList);
            updateCache({
                current_page: page,
                results: loadedPostList
            });
        }
    }

    const getPostData = (post_id) => {
        const loadedPost = postList.find(post => post.post_id === post_id);
        if (loadedPost) return loadedPost;
        fetchPost(post_id);
    }

    useEffect(() => {
        fetchPostList(1);
    }, [])

    return (
        <PostDataContext.Provider value={{postList: postList, activePostList: activePostList, paginator: paginator}}>
            <PostDataLoadContext.Provider value={{getPageData: getPageData, getPostData: getPostData}}>
                {props.children}
            </PostDataLoadContext.Provider>
        </PostDataContext.Provider>
    )
}
