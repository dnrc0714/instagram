'use client'

import { feedLike, feedUnLike } from "actions/FeedActions";
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
            console.log(postId);
            // 좋아요 취소 (DB에서 삭제)
            await feedUnLike(postId);
            setLikesCount(likesCount - 1);
        } else {
            console.log(postId);
            // 좋아요 추가 (DB에서 삽입)
            await feedLike(postId);
            setLikesCount(likesCount + 1);
        }
        setLiked(!liked);
    }
    return (
        <div className="flex items-center mt-6 space-x-4">
        <button
            onClick={handleLike}>
                {liked ? (
                    <FaHeart className="text-red-500" size={24} />
                ) : (
                    <FaRegHeart className="text-gray-500" size={24} />
                )}
        </button>
        <span>{liked} ({likesCount})</span>
    </div>
    );
}