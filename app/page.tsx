'use client'

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "actions/kakaoActions";
import LogoutButton from "components/logout-button";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loggedUserState } from "utils/recoil/atoms";

export default function Home() {
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserState);

  const { data } = useQuery({
    queryKey: ['user_info'], // 쿼리 키와 파라미터로 캐싱 관리
    queryFn: () => getUserProfile(), // 실제 rpc 호출
  });

  useEffect(() => {
    setLoggedUser(data);
  });

  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
    <h1 className="font-bold text-xl">
        Welcome 
        {loggedUser?.name}
        !
    </h1> 
    <LogoutButton />
  </main>
  );
}
