'use client'

import Person from "./Person";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "utils/recoil/atoms";

export default function ChatScreen() {
    const selectedUser = useRecoilValue(selectedUserState);
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
            <div className="w-full flex-1 flex flex-col p-3 gap-3">
                <Message
                    isFromMe={true}
                    message={'안녕하세요'}
                />
                <Message
                    isFromMe={false}
                    message={'안녕하세요'}
                />
                <Message
                    isFromMe={true}
                    message={'안녕하세요'}
                />
                <Message
                    isFromMe={true}
                    message={'안녕하세요'}
                />
                <Message
                    isFromMe={false}
                    message={'안녕하세요'}
                />
                <Message
                    isFromMe={false}
                    message={'안녕하세요'}
                />
            </div>

            {/* 채팅창 영역 */}
            <div className="flex">
                <input className="p-3 w-full border-2 border-light-blue-300"
                    placeholder="메세지를 입력하세요."/>
                <button className="min-w-20 p-3 bg-light-blue-300 text-white"
                >
                    <span>전송</span>
                </button>
            </div>
        </div>
    ) : <div className="w-full"></div>;
}