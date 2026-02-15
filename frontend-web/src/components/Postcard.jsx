const Postcard = ({post}) => {
    const baseUrl = "http://localhost:8000/storage/";
    return (
        <div className="group">
            <section className='h-100 rounded-2xl border m-8 bg-white shadow-md overflow-hidden transition-transform duration-500 group-hover:scale-105'>
            <div className="aspect-3/4 ">
                <img src={baseUrl + post.images?.[0]?.image_path} 
                className="w-full h-full object-cover "/>
            </div>
            <div className="flex justify-center h-full">
                <h1 className=''>{post.title}</h1>
            </div>
        </section>
        </div>
        
    )
};

export default Postcard;