'use client'

import { useMutation } from "@tanstack/react-query";
import { deleteComment, updateComment } from "actions/commentActions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiArrowDown } from "react-icons/fi";
import TimeAgo from "javascript-time-ago";
import ko from 'javascript-time-ago/locale/ko';
import { useRecoilValue } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";

TimeAgo.addLocale(ko);
const timeAgo = new TimeAgo("ko-kr");

export default function Reply({ reply }) {
    const loggedInUser = useRecoilValue(loggedUserState);
    const [newReply, setUpdateReply] = useState(reply.comment);
    const [isEditing, setIsEditing] = useState(false);
    const [hoveredReply, setHoveredReply] = useState(false);

    const updateReplyMutation = useMutation({
        mutationFn: () => 
            updateComment({comment:newReply, id:reply.id}),
        onSuccess: () => {
                queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
            setIsEditing(false);
        },
    });

    const deleteReplyMutation = useMutation({
        mutationFn: () => 
            deleteComment(reply.id),
        onSuccess: () => {
                queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
        },
    });

    return (
        <div 
            className="w-full border rounded-md border-gray-200 flex flex-col space-y-3 p-1 hover:bg-gray-300 transition"
            onMouseEnter={() => setHoveredReply(true)}
            onMouseLeave={() => {setHoveredReply(false);  setIsEditing(false);}}
        >
            <div className="flex items-center space-x-3">
                <img
                    src={reply.profile?.profile_img_url || '../images/simple_profile_img.png'}
                    alt={reply.profile.name}
                    className="w-6 h-6 rounded-full"
                />
                <p className="font-semibold text-gray-800">{reply.profile.name}</p>
                <p className="text-xs text-gray-500">{timeAgo.format(Date.parse(reply.modified_at))}</p>
            </div>
            <div className="flex items-center justify-between">

            {!isEditing ? (
                <p className="text-gray-700">{reply.comment}</p>
            ) : 
                <input type="text" onChange={(e) => setUpdateReply(e.target.value)} value={newReply} className="w-48"/>
            }

            {(hoveredReply && (loggedInUser?.id == reply.posts.creator_id || loggedInUser?.id == reply.creator_id)) && (
                <div className="top-2 right-2 flex space-x-2">
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
                            onClick={async () => {await updateReplyMutation.mutate()}}
                            className="text-gray-500 hover:text-blue-500"
                            title="완료"
                        >
                            <FiArrowDown size={16} />
                        </button>
                    )}
                    <button
                        onClick={async () => {await deleteReplyMutation.mutate()}}
                        className="text-gray-500 hover:text-red-500"
                        title="삭제"
                    >
                        <FaTrash size={16} />
                    </button>
                </div>
            )}
            </div>
        </div>
    );
}