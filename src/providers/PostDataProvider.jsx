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
    const [isLoading, setIsLoading] = useState(false);

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
            page_prev: data?.page_prev,
            page_next: data?.page_next,
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
        setIsLoading(true);
        axios.get(url).then(response => {
            console.log('response:', response);
            updateCache(response.data);
            setIsLoading(false);
        });
    }

    const fetchPost = (post_id) => {
        const url = `https://silent-memorial.fly.dev/api/posts/${post_id}/`;
        console.log('Downloading post. post_id:', post_id, ', url:', url);
        setIsLoading(true);
        axios.get(url).then(response => {
            console.log('response:', response);
            const post = response.data;
            updatePostList([post]);
            setIsLoading(false);
        });
    }

    const getPageData = (page) => {
        console.log('page (' + page + ') in paginator:', page in paginator, paginator);
        setPaginator({...paginator, current_page: page});
        if (!(page in paginator)) {
            fetchPostList(page);
        } else {
            const postIdList = paginator[page].post_id_list;
            console.log('postIdList:', postIdList);
            const loadedPostList = postList.filter(post => postIdList.includes(post.post_id));
            console.log('loadedPostList:', loadedPostList);
            updateCache({
                current_page: page,
                page_prev: page > 1 ? page - 1 : null,
                page_next: page < paginator.total_pages ? page + 1 : null,
                results: loadedPostList,
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
        <PostDataContext.Provider value={{postList: postList, activePostList: activePostList, paginator: paginator, isLoading: isLoading}}>
            <PostDataLoadContext.Provider value={{getPageData: getPageData, getPostData: getPostData}}>
                {props.children}
            </PostDataLoadContext.Provider>
        </PostDataContext.Provider>
    )
}
