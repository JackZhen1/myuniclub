const Postcard = ({post, onClick}) => {
    const baseUrl = "http://localhost:8000/storage/";

    const handleDeletePost = async(e) => {
        e.stopPropagation();
        try {
            const response = await fetch(`http://localhost:8000/api/posts/${post.id}`, {
                method : "DELETE",
                }
            );
            if (response.ok) {
                console.log("Post has been deleted.")
            }
        }catch (error) {
            console.error("Failed to delete post.")
        }
    };
    return (
        <div className="group" onClick={onClick}>
            <section className='h-100 rounded-2xl border m-8 bg-white shadow-md overflow-hidden transition-transform duration-500 group-hover:scale-105 flex flex-col cursor-pointer'>
                <div className="aspect-3/4 ">
                    {post.images?.[0] ? 
                    <img src={baseUrl + post.images?.[0]?.image_path} 
                    className="w-full h-full object-cover "/> :
                    <div className="flex h-full items-center justify-center">
                        <span className="font-bold">No Post Image</span>
                    </div>}
                </div>
                <div className="flex flex-1 flex-col justify-between ">
                    <h1 className='text-center'>{post.title}</h1>
                    <button className="bg-[#F2F5EF] p-2 hover:bg-red-700 transition-colors duration-200 group/btn"
                    onClick={handleDeletePost}>
                        <span className="text-center text-[#5D5A88] group-hover/btn:text-white">✕</span>
                    </button>
                    
                </div>
            </section>
        </div>
    )
};

export default Postcard;