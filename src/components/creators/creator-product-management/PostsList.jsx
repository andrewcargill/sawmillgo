import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogContent,
} from "@mui/material";
import PostEdit from "./PostEdit";

const PostsList = ({ db, userId, projectId }) => {
  const [posts, setPosts] = useState([]);
  const [openEditPostDialog, setOpenEditPostDialog] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId || !projectId) {
        console.error("Invalid userId or projectId for fetching posts");
        return;
      }

      const postsCollectionRef = collection(
        db,
        `users/${userId}/detailedProjects/${projectId}/posts`
      );
      const q = query(postsCollectionRef, orderBy("date", "desc"));

      try {
        const querySnapshot = await getDocs(postsCollectionRef);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts: ", error);
      }
    };

    fetchPosts();
  }, [db, userId, projectId]); // Depend on userId and projectId to refetch when they change

  const handleDelete = async (postId) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      const postDocRef = doc(
        db,
        `users/${userId}/detailedProjects/${projectId}/posts`,
        postId
      );
      try {
        await deleteDoc(postDocRef);
        setPosts(posts.filter((post) => post.id !== postId)); // Update UI immediately
        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
      }
    }
  };

  const handleEditPostClick = (post) => {
    setCurrentPost(post);
    setOpenEditPostDialog(true);
  };

  const handleEditPostClose = () => {
    setOpenEditPostDialog(false);
    setCurrentPost(null);
  }

  return (
    <Grid container border={"solid 1px #ffb501"} mt={2} borderRadius={3} p={3}>
     
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id} p={1}>
          <Card>
            {post.image && (
              <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt={post.title}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.description}
              </Typography>
              <Typography variant="body2">
                Date:{" "}
                {post.date
                  ? new Date(post.date).toLocaleDateString()
                  : "No date"}
              </Typography>
            </CardContent>
            <CardActions>
            <Button
  size="small"
  color="primary"
  onClick={() => handleEditPostClick(post)}
>
  Edit
</Button>

              <Button
                size="small"
                color="primary"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
          <Dialog
            open={openEditPostDialog}
            onClose={() => {
              setOpenEditPostDialog(false);
              setCurrentPost(null);
            }}
          >
            <DialogContent>
              {currentPost && (
                <PostEdit
                  db={db}
                  userId={userId}
                  projectId={projectId}
                  post={currentPost}
                handleClose={handleEditPostClose}
                />
              )}
            </DialogContent>
          </Dialog>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsList;
