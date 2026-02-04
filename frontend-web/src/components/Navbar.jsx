import logo from '../assets/logo.jpg'

const Navbar = () => {
    return(
        <nav className="flex justify-between px-4 py-4 bg-[#fefff9] shadow-sm">
            <div>
                <a href="/">
                    <img src={logo} alt='logo' className='h-10 w-auto'></img>
                </a>
            </div>

            <div className='flex items-center gap-3'>
                <img 
                src={logo} 
                alt="user's logo" 
                className="w-10 h-10 rounded-full border-2 border-gray-600"/>
                <span className='text-gray-800'>myuniclub</span>
            </div>
        </nav>
    );
};

export default Navbar;