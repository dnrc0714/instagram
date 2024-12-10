'use client'

import { useEffect, useState } from "react";
import Reply from "./Reply";
import { getReplies, saveReply } from "actions/commentActions";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { replyingToState } from "utils/recoil/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function ReplyList({parentId, postId}) {
    const [replyText, setReplyText] = useState(""); // 답글 내용
    const replyingTo = useRecoilValue(replyingToState);
    const resetReplyText = useResetRecoilState(replyingToState); // 초기화 훅
    
    const addReplyMutation = useMutation({
        mutationFn: () => {
            if (!replyText || replyText.trim() === "") {
                alert("답글을 입력해주세요.");
                return; // 빈 댓글을 보내지 않도록 리턴
            }
            return saveReply({ comment: replyText, postId, parentId });
        },
        onSuccess: () => {
            getAllReplies.refetch();
            setReplyText("");
            resetReplyText();
        }
    });

    const getAllReplies = useQuery({
        queryKey:["comments", {postId, parentId}],
        queryFn: () => getReplies({postId, parentId})
    });

    return (
        <div>
            {replyingTo === parentId && (
                <div className="mt-1 flex items-center justify-between">
                <textarea
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                    onClick={() => addReplyMutation.mutate()}
                    className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                    입력
                </button>
            </div>
            )}
            {/* 대댓글 목록 */}
            <div className="mt-4 space-y-3 pl-10">
                {getAllReplies.data?.map((reply) => (
                    <Reply key={reply?.id} reply={reply}/>
                ))}
            </div>
        </div>
    );
}