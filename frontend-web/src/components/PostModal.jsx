import { useEffect, useState } from "react";

const PostModal = ({onClose, post, onSuccess}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState();
    const [message, setMessage]= useState('');

    useEffect(()=> {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
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
            Array.from(images).forEach(image => {
                formData.append('images[]', image);
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
                    <input type="file" multiple className="" onChange={(e) => setImages(e.target.files)}/>
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
            </div>
        </div>  
    );
};
export default PostModal;