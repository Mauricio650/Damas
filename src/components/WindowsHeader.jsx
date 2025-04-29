import '../styles/windowsHeader.css'
import logoBoard from '../assets/images/board.png'





export function WindowsHeader (){

    return (
        <>
            <header className='windows-Header'>
            <div className='windows-header-info' >   
                   <img src={logoBoard} alt="loo Board of checkers" />
                    <p>Internet Checkers</p>
                </div>
                <div className='windows-header-maxMinClose'>
                    <div className='min'>
                        <div className='in-min'>

                        </div>
                    </div>
                        <div className='max'>
                            <div className='in-max'></div>
                        </div>
                    <div className='close'>
                        X
                    </div>
                </div>
            </header>
        </>
    )
}