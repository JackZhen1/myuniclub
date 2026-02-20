import { useEffect, useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";

const PostModal = ({onClose, post, onSuccess}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [message, setMessage]= useState('');
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [deleteImage, setDeleteImage] = useState(null);

    const baseUrl = "http://localhost:8000/storage/";
    useEffect(()=> {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
            if (post.images){
                const imageArray = post.images.map((image)=> {
                return {
                    'key': image.id,
                    'preview': baseUrl + image.image_path,
                    'id': image.id
                }
            })
            setImages(imageArray);
            }
        };
    }, [post]);

    useEffect(()=> {
        if (message) {
            const timer = setTimeout(()=> setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        
        if (post) {
            formData.append('_method', 'PUT');
        }
        if (images) {
            images.forEach(image => {
                formData.append('images[]', image.file);
            })
        }
        
        try{
            const url = post ? `http://localhost:8000/api/posts/${post.id}` : "http://localhost:8000/api/posts";
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                onSuccess(data.post);
                setTimeout(() => {
                onClose(); 
                }, 1500);
            }
        }catch (error){
            console.error("Failed to create new post: ", error)
        }
    }

    const handleImageChange = (e) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files);
            const newImages = fileArray.map((file) => {
                return {
                    'file': file,
                    'preview': URL.createObjectURL(file)
                }
            });
            setImages((prevImages) => [...prevImages, ...newImages]);
            console.log(images);
        }
    };

    const handleDeleteImageClick = (id) => {
        setIsDeleteConfirmModalOpen(true);
        setDeleteImage(id);
    };

    const handleDeleteImage = async () => {
        if (post){
            try {
                const response = await fetch(`http://localhost:8000/api/images/${deleteImage}`, {
                    method:'DELETE'
                });
                if (response.ok) {
                    const message = await response.json();
                    setImages(images.filter(image => image.id !== deleteImage));
                    const updatedPostImages = post.images.filter(img => img.id !== deleteImage);
                    const updatedPost = { ...post, images: updatedPostImages };
                    onSuccess(updatedPost);
                    setIsDeleteConfirmModalOpen(false);
                    console.log(message.message);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setImages(images.filter(image => image.id !== deleteImage));
            setIsDeleteConfirmModalOpen(false);
        }
        
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="w-7/10 h-4/5 bg-white flex flex-col items-center">
                {post? <h1 className="text-2xl font-bold p-4">Edit A Post</h1>:
                <h1 className="text-2xl font-bold p-4">Create A Post</h1>}
                
                <form className="w-full h-5/6 flex flex-col items-center p-4"
                onSubmit={handleSubmit}>
                    <input 
                        type="text" className="w-4/5 border p-2 rounded text-center"
                        placeholder="Title"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea 
                        className="border w-full mt-2 h-full p-2" 
                        placeholder="Enter your post content here..."
                        value={content} onChange={(e) => setContent(e.target.value)}
                    />
                    <label htmlFor="file-upload" className="mt-8">
                        <span className="border p-2">Upload images</span>
                        <input id="file-upload" type="file" multiple className="hidden" onChange={handleImageChange}/>
                    </label>
                    {images && 
                    <div className="flex justify-center">
                        {images.map((image)=> ( 
                            <div key={image.preview} className="overflow-hidden mt-4 p-1 relative">
                                <img src={image.preview} className="w-30 h-40 object-cover"/>
                                <button type="button" className="absolute bottom-2 left-1/2 trasnlate-x-1/2 bg-gray-700/80"
                                onClick={()=> handleDeleteImageClick(image.id)}>
                                    <span className="text-white">✕</span>
                                </button>
                            </div>
                        ))}
                    </div>
                    }  
                    
                    {message && <span>{message}</span>}
                    <div className="flex justify-end pt-4 gap-2 w-full">
                        <button type="submit" className="p-3 bg-[#78977C] rounded-xl">
                            <span className="text-white">Submit</span>
                        </button>

                        <button className="p-3 bg-red-700 rounded-xl"
                        onClick={onClose}>
                            <span className="text-white">Cancel</span>
                        </button>
                    </div>
                </form>
                {isDeleteConfirmModalOpen && <DeleteConfirmModal onClose={()=> setIsDeleteConfirmModalOpen(false)} onConfirm={handleDeleteImage}/>} 
            </div>
        </div>  
    );
};
export default PostModal;