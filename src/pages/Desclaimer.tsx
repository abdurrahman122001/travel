import React, { useState } from "react";
import Navigations from "@/components/Navigation";
import Footer from "@/components/Footer";
export default function Desclaimer() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    return (
        <>
            <Navigations onContactClick={() => setIsContactModalOpen(true)} />


            <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-md mt-10 mb-16">
                <h1 className="text-3xl font-bold mb-6 text-[#314052]">Disclaimer</h1>
                <p className="mb-4 text-gray-700 leading-relaxed">
                    Breakout Wanderer provides the <a href="https://www.breakoutwanderer.com" className="text-blue-700 underline">www.breakoutwanderer.com</a> website as a service to the public and website owners.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                    Breakout Wanderer is not responsible for, and expressly disclaims all liability for, damages of any kind arising out of use, reference to, or reliance on any information contained within the site. While the information contained within the site is periodically updated, no guarantee is given that the information provided on this website is correct, complete, or up-to-date.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                    Although the Breakout Wanderer website may include links providing direct access to other Internet resources, including external websites, Breakout Wanderer is not responsible for the accuracy or content of information contained in these external sites.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                    Links from breakoutwanderer.com to third-party sites do not constitute an endorsement by Breakout Wanderer of the parties or their products and services. The appearance on the website of advertisements and product or service information does not constitute an endorsement by Breakout Wanderer, and Breakout Wanderer has not investigated the claims made by any advertiser.
                </p>
                <p className="text-gray-600 text-sm mt-8">
                    Last updated: {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>
            <Footer setIsContactModalOpen={setIsContactModalOpen} />

        </>
    );


}