'use client'


import { deleteFollow, saveFollow } from "actions/followActions";
import { useMutation } from "@tanstack/react-query";


export default function FollowButton({
    params,
    refetchFollow,
    refetchUser,
    followingData
}) {

        const followMutation = useMutation({
            mutationFn: async () => {
                saveFollow(params.userId);
            },
            onSuccess: () => {
                refetchFollow();
                refetchUser();
            }
        });
    
        const unFollowMutation = useMutation({
            mutationFn: async () => {
                deleteFollow(params.userId);
            },
            onSuccess: () => {
                refetchFollow();
                refetchUser();
            }
        });
    
    return (
        <div className="flex justify-center items-center pt-4">
            {!followingData ? (
                <button 
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md 
                                hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                    onClick={() => followMutation.mutate()}
                >
                    팔로우
                </button>
            ) : (
                <button 
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md
                                hover:bg-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                    onClick={() => unFollowMutation.mutate()}
                >
                    팔로우 취소
                </button>
            )}
        </div>
    );
}