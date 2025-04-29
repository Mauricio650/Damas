import '../styles/IconsDesktop.css'
import logoNotepad from '../assets/images/blockno.png'
import logoCheckers from '../assets/images/board.png'


export function IconsDesktop () {

    return (
        <header className='Icons-Desktop'>
        <div className='Icons-Desktop-checker'>
            <img src={logoCheckers} alt="" />
            <p>Internet Checkers</p>
        </div>
        <div className='Icons-Desktop-notepad'>
            <img src={logoNotepad} alt="" />
            <p>NotePad</p>
        </div>
        </header>
    )
    
}