'use client'

import SearchUserList from "components/discover/SeachUserList";
import SearchComponent from "components/discover/SearchComponent";
import { useState } from "react";

export default function DisvoverPage() {
    const [searchInput, setSearchInput] = useState("");
    return (
        <div className="w-full flex justify-start items-center">
                {/* 검색 컴포넌트 */}
                <SearchComponent searchInput={searchInput} setSearchInput={setSearchInput}/>
                
                
                {/* 유저 리스트 */}
                <SearchUserList search={searchInput}/>
        </div>
    );
}