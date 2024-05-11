import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

const PostsList = ({ db, userId, projectId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!userId || !projectId) {
                console.error("Invalid userId or projectId for fetching posts");
                return;
            }

            const postsCollectionRef = collection(db, `users/${userId}/detailedProjects/${projectId}/posts`);
            try {
                const querySnapshot = await getDocs(postsCollectionRef);
                const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Failed to fetch posts: ", error);
            }
        };

        fetchPosts();
    }, [db, userId, projectId]); // Depend on userId and projectId to refetch when they change

    return (
        <div>
            <h3>Posts</h3>
            {posts.map(post => (
                <div key={post.id} style={{ marginBottom: '20px' }}>
                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
                    {post.image && <img src={post.image} alt={post.title} style={{ width: '100px', height: 'auto' }} />}
                    <p>Date: {post.date ? new Date(post.date).toLocaleDateString() : 'No date'}</p>
                </div>
            ))}
        </div>
    );
};

export default PostsList;
