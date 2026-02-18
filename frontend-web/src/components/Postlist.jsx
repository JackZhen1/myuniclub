import PostModal from "./PostModal";
import Postcard from "./Postcard";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useState, useEffect } from "react";

const ToolBar = ({openCreateModal}) => (
    <div className="bg-white">
        <button className="p-2 rounded-xl bg-blue-400 shadow"
        onClick={()=> openCreateModal()}>
            <span className="text-white">Add post</span>
        </button>
    </div>
);

const Postlist = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [deletePostId , setDeletePostId] = useState('');
    
    const openDeleteConfirmModal = (postId) => {
        setDeletePostId(postId);
        setIsDeleteConfirmModalOpen(true);
    };
    
    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/posts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error){
        console.error("Failed to fetch posts.")
      }
    }
    fetchPosts();
    }, []);

    const openEditModal = (post) => {
        setEditingPost(post);
        setIsModalOpen(true);
    }
    const openCreateModal = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    }

    const handleUpdateSuccess = (updatedPost) => {
        const isEditing = posts.some(p => p.id === updatedPost.id);
        if (isEditing) {
            const newPostlist = posts.map((post)=> {
                if(post.id === updatedPost.id) {
                    return updatedPost;
                }
                return post;})
            setPosts(newPostlist);
        } else {
            setPosts([updatedPost, ...posts]);
        };
    };

    const handleDeletePost = async () => {
        if (!deletePostId) return;

        try {
            const response = await fetch(`http://localhost:8000/api/posts/${deletePostId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Post has been deleted.");
                setPosts(posts.filter(p => p.id !== deletePostId));
                setIsDeleteConfirmModalOpen(false);
                setDeletePostId(null);
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <div className="border w-full p-4">
            <ToolBar openCreateModal={openCreateModal}/>
            {isModalOpen && <PostModal post={editingPost} onClose={() => {
                setIsModalOpen(false);
                setEditingPost(null); 
                }} onSuccess={handleUpdateSuccess}/>}
            
            {isDeleteConfirmModalOpen && <DeleteConfirmModal onClose={() => setIsDeleteConfirmModalOpen(false)} onConfirm={handleDeletePost}/>}
            <div>
                {isLoading ? (
                    <div className="flex flex-1 items-center justify-center text-gray-400">
                        <p className="animate-pulse">Loading amazing posts...</p>
                    </div>
                ): posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">add a new</div>
                ): (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6 h-full w-full">
                    {posts.map((post) => <Postcard key={post.id} post={post} onClick={() => openEditModal(post)} onDelete={openDeleteConfirmModal}/>)}
                </div>)}
            </div>
            
        </div>
    );
};

export default Postlist

