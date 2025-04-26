import {useState, useEffect } from 'react'

import './ToolBar.css'



export function ToolBar () {

    const [currentDate, setCurrentDate] = useState(getCurrentTime())

    function getCurrentTime() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes= date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`;
    }
    
  

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentDate(getCurrentTime());
        }, 1000);
    
        
        return () => clearInterval(interval);
      }, []);


    return (
        <>
        
        <header className='ToolBar'>
                <div className='toolbar-Button-logo'>
                    
                        <img src="/public/pngwing.com.png" alt="Logo of windows xp" />
                        <h1>Start</h1>
                    
                </div>
                <div className='toolbar-tabs'>
                    <div className='toolbar-tabs-notepad'>   
                        <img src="/public/blockno.png" alt="logo of Notepad" />
                        <p>Untitled - Notepad</p>
                    </div>
                    <div className='toolbar-tabs-checkers'>   
                        <img src="/public/board.png" alt="loo Board of checkers" />
                        <p>Internet Checkers</p>
                    </div>
                </div>

                <div className='toolbar-Date'>
                        <img src="/public/messe.png" alt="logo of messenger" />
                        <p>{currentDate}</p>
                </div>
            </header>
        
            
        </>
    )
}


