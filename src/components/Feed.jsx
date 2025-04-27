import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Reddit posts
    const fetchRedditPosts = async () => {
      try {
        const response = await fetch("https://www.reddit.com/r/all/top.json?limit=100");
        const data = await response.json();
        const postsData = data.data.children.map(post => ({
          id: post.data.id,
          title: post.data.title,
          url: post.data.url,
          author: post.data.author,
          subreddit: post.data.subreddit,
          imageUrl: post.data.thumbnail,
        }));
        setPosts(postsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Reddit posts:", err);
        setLoading(false);
      }
    };

    fetchRedditPosts();
  }, []);

  const handleSave = async (post) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        alert("Please login first!");
        return;
      }
  
      await axios.post(
        "http://localhost:5000/api/savepost",
        {
          postId: post.id,
          title: post.title,
          url: post.url,
          author: post.author,
          subreddit: post.subreddit,
          imageUrl: post.imageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      alert("Post Saved Successfully! 🎉");
    } catch (error) {
      console.error("Error saving post:", error.response?.data || error.message);
      alert("Failed to save post 😞");
    }
  };

  // Function to handle the Copy Link button
  const handleCopyLink = async (post) => {
    try {
      // Copy the post URL to the clipboard
      await navigator.clipboard.writeText(post.url);

      const token = localStorage.getItem('token');

      if (!token) {
        alert("Please login first!");
        return;
      }

      // Send a request to the backend to increase the user's credits
      await axios.post(
        "http://localhost:5000/api/share-post", // The backend API to update credits
        {
          postId: post.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Link copied! Your credits have been updated.");
    } catch (error) {
      console.error("Error copying link and updating credits:", error.response?.data || error.message);
      alert("Failed to copy link.");
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Trending Posts from Reddit</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img
                src={post.imageUrl && post.imageUrl.startsWith('http') ? post.imageUrl : "https://picsum.photos/300/200"}
                className="w-80 h-60 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 truncate">{post.title}</h3>
                <p className="text-sm text-gray-500 mt-1">By {post.author}</p>
                <p className="text-sm text-gray-400 mt-1 mb-4">Subreddit: {post.subreddit}</p>

                <div className="mt-auto">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:text-blue-800 mb-2"
                  >
                    Read More
                  </a>
                  <button
                    onClick={() => handleSave(post)}
                    className="w-full bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-2"
                  >
                    Save Post
                  </button>
                  <button
                    onClick={() => handleCopyLink(post)}
                    className="w-full bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-2"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
