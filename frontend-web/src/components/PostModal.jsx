import { useState } from "react";

const PostModal = ({onClose}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title, content})
            });
            if (response.ok) {
                console.log("Post created successfully!")
            }
        }catch (error){
            console.error("Failed to create new post: ", error)
        }
        
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="w-7/10 h-4/5 bg-white flex flex-col items-center">
                <h1 className="text-2xl font-bold p-4">Create A Post</h1>
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