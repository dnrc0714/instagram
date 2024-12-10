'use client'

import { useRecoilState } from "recoil";
import { replyingToState } from "utils/recoil/atoms";
import ReplyList from "./reply/ReplyList";


export default function Comment({ comment }) {
    const [replyingTo, setReplyingTo] = useRecoilState(replyingToState); // 현재 답글 입력창이 열려 있는 댓글 ID

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId === replyingTo ? null : commentId); // 답글 입력창 열고 닫기
    };

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
            </div>

            {/* 댓글 본문 */}
            <p className="text-gray-700">{comment.comment}</p>

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