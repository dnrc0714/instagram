'use client'

import { updateSecret } from "actions/userActions";
import { Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";

export default function SecretButton({
    user,
    refetchUser
}) {
    const secretProfileMutation =  useMutation({
        mutationFn: async () => {
            updateSecret(!user.secret_tp);
        },
        onSuccess: () => {
            refetchUser();
        }
    });

    return (
        <div className="flex justify-center items-center pt-4">
            {!user?.secret_tp ? secretProfileMutation.isPending ? (
                <Spinner/>
            ) : (
                <button 
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md 
                            hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                onClick={() => secretProfileMutation.mutate()}
            >
                비공개
            </button>
            ) : (
                <button 
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md
                                hover:bg-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                    onClick={() => secretProfileMutation.mutate()}
                >
                    비공개 취소
                </button>
            )}
        </div>
    );
}