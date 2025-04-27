import React, { useEffect, useState } from "react";
import axios from "axios";

const Savedpost = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  
  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://vertx-backend.onrender.com/api/getsavedposts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSavedPosts(response.data.savedPosts);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Saved Posts 📝</h1>

      {savedPosts.length === 0 ? (
        <p>No saved posts yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedPosts.map((post) => (
            <div key={post.postId} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">Author: {post.author}</p>
              <p className="text-gray-600">Subreddit: {post.subreddit}</p>
              {post.imageUrl && <img src={post.imageUrl} alt="Post" className="mt-2 rounded" />}
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline block mt-2">
                View Post
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Savedpost;
