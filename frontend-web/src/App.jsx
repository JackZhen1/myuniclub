import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import Postlist from './components/Postlist'

function App() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('Posts');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/posts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error){
        console.error("Failed to fetch posts.")
      }
    }
    
    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='flex bg-[#f9fafb]'>
        <Sidebar setActiveTab={setActiveTab}/>
        {activeTab === 'Posts' && 
        
        <Postlist posts = {posts} isLoading = {isLoading}/>}
      </div>
      
      
    </div>
  );
};

export default App
