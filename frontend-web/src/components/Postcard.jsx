const Postcard = ({post, onClick, onDelete}) => {
    const baseUrl = "http://localhost:8000/storage/";
    
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(post.id);
    };

    return (
        <div className="group" onClick={onClick}>
            <section className='h-100 rounded-2xl border bg-white shadow-md overflow-hidden transition-transform duration-500 group-hover:scale-105 flex flex-col cursor-pointer'>
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
                    onClick={handleDeleteClick}>
                        <span className="text-center text-[#5D5A88] group-hover/btn:text-white">✕</span>
                    </button>
                </div>
            </section>
        </div>
    )
};

export default Postcard;