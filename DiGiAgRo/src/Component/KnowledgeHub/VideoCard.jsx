import React from "react";
import defaultVideoImg from "../../assets/orgfart.png";

function getYouTubeThumbnail(url) {
    if (!url) return null;
    const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export default function VideoCard({
    title,
    content,
    category,
    source_url,
    created_at,
    image_url,
}) {
    const videoThumb = getYouTubeThumbnail(source_url) || image_url || defaultVideoImg;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="relative">
                <img
                    src={videoThumb}
                    alt={title}
                    onError={(e) => {
                        e.target.src = defaultVideoImg;
                    }}
                    className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/35 transition">
                    <span className="text-white text-3xl drop-shadow-md">▶</span>
                </div>
            </div>

            <div className="p-5">
                <span className="text-sm text-purple-600 font-semibold uppercase">
                    {category}
                </span>

                <h3 className="text-xl font-bold mt-1 mb-2 line-clamp-1">
                    {title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {content}
                </p>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                        {new Date(created_at).toLocaleDateString()}
                    </span>
                    {source_url && (
                        <a
                            href={source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 font-medium hover:underline"
                        >
                            Watch Video →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}