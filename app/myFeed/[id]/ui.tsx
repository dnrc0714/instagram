"use client"

import Slider from "react-slick";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";

export default function UI({ feed }) {
    TimeAgo.addDefaultLocale(ko);

    const timeAgo = new TimeAgo("ko-kr");
    
    const loggedUser = useRecoilValue(loggedUserState);
    
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(feed?.comments || []);
    
     // 슬라이드 설정
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    };

    // 좋아요 버튼 클릭 핸들러
    const handleLike = () => {
    setLiked((prevLiked) => !prevLiked);
    };

    // 댓글 입력 핸들러
    const handleCommentChange = (e) => {
    setComment(e.target.value);
    };

    // 댓글 추가 핸들러
    const handleAddComment = () => {
    if (comment.trim()) {
        setComments((prevComments) => [
        ...prevComments,
        { user: "Current User", content: comment },
        ]);
        setComment("");
    }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            {/* 이미지 슬라이더 */}
            <Slider {...settings}>
            {feed?.attachments.map((attachment) => (
                <div key={attachment.post_seq}>
                <img
                    src={attachment.file_url}
                    alt={`Image ${attachment.post_seq}`}
                    className="w-full h-auto rounded-lg"
                />
                </div>
            ))}
            </Slider>

            {/* 게시물 내용 */}
            <div className="px-6 mt-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                <img
                    src={loggedUser?.profile_img_url || '../images/simple_profile_img.png'}
                    alt="creator"
                    className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{loggedUser?.name}</span>
                </div>
                <span className="text-gray-500">{timeAgo.format(Date.parse(feed.created_at))}</span>
            </div>

            <p className="mt-4 text-lg">{feed.content}</p>

            {/* 좋아요, 댓글, 공유 버튼 */}
            <div className="flex items-center mt-6 space-x-4">
                <button onClick={handleLike}>
                {liked ? (
                    <FaHeart className="text-red-500" size={24} />
                ) : (
                    <FaRegHeart className="text-gray-500" size={24} />
                )}
                </button>
                <FaComment className="text-gray-500" size={24} />
            </div>

            {/* 댓글 입력 */}
            <div className="mt-6">
                <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                />
                <button
                onClick={handleAddComment}
                className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                Post
                </button>
            </div>

            {/* 댓글 목록 */}
            <div className="mt-4 space-y-2">
                {comments.map((comment, index) => (
                <div key={index} className="flex space-x-2">
                    <span className="font-semibold">{comment?.user}</span>
                    <span>{comment?.content}</span>
                </div>
                ))}
            </div>
            </div>
        </div>
        );
    }