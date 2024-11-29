'use client';
import { useState } from "react";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { selectedUserState } from "utils/recoil/atoms";

export default function ChatPeopleList() {
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    return (
        <div className="h-screen  min-w-60 flex flex-col bg-gray-50">
            <Person
            onClick={() => setSelectedUser(0)}
            onlineAt={new Date().toISOString()}
            isActive={selectedUser === 0}
            onChatScreen={false}
            />
            <Person
            onClick={() => setSelectedUser(1)}
            onlineAt={new Date().toISOString()}
            isActive={selectedUser === 1}
            onChatScreen={false}
            />
        </div>
    );
}