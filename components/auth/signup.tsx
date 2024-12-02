"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { saveUserProfile } from "actions/kakaoActions";
import { useState } from "react";
import { useQuery } from "react-query";

import { createBrowserSupabaseClient } from "utils/supabase/client";
import CallBack from "./callback";

export default function SignUp({ setView }) {
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationRequired, setConfirmationRequired] = useState(false);

    const supabase = createBrowserSupabaseClient();

    const signUpWithKakao = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "kakao",
            options: {
                redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
                    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
                    : "http://localhost:3000/auth/callback",
            },
        });
        
        if(error) {
            alert("카카오 로그인중 오류가 발생했습니다." +  error.message);
            return false;
        }
    }

    const signupMutation = useMutation({
        mutationFn: async () => {
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: 
                    process.env.NEXT_PUBLIC_VERCEL_URL
                    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/signup/confirm`
                    : "http://localhost:3000/signup/confirm",
                },
            });

            if (data) {
                setConfirmationRequired(true);
            }
            if (error) {
                alert(error.message);
                return false;
            }
        },
    });

    const verifyOtpMutation = useMutation({
        mutationFn: async () => {
            const {data, error} = await supabase.auth.verifyOtp({
                type: 'signup',
                email,
                token: otp,
            });

            if (data) {
                const { error: metadataError } = await supabase.auth.updateUser({
                    data: { name }, // 사용자 메타데이터에 이름 추가
                });

                if (metadataError) {
                    alert(`Failed to save name: ${metadataError.message}`);
                    return false;
                }

                CallBack(data);
            }
            if (error) {
                alert(error.message);
                return false;
            }
        },
    });

    return <div className="flex flex-col gap-4">
        <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
            <img src={'/images/inflearngram.png'} className="w-60 mb-6"/>
            {confirmationRequired ? (
                <Input value={otp} onChange={(e) => setOtp(e.target.value)}
                label="OTP"
                type="text"
                className="w-full rounded-sm"
                placeholder="6자리 OTP를 입력해주세요."
                />
            ) : (
                <>
                    <Input value={name} onChange={(e) => setName(e.target.value)}
                    label="name"
                    type="text"
                    className="w-full rounded-sm"
                    />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}
                    label="email"
                    type="email"
                    className="w-full rounded-sm"
                    />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)}
                    label="password"
                    type="password"
                    className="w-full rounded-sm"
                    />
                </>
            )}
            
            <Button
            onClick={() => {
                if (confirmationRequired) {
                    verifyOtpMutation.mutate();
                } else {
                    signupMutation.mutate();
                }
            }}
            loading={confirmationRequired ? verifyOtpMutation.isPending : signupMutation.isPending}
            disabled={confirmationRequired ? verifyOtpMutation.isPending : signupMutation.isPending}
            color="light-blue"
            className="w-full text-md py-1"
            >
                {confirmationRequired ? "인증하기" : "가입하기"}
            </Button>
            <Button
                onClick={() => signUpWithKakao()}
                className="w-full text-md py-1 bg-yellow-600"
                >
                카카오 로그인
            </Button>
        </div>

        <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
            이미 계정이 있으신가요?{" "}
            <button 
                className="text-light-blue-600 font-bold"
                onClick={() => setView("SIGNIN")}
            >
                로그인하기
            </button>
        </div>
    </div>;
}
