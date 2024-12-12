"use client";
import { Input } from "@material-tailwind/react";

export default function SearchComponent({ searchInput, setSearchInput }) {
    return (
        <div className="h-screen min-w-60 flex flex-col bg-gray-50 p-2">
            <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                label="Search User"
                icon={<i className="fa-solid fa-magnifying-glass" />}
            />
        </div>
    );
}