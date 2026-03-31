const Sidebar = () => {
    return (
        <aside className="hidden md:flex md:flex-shrink-0 w-64 bg-slate-900 text-white flex-col">
            <div className="flex items-center h-16 px-6 bg-slate-950 font-bold text-xl tracking-tight">
                INDUSTRIAL.IO
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <a href="/dashboard" className="block px-4 py-2 rounded-md bg-blue-600">Dashboard</a>
                <a href="#" className="block px-4 py-2 rounded-md hover:bg-slate-800 transition">Analytics</a>
                <a href="#" className="block px-4 py-2 rounded-md hover:bg-slate-800 transition">Projects</a>
                <a href="#" className="block px-4 py-2 rounded-md hover:bg-slate-800 transition">Settings</a>
            </nav>
        </aside>
    )
}

export default Sidebar;