"use client";
import { useEffect, useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {showButton && (
                <button className="ScrollToTopButton" onClick={scrollToTop}>
                    <ArrowUpOutlined />
                </button>
            )}

            <style jsx>{`
                .ScrollToTopButton {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #02539b;
                    color: white;
                    border: none;
                    padding: 12px;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    transition: opacity 0.3s;
                }

                .ScrollToTopButton:hover {
                    background: #003d73;
                }
            `}</style>
        </>
    );
}
