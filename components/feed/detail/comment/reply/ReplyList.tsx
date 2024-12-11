'use client'

import { useEffect, useState } from "react";
import Reply from "./Reply";
import { getReplies, saveReply } from "actions/commentActions";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { replyingToState } from "utils/recoil/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FiArrowUp } from "react-icons/fi";

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
                <div className="mt-1 flex items-center justify-between gap-1">
                    <input
                        type="text"
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="답글을 입력해주세요."
                        className="w-full p-1- h9 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={() => addReplyMutation.mutate()}
                        className=" bg-blue-500 text-white rounded-lg"
                    >
                    <FiArrowUp className="w-9 h-9" />
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