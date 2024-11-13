import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSportsNews } from "../getNews"; // Import the fetchSportsNews function

const HomePage = () => {
  const [news, setNews] = useState([]); // Store fetched news articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch sports news
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNews = await fetchSportsNews(); // Get scraped data from fetchSportsNews
        setNews(fetchedNews); // Update state with the fetched news
      } catch (err) {
        setError("Failed to fetch sports news.");
      } finally {
        setLoading(false); // Set loading to false after the request is done
      }
    };

    fetchData(); // Call the function to fetch the data
  }, []);

  if (loading) {
    return <div className="p-4">Loading news...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Sports News</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-md mb-4"
              />
            )}
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>

            {/* Always display the full description */}
            <p className="text-gray-700 text-sm mb-3">{item.description}</p>

            <div className="flex justify-between items-center">
              <Link
                to={item.link} // Adjust as needed for proper routing
                className="text-blue-600 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
