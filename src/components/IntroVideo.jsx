
import { useEffect, useRef } from "react";
import introV from "../assets/introV.mp4";

const IntroVideo = ({ onFinish }) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            wrapperRef.current.style.transition = "opacity 0.5s ease";
            wrapperRef.current.style.opacity = "0";

            setTimeout(() => {
                onFinish(); // show home page
            }, 10); // wait for fade to complete
        }, 3000); // 3 sec video time

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
            <video
                src={introV}
                autoPlay
                muted
                playsInline
                className="w-full object-cover"
                style={{ maxHeight: "100vh", maxWidth: "100vw" }}
            />
        </div>
    );
}

export default IntroVideo;
