import React, { useState } from "react";
import Navigations from "@/components/Navigation";

export default function TermsAndConditions() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <>

            <Navigations onContactClick={() => setIsContactModalOpen(true)} />

            <main className="bg-white min-h-screen py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#066980] text-center mb-2">
                        Terms &amp; Conditions
                    </h1>
                    <div className="flex justify-center mt-3 mb-10">
                        <span className="block w-24 h-1 bg-yellow-400 rounded"></span>
                    </div>

                    <section className="mb-10">
                        <p className="mb-4">
                            By accessing and using <b>Breakout Wanderers</b>, you agree to comply with these Terms &amp; Conditions.
                        </p>
                        <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Use of Website</h2>
                        <p className="mb-4">
                            You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict their enjoyment of the site.
                        </p>
                        <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Intellectual Property</h2>
                        <p className="mb-4">
                            All content (text, images, videos) is owned by Breakout Wanderers unless otherwise stated. You may not copy, republish, or distribute any material without written permission.
                        </p>
                        <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Affiliate and Sponsored Content</h2>
                        <p className="mb-4">
                            We may feature affiliate links or sponsored content. Any such content will be clearly marked. We only recommend products and services we genuinely believe in.
                        </p>
                        <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Limitation of Liability</h2>
                        <p className="mb-4">
                            We are not liable for any indirect or consequential losses resulting from your use of the website.
                        </p>
                        <h2 className="text-lg font-semibold text-[#12a5c4] mt-6 mb-2">Changes</h2>
                        <p className="mb-4">
                            We may update these Terms at any time. Continued use of the site means you accept the revised terms.
                        </p>
                    </section>

                    {/* Disclaimer Section (if you want it here, else keep it only on Home) */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-[#12a5c4] mb-4">Disclaimer</h2>
                        <p className="mb-4">
                            <b>Breakout Wanderers</b> provides travel-related content, inspiration, and recommendations based on personal experiences, research, and third-party sources. While we aim to keep information accurate and updated, we do not guarantee that all details are current, complete, or suitable for your travel needs.
                        </p>
                        <ul className="list-disc pl-5 mb-4 text-gray-700">
                            <li>
                                Travel conditions, costs, and rules may change. Always verify critical information (like visas, safety advisories, health requirements) from official sources or providers before planning a trip.
                            </li>
                            <li>
                                We are not responsible for any losses, injuries, or damages resulting from the use of this site or reliance on its content.
                            </li>
                            <li>
                                Some links on our website may be affiliate links. If you book through them, we may earn a small commission—at no extra cost to you. These help support our work.
                            </li>
                        </ul>
                    </section>
                </div>
            </main>
        </>

    );
}
