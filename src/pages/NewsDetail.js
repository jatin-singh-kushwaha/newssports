import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams(); // Get the article ID from the route
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "953d5574b5b3492398349d83ae060fec"; // Replace with your NewsAPI key

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${id}&apiKey=${apiKey}`
        );
        const data = await response.json();
        
        if (data.status === "ok" && data.articles.length > 0) {
          const article = data.articles[0]; // Use the first article for now
          setArticle({
            title: article.title,
            content: article.content,  // Use content for full article text
            description: article.description, // Short description
            sport: article.source.name,
            fullArticleUrl: article.url,
            imageUrl: article.urlToImage,  // Add the image URL
          });
        } else {
          setError("Article not found.");
        }
      } catch (error) {
        setError("Failed to fetch article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-4">
        <p>Article not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <p className="text-gray-700 mb-4">{article.description}</p>
      <p className="text-gray-700 mb-4">{article.content}</p>
      <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded">
        {article.sport}
      </span>
      <div className="mt-6">
        <a
          href={article.fullArticleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Read Full Article
        </a>
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NewsDetail;
