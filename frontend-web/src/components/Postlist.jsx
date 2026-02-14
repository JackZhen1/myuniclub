import PostModal from "./PostModal";
import { useState } from "react";

const ToolBar = ({setIsModalOpen}) => (
    <div className="bg-white">
        <button className="p-2 rounded-xl bg-blue-400 shadow"
        onClick={()=> setIsModalOpen(true)}>
            <span className="text-white">Add post</span>
        </button>
    </div>
);

const Postlist = ({posts, isLoading}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="border w-full p-4">
            <ToolBar setIsModalOpen={setIsModalOpen}/>
            {isModalOpen && <PostModal onClose={() => setIsModalOpen(false)} />}
            <div>
                {isLoading ? (
                    <div className="flex flex-1 items-center justify-center text-gray-400">
                        <p className="animate-pulse">Loading amazing posts...</p>
                    </div>
                ): posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">add a new</div>
                ): (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-6 h-full w-full">
                    {posts.map((post) => (
                        <section className='h-100 p-4 rounded-2xl border m-8 bg-white shadow-md'>
                            <h1 className=''>{post.title}</h1>
                            <p>{post.content}</p>
                        </section>
                    ))} 
                </div>)}
            </div>
        </div>


    );
};

export default Postlist

