'use client'

import Person from "./Person";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "utils/recoil/atoms";
import { getAllMessages, sendMessage } from "actions/chatActions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";

export default function ChatScreen() {
    const selectedUser = useRecoilValue(selectedUserState);
    const  [message, setMessage] = useState("");

    const sendMessageMutation = useMutation({
        mutationFn: async () => {
            return sendMessage({
                message:message,
                chatUserId: selectedUser.id
            })
        },
        onSuccess: () => {
            setMessage("");
            getAllMessagesQuery.refetch();
        }
    });

    const getAllMessagesQuery = useQuery({
        queryKey: ['mesages', selectedUser],
        queryFn: () => getAllMessages({ chatUserId: selectedUser?.id }),
    });

    return selectedUser !== null? (
        <div className="w-full h-screen flex flex-col">
            {/* Active 유저 영역 */}
            <Person
            onlineAt={new Date().toISOString()}
            isActive={selectedUser}
            onChatScreen={true}
            name={selectedUser.name}
            profileImgUrl={selectedUser.profileImgUrl}
            />
            {/* 채팅 영역 */}
            <div className="w-full overflow-y-scroll flex-1 flex flex-col p-3 gap-3">
            {
                //TODO
                getAllMessagesQuery.data?.map((message) => 
                <Message
                    key={message.id}
                    message={message.message}
                    isFromMe={message.receiver === selectedUser.id}
                />
                )
            }
            </div>

            {/* 채팅창 영역 */}
            <div className="flex">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-3 w-full border-2 border-light-blue-300"
                    placeholder="메세지를 입력하세요."/>
                <button 
                    onClick={() => sendMessageMutation.mutate()}
                    className="min-w-20 p-3 bg-light-blue-300 text-white"
                >
                    {sendMessageMutation.isPending ? <Spinner/> : <span>전송</span>}
                </button>
            </div>
        </div>
    ) : <div className="w-full"></div>;
}