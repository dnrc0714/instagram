'use client'
import SearchComponent from "components/discover/SearchComponent";


export default function DisvoverPage() {
    return (
        <div className="relative h-screen flex flex-col">
                {/* 검색 컴포넌트 */}
                <SearchComponent/>
        </div>
    );
}