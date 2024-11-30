'use client';
import { useState } from "react";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { selectedUserState } from "utils/recoil/atoms";

import { getAllUser } from "actions/kakaoActions";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";

export default function ChatPeopleList() {
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    const {data, isFetching } = useQuery({
        queryKey: ["profile"],
        queryFn: () => getAllUser()
    });
    return (
        <div className="h-screen min-w-60 flex flex-col bg-gray-50">
            <>
                {isFetching ?
                    <Spinner />
                    :   data?.map((person) => (
                            <Person
                                onClick={() => {
                                    setSelectedUser({
                                        id: person.id,
                                        name: person.name,
                                        profileImgUrl: person.profile_img_url,
                                    });
                                    }}
                                onlineAt={new Date().toISOString()}
                                isActive={selectedUser?.id === person.id}
                                onChatScreen={false}
                                name={person?.name}
                                profileImgUrl={person?.profile_img_url}
                            />
                        ))
                }
            </>
        </div>
    );
}