"use client";
import { Input } from "@material-tailwind/react";
import { useState } from "react";
import SearchUserList from "./SeachUserList";

export default function SearchComponent() {
    const [searchInput, setSearchInput] = useState(undefined);
    return (
        <div className="h-screen min-w-60 flex flex-col bg-gray-50 p-2">
            <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                label="Search User"
                icon={<i className="fa-solid fa-magnifying-glass" />}
            />

                            
                
            {/* 유저 리스트 */}
            <SearchUserList search={searchInput}/>
        </div>
    );
}