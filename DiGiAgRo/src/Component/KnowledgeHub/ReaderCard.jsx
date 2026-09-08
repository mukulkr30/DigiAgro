import React from "react";
import defaultArticleImg from "../../assets/irigation.png";

export default function ReaderCard({
    title,
    content,
    category,
    source_url,
    created_at,
    image_url,
}) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img
                src={image_url || defaultArticleImg}
                alt={title}
                onError={(e) => {
                    e.target.src = defaultArticleImg;
                }}
                className="w-full h-44 object-cover"
            />
            <div className="p-5">
                <span className="text-sm text-blue-600 font-semibold uppercase">
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
                            className="text-blue-500 font-medium hover:underline"
                        >
                            Read More →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}