"use client"

import LikeButton from "../../../components/feed/detail/LikeButton";
import FeedContent from "components/feed/detail/Content";
import CommentList from "components/feed/detail/comment/CommentList";


export default function UI({ feed }) {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            {/* 작성자INFO, 이미지 슬라이더, 게시물 내용 */}
            <FeedContent feed={feed}/>

            {/* 좋아요, 댓글, 공유 버튼 */}
            <LikeButton postId={feed.id} initialLikes={feed.likes_count || 0} initialLiked={feed?.is_liked || false}/>

            {/* 댓글 입력, 댓글 목록, 답글 입력, 답글 목록 */}
            <CommentList postId={feed.id}/>
            
        </div>
        );
    }