import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const extractPreview = (htmlString) => {
  if (!htmlString) return { header: '', paragraph: '', imageUrl: '' };

  const parts = htmlString.trim().split('\n');
  const possibleImageUrl = parts[parts.length - 1].trim();

  const isImage = possibleImageUrl.startsWith('https');

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const firstH1 = doc.querySelector('h1')?.textContent || '';
  let firstParagraph = '';

  // Look for paragraph after h1 or fallback to h2
  if (firstH1) {
    const h1Elem = doc.querySelector('h1');
    let next = h1Elem?.nextElementSibling;
    while (next) {
      if (next.tagName.toLowerCase() === 'p' || next.tagName.toLowerCase() === 'h2') {
        firstParagraph = next.textContent;
        break;
      }
      next = next.nextElementSibling;
    }
  }

  if (!firstParagraph) {
    firstParagraph = doc.querySelector('h2')?.textContent || '';
  }

  return {
    header: firstH1,
    paragraph: firstParagraph,
    imageUrl: isImage ? possibleImageUrl : ''
  };
};

const ViewPageComponent = ({ category }) => {
  const [categoryNews, setCategoryNews] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();
  
  const fetchData = async (url) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(url);
      
      return {
        data: res.data.data,
        pagination: res.data.pagination
      };
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialUrl = `https://blogs.workautomationhub.com/blogs/category/${encodeURIComponent(category)}`;
    fetchData(initialUrl)
      .then(({ data, pagination }) => {
        setCategoryNews(data);
        setPagination(pagination);
      });
  }, [category]);

  const loadMore = async () => {
    if (!pagination?.next_page_url) return;
    
    try {
      // Fix the URL inconsistency by removing /index.php if it exists
      let correctedUrl = pagination.next_page_url;
      if (correctedUrl.includes('/index.php')) {
        correctedUrl = correctedUrl.replace('/index.php', '');
      }
      
      const { data, pagination: newPagination } = await fetchData(correctedUrl);
      
      setCategoryNews(prev => [...prev, ...data]);
      setPagination(newPagination);
    } catch (err) {
      console.error("Error loading more news:", err);
    }
  };

  const handleClick = (newsId) => {
    navigateTo(`/newsdetails/${newsId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {categoryNews?.map((item, index) => {
        const { paragraph } = extractPreview(item.content);

        return (
          <div
            key={`${item.id}-${index}`} // Better key using item.id
            className="p-4 rounded shadow cursor-pointer flex flex-col md:flex-row gap-4 border border-gray-200"
            onClick={() => handleClick(item.newsId || item.id)}
          >
            <img 
              src={item.image} 
              alt="thumbnail" 
              className="w-full md:w-40 h-40 object-cover rounded-md" 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/160';
              }}
            />
            <div>
              <p className="text-sm text-white bg-[#E11A68] inline-block px-2 py-1 rounded mb-1">
                {item.categeory}
              </p>
              <h1 className="text-xl font-semibold mt-1">{item.title}</h1>
              {paragraph && <p className="mt-1 text-sm text-gray-700">{paragraph}</p>}
              <p className="text-xs text-gray-400 mt-2">👁️ 8.5K ❤️ 3.2K ⏱ 1h ago</p>
            </div>
          </div>
        );
      })}

      {pagination?.next_page_url && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 bg-[#E11A68] text-white rounded hover:bg-[#c9165a] disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {loading && !categoryNews.length && (
        <div className="text-center py-4">Loading initial data...</div>
      )}
    </div>
  );
};

export default ViewPageComponent;