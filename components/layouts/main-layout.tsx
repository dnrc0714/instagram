import Sidebar from "components/sidebar";

export default async function MainLayout({ children }) {
    return (
        <div className="flex w-screen h-screen">
                <Sidebar/>
            <main className="w-full h-screen flex items-center justify-center ml-20">
                {children}
            </main>
        </div>
        
    );
}