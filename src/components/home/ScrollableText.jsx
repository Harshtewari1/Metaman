// 📁 components/ScrollableText.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollableText() {
    const marqueeRef = useRef(null);
    const containerRef = useRef(null);
    const position = useRef(0);
    const direction = useRef(-1); // -1 = left, 1 = right

    useEffect(() => {
        const el = marqueeRef.current;
        const container = containerRef.current;

        let lastScroll = window.scrollY;

        const updateDirection = () => {
            const currentScroll = window.scrollY;
            direction.current = currentScroll > lastScroll ? -1 : 1; // down → left, up → right
            lastScroll = currentScroll;
        };

        window.addEventListener("scroll", updateDirection);

        let frame;
        const animate = () => {
            const speed = 1.5; // increase for faster scroll
            position.current += direction.current * speed;

            const totalWidth = el.scrollWidth / 2;

            // Looping logic
            if (position.current <= -totalWidth) {
                position.current = 0;
            } else if (position.current >= 0) {
                position.current = -totalWidth;
            }

            el.style.transform = `translateX(${position.current}px)`;
            frame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", updateDirection);
        };
    }, []);

    return (
        <div className="w-full overflow-hidden bg-black py-4" ref={containerRef}>
            <div
                className="text-white text-3xl font-bold whitespace-nowrap flex gap-16"
                ref={marqueeRef}
            >
                {Array.from({ length: 20 }).map((_, index) => (
                    <span key={index}>Discover Your Scent of Victory</span>
                ))}
            </div>
        </div>
    );
}
