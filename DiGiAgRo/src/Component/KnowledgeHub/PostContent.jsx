import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "article",
    source_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({
        text: "Please log in as an admin to publish content.",
        type: "error",
      });
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.category ||
      !formData.source_url.trim()
    ) {
      setMessage({
        text: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    const baseUrl =
      import.meta.env.VITE_ADMIN_API_URL ||
      (import.meta.env.VITE_KNOWLEDGE_HUB_API_URL
        ? import.meta.env.VITE_KNOWLEDGE_HUB_API_URL.replace("/knowledgehub", "/admin")
        : "http://127.0.0.1:8000/api/admin");

    try {
      const response = await fetch(`${baseUrl}/create_content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(),
          category: formData.category,
          source_url: formData.source_url.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({
          text: "Content published successfully!",
          type: "success",
        });
        setFormData({
          title: "",
          content: "",
          category: "article",
          source_url: "",
        });
        setTimeout(() => {
          navigate("/Knowledgehub");
        }, 1500);
      } else {
        const errorDetail =
          result.detail && typeof result.detail === "string"
            ? result.detail
            : Array.isArray(result.detail)
            ? result.detail.map((d) => d.msg).join(", ")
            : "Failed to create content";
        setMessage({ text: errorDetail, type: "error" });
      }
    } catch (err) {
      console.error("Error creating content:", err);
      setMessage({
        text: "Network error. Unable to reach the server.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Publish Knowledge Hub Content
        </h2>

        {message.text && (
          <div
            className={`p-4 mb-6 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none bg-white"
            >
              <option value="article">📖 Article</option>
              <option value="video">🎥 Video</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Content Title
            </label>
            <input
              type="text"
              name="title"
              maxLength={150}
              placeholder="e.g. Modern Drip Irrigation Techniques"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Article Content / Video Description
            </label>
            <textarea
              rows="6"
              name="content"
              placeholder="Write the full content or video summary..."
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 resize-none focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* Source URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Source URL
            </label>
            <input
              type="url"
              name="source_url"
              placeholder="https://example.com/article or https://youtube.com/watch?v=..."
              value={formData.source_url}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Publishing..." : "Publish Content"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostContent;