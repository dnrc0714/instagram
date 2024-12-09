"use client"

import { useState } from "react"
import SignUp from "./signup";
import SignIn from "./signin";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import TimeAgo from 'javascript-time-ago';
import ko from 'javascript-time-ago/locale/ko'; // 한국어 로케일 (필요한 경우)

TimeAgo.addDefaultLocale(ko); // 기본 로케일 설정

export default function Auth() {
    const [view, setView] = useState("SIGNUP");

    return (
        <main className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-light-blue-50">
        {view === "SIGNUP" ? (
            <SignUp setView={setView}/> 
        ) : (
            <SignIn setView={setView}/>
        )}
        </main>
    );
}