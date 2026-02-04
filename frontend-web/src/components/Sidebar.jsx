const Sidebar = ({ setActiveTab }) => {
    const menuItems = [
        {name: 'Dashboard', disabled: true},
        {name: 'Posts', disabled: false},
        {name: 'Members', disabled: true},
        {name: 'Settings', disabled: true},
    ]
    return (
        <aside className="w-30 h-screen flex flex-col items-center shadow-sm bg-[#78977C] ">
            {menuItems.map((item) => (
                <button className={`w-full py-8 border-b border-gray-50 text-white hover:bg-[#658068]
                    ${item.disabled
                        ? 'opacity-50' : 'cursor-pointer'}
                `}
                key={item.name}
                disabled={item.disabled}
                onClick={()=> !item.disabled && setActiveTab(item.name) }
                >{item.name}</button>
            ))}
        </aside>        
    );
};
export default Sidebar;