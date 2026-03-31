const Header = () => {
    return (
        <header className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
            <div className="text-gray-500 font-medium">Overview</div>
            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">🔔</button>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">JD</div>
            </div>
        </header>
    )
}

export default Header;