"use client"

import Slider from "react-slick";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";
import LikeButton from "./likeButton";
import TimeAgo from "javascript-time-ago";
import ko from 'javascript-time-ago/locale/ko';

TimeAgo.addLocale(ko);
const timeAgo = new TimeAgo("ko-kr");

export default function UI({ feed }) {
    const loggedUser = useRecoilValue(loggedUserState);    

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(feed?.comments || []);
    
     // 슬라이드 설정
    const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,         // 중앙 정렬
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
        <div className="flex flex-col justify-center">
            <div className="flex items-center p-5">
                <img
                    src={loggedUser?.profile_img_url || '../images/simple_profile_img.png'}
                    alt="creator"
                    className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{loggedUser?.name}</span>
                </div>
            {/* 이미지 슬라이더 */}
            <div className="mx-auto w-full max-w-[300px]">
        <Slider
            {...settings}
        >
            {feed?.attachments.map((attachment) => (
                <div key={attachment.post_seq} className="flex justify-center">
                    <img
                        src={attachment.file_url}
                        alt={`Image ${attachment.post_seq}`}
                        className="w-full h-[300px] object-cover rounded-lg"
                    />
                </div>
            ))}
        </Slider>
    </div>
            {/* 게시물 내용 */}
            <div className="px-6 mt-4">
            <div className="flex items-center justify-end">
                <span className="text-gray-500">{timeAgo.format(Date.parse(feed.created_at))}</span>
            </div>

            <p className="mt-4 text-lg">{feed.content}</p>

            {/* 좋아요, 댓글, 공유 버튼 */}
            <LikeButton postId={feed.id} initialLikes={feed.likes_count?.count || 0} initialLiked={feed?.is_liked || false}/>

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