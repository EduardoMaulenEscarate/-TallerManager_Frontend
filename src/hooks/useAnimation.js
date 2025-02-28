import gsap from "gsap";
import { useNavigate } from 'react-router-dom';

export const useAnimation = () => {
    const navigate = useNavigate();

    const changePageAnimation = (to) => {
        if (window.location.pathname !== to) {
            const timelineOut = gsap.timeline({});

            timelineOut.to('#main-content', { scale: 0.9, duration: 0.3, })
                .to('#main-content', { x: 2000, duration: 0.3, delay: 0.1 })
                .call(() => navigate(to))
                .to('#main-content', { x: 0, duration: 0.3, delay: 0.1, })
                .to('#main-content', { scale: 1, duration: 0.3, delay: 0.1 })
        }
    };

    return { changePageAnimation };
}
