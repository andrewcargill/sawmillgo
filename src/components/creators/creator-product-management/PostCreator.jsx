import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

const PostCreator = ({ db, userId, projectId }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postImage, setPostImage] = useState('');
    const [postDate, setPostDate] = useState('');

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        if (!userId || !projectId) {
            alert('Missing user or project ID.');
            return;
        }

        const postsCollectionRef = collection(db, `users/${userId}/detailedProjects/${projectId}/posts`);
        try {
            await addDoc(postsCollectionRef, {
                title: postTitle,
                description: postDescription,
                image: postImage,
                date: new Date(postDate) // Assuming postDate is a string in YYYY-MM-DD format
            });
            alert('Post added successfully!');
            setPostTitle('');
            setPostDescription('');
            setPostImage('');
            setPostDate('');
        } catch (error) {
            console.error('Error adding post: ', error);
            alert('Failed to add post.');
        }
    };

    return (
        <>
        <form onSubmit={handlePostSubmit}>
            <h3>Add New Post</h3>
            <label>
                Title:
                <input type="text" value={postTitle} onChange={e => setPostTitle(e.target.value)} />
            </label>
            <label>
                Description:
                <textarea value={postDescription} onChange={e => setPostDescription(e.target.value)} />
            </label>
            <label>
                Image URL:
                <input type="text" value={postImage} onChange={e => setPostImage(e.target.value)} />
            </label>
            <label>
                Date:
                <input type="date" value={postDate} onChange={e => setPostDate(e.target.value)} />
            </label>
            <button type="submit">Add Post</button>
        </form>
       
        </>
    );
};

export default PostCreator;