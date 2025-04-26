import { useState } from 'react'
import { isEqual} from 'lodash'
import './App.css'



export function Board () {

  const arrayBoard = [
    ['N1','EW', 'N1', 'EW', 'N1', 'EW', 'N1', 'EW'],
    ['EW', 'N1', 'EW', 'N1', 'EW', 'N1', 'EW', 'N1'],
    ['N1','EW', 'N1', 'EW', 'N1', 'EW', 'N1', 'EW'],
    ['EW','EB', 'EW', 'EB', 'EW', 'EB', 'EW', 'EB'],
    ['EB','EW', 'EB', 'EW', 'EB', 'EW', 'EB', 'EW'],
    ['EW', 'N2', 'EW', 'N2', 'EW', 'N2', 'EW', 'N2'],
    ['N2','EW', 'N2', 'EW', 'N2', 'EW', 'N2', 'EW'],
    ['EW', 'N2', 'EW', 'N2', 'EW', 'N2', 'EW', 'N2'],
  ]


  const players = {
    n1:'N1',
    n2: 'N2'
  }

  
  
  const [board,setBoard] = useState(arrayBoard)

  const [currentPosition,setCurrentPosition] = useState([0,0])

  const [turn,setTurn] = useState('N1')

  const [wantPosition,setWantPosition] = useState([0,0])

  const [futurePositions, setFuturePositions] = useState([[0,0],[0,0]])

  const [valueFuture,setValueFuture] = useState('')



 async function movePiece ({currentP, futureP, valueFuturePosition, currentPlayer}) {
    const newBoard = [...board]
    newBoard[futureP[0]][futureP[1]] = await currentPlayer
    newBoard[currentP[0]][currentP[1]] = await valueFuturePosition
    setTurn(currentPlayer === 'N1' ? 'N2' : 'N1')
    setBoard(newBoard)
  }
  
  


  const handleClick = (e) =>{
    const player = e.target.dataset.player
    if(player === turn) {
    console.log('turno del player',turn)

    const currentP = [Number(e.target.dataset.positionY),Number(e.target.dataset.positionX)]
    setCurrentPosition(currentP)
    console.log(`esta en la posicion ${currentP}`)

    if(turn === players.n1) {
      const fPositions = [[Number(e.target.dataset.positionY) + 1,Number(e.target.dataset.positionX) -1],[Number(e.target.dataset.positionY) + 1,Number(e.target.dataset.positionX) + 1]]
      
      if(board[Number(e.target.dataset.positionY) + 1][Number(e.target.dataset.positionX) -1] === players.n2){
        fPositions[0] = [Number(e.target.dataset.positionY) + 2,Number(e.target.dataset.positionX) - 2]
      }

      if(board[Number(e.target.dataset.positionY) + 1][Number(e.target.dataset.positionX) + 1] === players.n2) {
        fPositions[1] = [Number(e.target.dataset.positionY) + 2,Number(e.target.dataset.positionX) + 2]
      }
      setFuturePositions(fPositions)
      console.log(`sus futuras pociciones pueden ser ${futurePositions}`)
    }else {
      const fPositions = [[Number(e.target.dataset.positionY) - 1,Number(e.target.dataset.positionX) -1],[Number(e.target.dataset.positionY) - 1,Number(e.target.dataset.positionX) + 1]]
      
      if(board[Number(e.target.dataset.positionY) - 1][Number(e.target.dataset.positionX) - 1] === players.n1){
        fPositions[0] = [Number(e.target.dataset.positionY) - 2,Number(e.target.dataset.positionX) - 2]
      }

      if(board[Number(e.target.dataset.positionY) - 1][Number(e.target.dataset.positionX) + 1] === players.n1) {
        fPositions[1] = [Number(e.target.dataset.positionY) - 2,Number(e.target.dataset.positionX) + 2]
      }
      
      setFuturePositions(fPositions)
      console.log(`sus futuras pociciones pueden ser ${futurePositions}`)
      
    }

  }
    
    
  }

    const wannaMove = (e) => {
      if(e.target.dataset.value === 'EB'){
        setValueFuture(e.target.dataset.value)
      }
      
      const wannaM = [Number(e.currentTarget.dataset.positionY),Number(e.currentTarget.dataset.positionX)]
      if (isEqual(futurePositions[0],wannaM) || isEqual(futurePositions[1],wannaM)){
        setWantPosition(wannaM)
        console.log('el jugador decide mover hacia', wantPosition)
        movePiece({currentP:currentPosition,futureP:[Number(e.currentTarget.dataset.positionY),Number(e.currentTarget.dataset.positionX)],valueFuturePosition:valueFuture,currentPlayer:turn})
      }
      
    }

    
    

  return (
    <>

    <article className='Board'>
      {
        board.map((value, index)=>{
          return value.map((v,i) => {
            if(v === 'N1' || v === 'N2'){
            return <div data-position-y={index}
                        data-position-x={i}
                        className='Board-SquareBoard-BLACK'
                        key={[index,i]}
                        onClick={handleClick}>
                    
                      <div data-position-y={index}
                        data-position-x={i}
                        data-player={v}>
                          {v}
                      </div>

                   </div>
            }
            if(v === 'EW') {
              return <div data-position-y={index}
                          data-position-x={i} 
                          className='Board-SquareBoard-WHITE'
                          key={[index,i]}
                          onClick={wannaMove}
                          >
                            
                        <div data-position-y={index}
                        data-position-x={i}
                        data-value={v}>{v}</div>
                     </div>
            }else{
              return <div data-position-y={index}
                          data-position-x={i} 
                          
                          className='Board-SquareBoard-BLACK'
                          key={[index,i]}
                          onClick={wannaMove}
                          >

                        <div data-position-y={index}
                        data-position-x={i}
                        data-value={v}>{v}</div>
                     </div>
            }
          })
        })
      }
    </article>
    
    </>
  )
}