import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Board } from './App'
import { ToolBar } from './ToolBar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <section className='section-board'>
      <div className='section-board-window'>
        <div>hola</div>
        <Board />
      </div>
    </section>
    <ToolBar/>
  </StrictMode>
)
