'use client'

import { feedLike, feedUnLike } from "actions/feedActions";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";


export default function LikeButton({
    postId,
    initialLikes,
    initialLiked
}) {
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLiked);

    const handleLike = async () => {
        if (liked) {
            await feedUnLike(postId);
            setLikesCount(likesCount - 1);
        } else {
            await feedLike(postId);
            setLikesCount(likesCount + 1);
        }
        setLiked(!liked);
    }
    return (
        <div className="flex items-center mt-3 space-x-4">
        <button
            onClick={handleLike}>
                {liked ? (
                    <FaHeart className="text-red-500" size={24} />
                ) : (
                    <FaRegHeart className="text-gray-500" size={24} />
                )}
        </button>
        <span>{liked}{likesCount}</span>
    </div>
    );
}