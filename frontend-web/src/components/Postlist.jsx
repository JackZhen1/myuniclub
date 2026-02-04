const Postlist = ({posts}) => {
    return (
        <div>
            {posts.map((post) => (
                <section className='p-4 rounded-2xl border m-8'>
                <h1 className=''>{post.title}</h1>
                <p>{post.content}</p>
                </section>
            ))}
        </div>
    );
};

export default Postlist

