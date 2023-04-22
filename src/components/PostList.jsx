import React, { useEffect, useState } from 'react';
import './PostList.css';
import Post from './Post';
import Pagination from './Pagination';
import Loading from './Loading';
import { usePostDataContext, usePostDataLoadContext } from '../providers/PostDataProvider';

function PostList() {
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const data = usePostDataContext();

    useEffect(() => {
        console.log('data.isLoading:', data.isLoading);
        setIsLoading(data.isLoading);
    }, [data.isLoading])

    useEffect(() => {
        console.log('data.activePostList:', data.activePostList);
        setPostList(data.activePostList);
    }, [data.activePostList])
    

    return (
        <div id="main">
            <Pagination />
            {isLoading ? <Loading /> : <>
                <Post key={postList[0]?.post_id} loaded_post={postList[0]} index={1} featured={true} />
                <section className="posts">
                    {postList.map((post, index) => {
                        if (index > 0) return <Post key={post.post_id} loaded_post={post} index={index+1} featured={false} />;
                        return null;
                    })}
                </section>
            </>}
            <Pagination />
        </div>
    )
}

export default PostList