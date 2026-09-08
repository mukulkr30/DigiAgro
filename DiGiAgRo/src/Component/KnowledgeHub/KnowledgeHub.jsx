
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import ReaderCard from "./ReaderCard";

export default function KnowledgeHub() {
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKnowledgeData = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem("token");

                const baseUrl =
                    import.meta.env.VITE_KNOWLEDGE_HUB_API_URL;

                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };

                const [articleResponse, videoResponse] =
                    await Promise.all([
                        fetch(`${baseUrl}/get_articles`, {
                            method: "GET",
                            headers,
                        }),

                        fetch(`${baseUrl}/get_videos`, {
                            method: "GET",
                            headers,
                        }),
                    ]);

                if (!articleResponse.ok) {
                    throw new Error("Failed to fetch articles");
                }
                else{
                    console.log("successfully articles fetched")
                }
                if (!videoResponse.ok) {
                    throw new Error("Failed to fetch videos");
                }
                else{
                    console.log("successfully videoes fetched")
                }
                const articleData = await articleResponse.json();
                const videoData = await videoResponse.json();

                // Only keep required fields
                setArticles(
                    articleData.map((article) => ({
                        id: article.id,
                        title: article.title,
                        content: article.content,
                        category: article.category,
                        source_url: article.source_url,
                        created_at: article.created_at,
                        image_url: article.image_url,
                    }))
                );

                setVideos(
                    videoData.map((video) => ({
                        id: video.id,
                        title: video.title,
                        content: video.content,
                        category: video.category,
                        source_url: video.source_url,
                        created_at: video.created_at,
                        image_url: video.image_url,
                    }))
                );

            } catch (error) {
                console.error("Knowledge Hub error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchKnowledgeData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-lg font-semibold">
                    Loading Knowledge Hub...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-red-500 font-semibold">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h1 className="text-3xl font-bold text-center mb-8">
                📚 Knowledge Hub
            </h1>

            {/* Articles */}
            <h2 className="text-2xl font-semibold mb-4">
                📖 Read Articles
            </h2>

            {articles.length === 0 ? (
                <p className="text-gray-500 mb-8">
                    No articles available.
                </p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {articles.map((article) => (
                        <ReaderCard
                            key={article.id}
                            title={article.title}
                            content={article.content}
                            category={article.category}
                            source_url={article.source_url}
                            created_at={article.created_at}
                            image_url={article.image_url}
                        />
                    ))}
                </div>
            )}

            {/* Videos */}
            <h2 className="text-2xl font-semibold mb-4">
                🎥 Learn with Videos
            </h2>

            {videos.length === 0 ? (
                <p className="text-gray-500">
                    No videos available.
                </p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            title={video.title}
                            content={video.content}
                            category={video.category}
                            source_url={video.source_url}
                            created_at={video.created_at}
                            image_url={video.image_url}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

