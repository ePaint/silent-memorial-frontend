import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PostList.css';
import Post from './Post';
import Pagination from './Pagination';
import PostDetailed from './PostDetailed';
import { usePostDataContext, usePostDataLoadContext } from '../providers/PostDataProvider';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
}


function PostList() {
    const [postList, setPostList] = useState([]);

    const data = usePostDataContext();

    useEffect(() => {
        console.log('data.activePostList:', data.activePostList);
        setPostList(data.activePostList);
    }, [data])

    console.log(data);

    return (
        <div id="main">
            <Pagination />
            <Post key={postList[0]?.post_id} loaded_post={postList[0]} index={1} featured={true} />
            <section className="posts">
                {postList.map((post, index) => {
                    if (index > 0) return <Post key={post.post_id} loaded_post={post} index={index+1} featured={false} />;
                    return null;
                })}
            </section>
            <Pagination />
        </div>
    )
}

export default PostList