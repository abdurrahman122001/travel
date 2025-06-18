import React, { useState } from "react";
import { Search } from "lucide-react";
import Navigations from "@/components/Navigation";
export default function SearchHero() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <>
            <Navigations onContactClick={() => setIsContactModalOpen(true)} />

            <div className="min-h-screen bg-white relative flex items-center justify-center">
                {/* Faint Map Background */}

                {/* Search Box */}
                <div className="relative z-10 flex w-full justify-center items-center mt-[-10vh]">
                    <div className="flex w-[600px] max-w-[90vw] shadow-2xl rounded-xl overflow-hidden border border-blue-200 bg-white">
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="flex-1 px-6 py-5 bg-blue-50 text-lg placeholder:text-gray-700 outline-none border-none"
                        />
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 transition-all px-7 flex items-center justify-center"
                            style={{ minHeight: "60px" }}
                        >
                            <Search className="w-6 h-6 text-gray-800" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
