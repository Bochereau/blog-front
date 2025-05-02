import React from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../../actions";
import AdminPostForm from "./AdminPostForm";

const AdminCreatePost = () => {
  const dispatch = useDispatch();

  const handleCreate = (data) => {
    try {
      dispatch(addPost(data));
      alert("Article enregistré !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Erreur lors de l'enregistrement.");
    }
  };  

  return <AdminPostForm mode="create" onSubmit={handleCreate} />;
};

export default AdminCreatePost;