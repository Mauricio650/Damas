import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { Board } from './App'
import { ToolBar } from './components/ToolBar'
import { WindowsHeader } from './components/WindowsHeader'
import { IconsDesktop } from './components/IconsDesktop'

createRoot(document.getElementById('root')).render(
  <>
    <section className='icon-Desk'>
    <IconsDesktop/>
    </section>
    <section className='section-board'>
      <div className='section-board-window'>
        <WindowsHeader/>
        <Board />
      </div>
    </section>
    <ToolBar/>
  </>
)
