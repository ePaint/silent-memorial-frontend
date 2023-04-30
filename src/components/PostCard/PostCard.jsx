import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


function PostCard({ loaded_post=null, index=1, featured=false } = {}) {
    const [post, setPost] = useState(loaded_post);

    // const fetchPost = (post_id) => {
    //     if (!post_id) console.error('Missing post_id');
    //     const url = `https://silent-memorial.fly.dev/api/posts/${post_id}/`;
    //     console.log('Downloading post_id:', post_id, ', url:', url);
    //     axios.get(url).then(response => {
    //         console.log(response);
    //         setPost(response.data);
    //     });
    // }    

    // useEffect(() => {
    //     if (!post) fetchPost(params.post_id);
    // }, []);

    const getContent = () => {
        const post_url = `/posts/${post?.post_id}#main`;
        if (featured) {
            return (
                <article className="post featured">
                    <header className="major">
                        <span className="date">{post?.death_date}</span>
                        <h2><Link to={post_url}>{post?.title}</Link></h2>
                        <p className="preview-content" dangerouslySetInnerHTML={{__html: post?.featured_content}}></p>
                    </header>
                    
                    <Link to={post_url} className="image main"><img src={require("/src/images/pic0" + index + "-alt.jpg")} alt="" /></Link>
                    <ul className="actions special">
                        <li><Link to={post_url} className="button large">Full Story</Link></li>
                    </ul>
                </article>
            )
        } else {
            return (
                <article>
                    <header>
                        <span className="date">{post?.death_date}</span>
                        <h2><Link to={post_url}>{post?.title}</Link></h2>
                    </header>

                    <Link to={post_url} className="image fit"><img src={require("/src/images/pic0" + index + "-alt.jpg")} alt="" /></Link>
                    <p className="preview-content" dangerouslySetInnerHTML={{__html: post?.short_content}}></p>
                    <ul className="actions special">
                        <li><Link to={post_url} className="button">Full Story</Link></li>
                    </ul>
                </article>
            )
        }
    }

    return (
        <>
            {getContent()}
        </>
    )
}

export default PostCard