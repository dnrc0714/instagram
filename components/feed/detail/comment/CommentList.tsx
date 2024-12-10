'use client'

import { useMutation, useQuery } from "@tanstack/react-query";
import { getComments, saveComment } from "actions/commentActions";
import { useEffect, useState } from "react";
import Comment from "./Comment";

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
            getAllComments.refetch();
            setComment("");
        }
    });

    const getAllComments = useQuery({
        queryKey:["comments", postId],
        queryFn: () => getComments(postId)
    });
    
    return (
        <div>
            {/* 댓글 입력 */}
            <div className="mt-2 flex gap-1">
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="댓글을 입력해주세요"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                />
                <button
                    onClick={() => addCommentMutation.mutate()}
                    className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                    입력
                </button>
            </div>
            <div className="mt-4 space-y-2">
                {
                    getAllComments?.data?.map((comment) => <Comment key={comment?.id} comment={comment}/>)
                }
            </div>
        </div>
    );
}