'use client'

import { useMutation, useQuery } from "@tanstack/react-query";
import { getComments, saveComment } from "actions/commentActions";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { FiArrowUp } from "react-icons/fi";
import { queryClient } from "config/ReactQueryClientProvider";

export default function CommentList({postId}) {
    const [comment, setComment] = useState("");

    const addCommentMutation = useMutation({
        mutationFn: () => {
            if (!comment || comment.trim() === "") {
                alert("댓글을 입력해주세요.");
                return;
            }
            return saveComment({comment, postId});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments"],
            });
            setComment("");
        }
    });

    const getAllComments = useQuery({
        queryKey:["comments", postId],
        queryFn: () => getComments(postId)
    });
    
    return (
        <div className="w-80">
            {/* 댓글 입력 */}
            <div className="mt-3 flex items-center justify-between gap-1">
                <input
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="댓글을 입력해주세요."
                    className="w-full p-1 h-9 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={() => addCommentMutation.mutate()}
                    className=" bg-blue-500 text-white rounded-lg"
                >
                <FiArrowUp className="w-9 h-9" />
                </button>
            </div>
            <div className="mt-3 space-y-2">
                {
                    getAllComments?.data?.map((comment) => <Comment key={comment?.id} comment={comment}/>)
                }
            </div>
        </div>
    );
}