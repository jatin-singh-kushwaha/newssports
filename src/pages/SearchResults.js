import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const API_KEY = "953d5574b5b3492398349d83ae060fec";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const query = searchParams.get("query") || "";
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      setFilteredNews(data.articles);
      setLoading(false);
    };

    fetchNews();
  }, [searchParams]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {loading ? (
        <p>Loading...</p>
      ) : filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2">{news.title}</h2>
              <span className="text-sm text-gray-500">
                {news.source.name}
              </span>
              <div className="mt-4">
                <p>{news.description}</p>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found for your query.</p>
      )}
    </div>
  );
};

export default SearchResults;
