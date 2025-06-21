
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ViewPageComponent from './ViewPageComponent';
import PIC from '../../assets/prabhash.jpg';
import { useNavigate } from 'react-router-dom';

const Categeory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [groupedNews, setGroupedNews] = useState({});
  const navigateTo = useNavigate();
  
  const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Inside your component
const [trendingNews, setTrendingNews] = useState([]);
const [editorsPicks, setEditorsPicks] = useState([]);

useEffect(() => {
  const loadShuffledNews = () => {
    const now = new Date().getTime();
    const storedData = localStorage.getItem('shuffledNewsData');
    
    // Check if stored data exists and is less than 1 hour old
    if (storedData) {
      const { timestamp, trending, editors } = JSON.parse(storedData);
      if (now - timestamp < 3600000) { // 1 hour in milliseconds
        setTrendingNews(trending);
        setEditorsPicks(editors);
        return;
      }
    }

    // Generate fresh shuffle if no valid stored data
    const allNewsItems = Object.values(groupedNews).flat();
    const shuffledNews = shuffleArray(allNewsItems);
    const newTrending = shuffledNews.slice(0, 3);
    const newEditors = shuffledNews.slice(3, 6);

    // Update state and localStorage
    setTrendingNews(newTrending);
    setEditorsPicks(newEditors);
    localStorage.setItem('shuffledNewsData', JSON.stringify({
      timestamp: now,
      trending: newTrending,
      editors: newEditors
    }));
  };

  if (Object.keys(groupedNews).length > 0) {
    loadShuffledNews();
  }
}, [groupedNews]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://blogs.workautomationhub.com/get-blogs');

      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(
        response.data.map(item =>
          item.category
            .replace(/_/g, ' ')
            .replace(/(^\w|\s\w)/g, m => m.toUpperCase())
        )
      )];

      setCategories(uniqueCategories.map((category, index) => ({
        id: index + 1,
        title: category
      })));

      // Group news by category (max 3 per category)
      const grouped = {};
      response.data.forEach((item) => {
        const category = item.category;
        if (!grouped[category]) {
          grouped[category] = [];
        }
        if (grouped[category].length < 3) {
          grouped[category].push(item);
        }
      });
      setGroupedNews(grouped);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleClick = (newsId) =>{
    navigateTo(`/newsdetails/${newsId}`);
  }

  return (
    <div className="px-4 md:px-8 mt-8 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6 ">
        {categories.map((eachObject) => (
          <button key={eachObject.id} onClick={() => setSelectedCategory(eachObject.title)}
            className={`${
              selectedCategory === eachObject.title
                ? 'bg-[#E11A68] text-white'
                : 'bg-[#FFF0F5] text-[#E11A68]'
            } font-[montserrat] px-6 py-1 rounded-xl font-semibold text-sm lg:text-base `}
          >
            {eachObject.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full">
          <h2 className="font-bold text-xl lg:text-2xl mb-6">Top Stories</h2>

          {selectedCategory === 'All' ? (
            Object.keys(groupedNews).map((category, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-white bg-gray-800 p-4 rounded capitalize">
                  {category.replace(/_/g, ' ')}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {groupedNews[category].map((newsItem, idx) => (
                    <div key={newsItem.id} className="border border-gray-200 rounded-lg p-4 shadow flex flex-col md:flex-row items-center gap-3 lg:gap-4 cursor-pointer" onClick={()=>handleClick(newsItem.id)}>
                      <img 
                        src={newsItem.image || PIC} 
                        className="w-full md:w-40 h-40 object-fit rounded-md" 
                        alt={newsItem.title}
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{newsItem.title}</h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{newsItem.description}</p>
                        <p className="text-xs text-gray-400 mt-2">👁️ 8.5K ❤️ 3.2K ⏱ 1h ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2 text-[#E11A68] capitalize">
                {selectedCategory.replace(/_/g, ' ')}
              </h2>
              <ViewPageComponent 
                category={selectedCategory === 'All' ? null : selectedCategory.toLowerCase().replace(/\s/g, '_')} 
              />
            </>
          )}
        </div>
        
        {/* Right sidebar content remains unchanged */}
        <div className='w-full lg:w-1/3'>
          <div className=' lg:border lg:border-gray-300 rounded-xl p-4'>
      <h2 className='text-xl font-semibold mb-4'>Trending Now</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-2'>
          {trendingNews.map((news, index) => (
          <div key={index} className='flex items-center gap-3 md:gap-2  mb-2 shadow p-4 rounded-lg'>
            <img 
              src={news.image || PIC} 
              className='w-20 h-24 object-cover rounded-md' 
              alt={news.title} 
            />
            <div>
              <h1 className="text-sm font-semibold mt-2">{news.title}</h1>
              <p className='text-xs text-gray-500 mt-1'>
                ⏱️ {news.time || "2 hrs"} ago    👁 {news.views || "1.2M"} views
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Editor's Picks Block */}
    <div className='mt-4 lg:border lg:border-gray-300 rounded-xl p-4'>
      <h2 className='text-xl font-semibold mb-4'>Editor's Picks</h2>
      <div className='grid grid-cols-1 lg:grid-cols-1'>
        {editorsPicks.map((news, index) => (
        <div key={index} className='flex items-center gap-3 md:gap-2 px-4 mb-2 shadow p-4 rounded-lg'>
          <img 
            src={news.image || PIC} 
            className='w-20 h-24 object-cover rounded-md' 
            alt={news.title} 
          />
          <div>
            <h1 className="text-sm font-semibold mt-2">{news.title}</h1>
            <p className='text-xs text-gray-500 mt-1'>
              ⏱️ {news.time || "2 hrs"} ago    👁 {news.views || "1.2M"} views
            </p>
          </div>
        </div>
      ))}
      </div>
    </div>
          <div className='mt-2 md:mt-4 lg:border lg:border-gray-300 rounded-xl p-4'>
            <h3 className='text-sm md:text-base lg:text-xl font-medium lg:font-semibold'>Stay Updated</h3>
            <p className='text-xs md:text-base lg:text-sm my-2 lg:my-0 lg:mb-2'>Get the latest news in your inbox every day</p>
              <div className='relative w-full md:w-1/2 lg:w-full max-w-md'>
              <input
                type='text'
                placeholder='Enter your email'
                className='w-full p-2 pr-24 border border-gray-300 rounded-lg'
              />
              <button className='absolute right-1 top-1 bottom-1 px-4 text-[#E11A68] rounded-lg text-sm font-medium'>
                Subscribe
              </button>
            </div>
          </div>
          <div className='mt-2 md:mt-4 lg:border lg:border-gray-300 rounded-xl p-4'>
            <h3 className='text-xl font-semibold mb-2'>Popular Tags</h3>
              <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 w-1/2 lg:w-full'>
                  <p className='text-sm text-gray-600'>#WorldCup</p>
                  <p className='text-sm text-gray-600'>#Budget2025</p>
                  <p className='text-sm text-gray-600'>#TechTrends</p>
                  <p className='text-sm text-gray-600'>#Health</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categeory;
