'use client';
import { useEffect } from "react";
import Person from "./Person";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedUserState, presenceState, selectedUserState } from "utils/recoil/atoms";

import { getAllUser } from "actions/userActions";
import { useQuery } from "@tanstack/react-query";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function ChatPeopleList() {
    const loggedUser = useRecoilValue(loggedUserState);
    const supabase = createBrowserSupabaseClient();
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    const [presence, setPresence] = useRecoilState(presenceState);

    const {data} = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const allUsers = await getAllUser();
            return allUsers.filter((user) => user.id !== loggedUser.id);
        },
    });

    useEffect(() => {
        const channel = supabase.channel("online_users", {
            config: {
            presence: {
                key: loggedUser?.id,
            },
            },
        });
        channel.on("presence", { event: "sync" }, () => {
            const newState = channel.presenceState();
            const newStateObj = JSON.parse(JSON.stringify(newState));
            setPresence(newStateObj);
        });
        channel.subscribe(async (status) => {
            if (status !== "SUBSCRIBED") {
            return;
            }
            const newPresenceStatus = await channel.track({
            onlineAt: new Date().toISOString(),
            });
        });
        return () => {
            channel.unsubscribe();
        };
    }, []);
    
    return (
        <div className="h-screen min-w-60 flex flex-col bg-gray-50">
                {data?.map((user) => (
                        <Person
                            key={user.id}
                            onClick={() => {setSelectedUser({
                                id: user.id,
                                name: user.name,
                                profileImgUrl: user?.profile_img_url
                            });}}
                            onlineAt={presence?.[user.id]?.[0]?.onlineAt}
                            isActive={selectedUser?.id === user.id}
                            onChatScreen={false}
                            userId={user.id}
                            name={user.name}
                            profileImgUrl={user?.profile_img_url}
                            callType='A'
                        />
                    ))
                }
        </div>
    );
}