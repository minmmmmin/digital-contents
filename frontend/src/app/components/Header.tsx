"use client";

export default function Header() {
    return (
        <header className="w-full bg-base-100 border-b shadow-sm sticky top-0 z-50">
            <div className="w-full flex items-center justify-between px-4 py-3">
                <button className="btn btn-ghost btn-sm px-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold">ねこマップ</h1>

                <div className="avatar">
                    <div className="w-9 h-9 rounded-full ring ring-gray-300 cursor-pointer">
                    </div>
                </div>
            </div>
        </header>
    );
}
