import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../../actions";
import AdminPostForm from "./AdminPostForm";

const AdminEditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const currentPost = allPosts.find((post) => post._id === id);

  useEffect(() => {
    if (allPosts.length === 0) dispatch(getPosts());
  }, [allPosts, dispatch]);

  const handleUpdate = (data) => {
    try {
      dispatch(updatePost(data));
      alert("Article mis à jour !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Erreur lors de l'enregistrement.");
    }
  };

  if (!currentPost) return <div className="admin-edit">Chargement...</div>;

  return <AdminPostForm initialData={currentPost} mode="edit" onSubmit={handleUpdate} />;
};

export default AdminEditPost;