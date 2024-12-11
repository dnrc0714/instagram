"use client"

import { useRecoilState, useRecoilValue } from "recoil";
import { loggedUserState, replyingToState } from "utils/recoil/atoms";
import ReplyList from "./reply/ReplyList";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import { deleteComment, updateComment } from "actions/commentActions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import { FiArrowDown } from "react-icons/fi";
import TimeAgo from "javascript-time-ago";
import ko from 'javascript-time-ago/locale/ko';

TimeAgo.addLocale(ko);
const timeAgo = new TimeAgo("ko-kr");


export default function Comment({ comment }) {
    const loggedInUser = useRecoilValue(loggedUserState);
    const [newComment, setUpdateComment] = useState(comment.comment);
    const [replyingTo, setReplyingTo] = useRecoilState(replyingToState); // 현재 답글 입력창이 열려 있는 댓글 ID
    const [hovered, setHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId === replyingTo ? null : commentId); // 답글 입력창 열고 닫기
    };

    const updateCommentMutation = useMutation({
        mutationFn: () => 
            updateComment({comment:newComment, id:comment.id}),
        onSuccess: () => {
                queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
            setIsEditing(false);
        },
        onMutate: () => setIsEditing(false)
    });

    const deleteCommentMutation = useMutation({
        mutationFn: () => 
            deleteComment(comment.id),
        onSuccess: () => {
                queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

    return (
        <div className="p-4 border-b border-gray-200 flex flex-col space-y-3">
            {/* 댓글 헤더 */}
            <div className="flex items-center space-x-3">
                <img
                    src={comment.profile?.profile_img_url || '../images/simple_profile_img.png'}
                    alt={comment.profile?.name}
                    className="w-8 h-8 rounded-full"
                />
                <p className="font-semibold text-gray-800">{comment.profile?.name}</p>
                <p className="text-xs text-gray-500">{timeAgo.format(Date.parse(comment.modified_at))}</p>
            </div>

            {/* 댓글 본문 */}
            <div
                className="relative p-1 border rounded-md hover:bg-gray-300 transition"

                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {!isEditing ? (
                    <p className="text-gray-700">{comment.comment}</p>
                ) : 
                    <input type="text" onChange={(e) => setUpdateComment(e.target.value)} value={newComment}/>
                }
                
                {(hovered && (loggedInUser?.id == comment.posts.creator_id || loggedInUser?.id == comment.creator_id)) && (
                    <div className="absolute top-2 right-2 flex space-x-2">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-gray-500 hover:text-blue-500"
                                title="수정"
                            >
                                <FaEdit size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={async () => {await updateCommentMutation.mutate()}}
                                className="text-gray-500 hover:text-blue-500"
                                title="완료"
                            >
                                <FiArrowDown size={16} />
                            </button>
                        )}
                        <button
                            onClick={async () => {await deleteCommentMutation.mutate()}}
                            className="text-gray-500 hover:text-red-500"
                            title="삭제"
                        >
                            <FaTrash size={16} />
                        </button>
                    </div>
                )}
            </div>
            

            {/* 답글 버튼 */}
            <button
                className="text-blue-500 hover:underline text-sm"
                onClick={() => handleReplyClick(comment.id)}
            >
                {replyingTo === comment.id ? 'Cancel Reply' : 'Reply'}
            </button>
            <ReplyList parentId={comment.id} postId={comment.post_id}/>
        </div>
    );
}