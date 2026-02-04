const Postlist = ({posts}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 flex-1">
            {posts.map((post) => (
                <section className='h-50 p-4 rounded-2xl border m-8 bg-white shadow-md'>
                    <h1 className=''>{post.title}</h1>
                    <p>{post.content}</p>
                </section>
            ))}
        </div>
    );
};

export default Postlist

