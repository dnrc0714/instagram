"use client"

import Slider from "react-slick";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";
import LikeButton from "../../../components/feed/detail/LikeButton";
import FeedContent from "components/feed/detail/Content";
import { getComments } from "actions/commentActions";
import { useQuery } from "@tanstack/react-query";
import CommentList from "components/feed/detail/comment/CommentList";


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
            {/* 작성자INFO, 이미지 슬라이더, 게시물 내용 */}
            <FeedContent feed={feed}/>

            {/* 좋아요, 댓글, 공유 버튼 */}
            <LikeButton postId={feed.id} initialLikes={feed.likes_count || 0} initialLiked={feed?.is_liked || false}/>

            {/* 댓글 입력, 댓글 목록, 답글 입력, 답글 목록 */}
            <CommentList postId={feed.id}/>
            
        </div>
        );
    }