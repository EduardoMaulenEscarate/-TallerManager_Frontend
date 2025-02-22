import { Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
const DesktopHeader = ({titulo}) => {
    const navigate = useNavigate();
    
    const changePage = (to, navigate) => {
        if (window.location.pathname !== to) {
          const timelineOut = gsap.timeline({});
      
          timelineOut.to('#main-content', {scale:0.9,duration: 0.3, })
                     .to('#main-content', {x:2000, duration: 0.3, delay:0.1})
                     .call(() => navigate(to))
                     .to('#main-content', {x:0, duration: 0.3, delay:0.1, })
                     .to('#main-content', {scale:1,duration: 0.3, delay:0.1})
        }
      }

    return (
        <div className="hidden lg:flex bg-white p-4 justify-between items-center shadow-sm">
            <h1 className="text-xl font-semibold text-slate-800">{titulo}</h1>
            <div className="flex items-center space-x-4">
                <Bell className="w-5 h-5 text-slate-800 cursor-pointer" />
                <User className='cursor-pointer' onClick={() => { changePage('/profile', navigate) }}></User>
            </div>
        </div>
    );   
};

export default DesktopHeader;