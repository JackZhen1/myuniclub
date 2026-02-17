import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import Postlist from './components/Postlist'

function App() {
  const [activeTab, setActiveTab] = useState('Posts');

  return (
    <div>
      <Navbar />
      <div className='flex bg-[#f9fafb]'>
        <Sidebar setActiveTab={setActiveTab}/>
        {activeTab === 'Posts' && <Postlist />}
      </div>
    </div>
  );
};

export default App
