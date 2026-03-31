import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

/* eslint-disable @typescript-eslint/no-explicit-any */
type MainLayoutProps = {
    children: any
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
    const { children } = props;
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1 w-0 overflow-hidden">

                <Header />

                <main className="flex-1 relative overflow-y-auto focus:outline-none p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default MainLayout;