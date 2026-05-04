import React from 'react'
import VideoCard from './VideoCard';
import ReaderCard from './ReaderCard';
import { videoData,articleData } from '../../utils/knowledgedata';

export default function KnowledgeHub() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold text-center mb-8">
            📚 Knowledge Hub
        </h1>

            {/* 📖 Article Section */}
        <h2 className="text-2xl font-semibold mb-4">📖 Read Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
            {articleData.map((article) => (
            <ReaderCard key={article.id} {...article} />
            ))}
        </div>

        {/* 🎥 Video Section */}
        <h2 className="text-2xl font-semibold mb-4">🎥 Learn with Videos</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
            {videoData.map((video) => (
            <VideoCard key={video.id} {...video} />
            ))}
        </div>

    </div>
  );
}