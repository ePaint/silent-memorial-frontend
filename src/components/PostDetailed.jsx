import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostDataContext, usePostDataLoadContext } from '../providers/PostDataProvider';


function PostDetailed() {
    const params = useParams(); 
    const [post, setPost] = useState(null);

    const fetchPost = async (post_id) => {
        const url = `https://silent-memorial.fly.dev/api/posts/${post_id}/`;
        console.log('Downloading post_id:', post_id, ', url:', url);
        const response = await axios.get(url)
        const data = response.data;

        console.log(data);
        setPost(data);
        return data;
    }

    const postData = usePostDataContext();
    const getPostData = usePostDataLoadContext();

    useEffect(() => {
        console.log('loaded_post:', postData);
        console.log('params.post_id:', params.post_id);

        const loadedPost = postData.postList.find(post => post.post_id === params.post_id);
        if (loadedPost) {
            setPost(loadedPost);
        } else {
            fetchPost(params.post_id);
        }
    }, [params.post_id]);

    return (
        <div id="main">
            <article className="post detailed">
                <header className="major">
                    <span className="date">{post?.death_date}</span>
                    <h2>{post?.title}</h2>
                    <span className="image main"><img src={require("../images/pic0" + 1 + "-alt.jpg")} alt="" /></span>
                    <p className="content" dangerouslySetInnerHTML={{__html: post?.content}}></p>
                </header>
            </article>
        </div>
    )
}

export default PostDetailed