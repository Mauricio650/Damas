import { useState } from 'react'
import { isEqual} from 'lodash'
import './styles/App.css'



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




export function Board () {

  

  const [board,setBoard] = useState(() => {
    const boardStorage = window.localStorage.getItem('board')
    return boardStorage ? JSON.parse(boardStorage) : arrayBoard
  })

  const [currentPosition,setCurrentPosition] = useState([0,0])

  const [turn,setTurn] = useState(() => {
    const turnStorage = window.localStorage.getItem('turn')
    return turnStorage ? JSON.parse(turnStorage) : 'N1'
  })

  const [futurePositions, setFuturePositions] = useState([[0,0],[0,0],[],[]])

  const [valueFuture,setValueFuture] = useState('')

  const [winner,setWinner] = useState(null)

  const [killsN1,setKillsN1] = useState(0)

  const [killsN2,setKillsN2] = useState(0)


 if(winner !== null) {
  restartBoard()
 }

  const turnN1 = turn === players.n1 ? 'table-turn-black' : 'table-turn-inactive' 
  const turnN2 = turn === players.n2 ? 'table-turn-white' : 'table-turn-inactive' 


  function restartBoard() {
    const newBoard = arrayBoard.map(row => [...row]);
    
    setTurn(players.n1);
    setCurrentPosition([0,0]);
    setFuturePositions([[0,0],[0,0],[],[]]);
    setValueFuture('');
    setBoard(newBoard);
    window.localStorage.clear('boar')
    window.localStorage.clear('turn')
  }
  
  

  function movePiece({ currentP, futureP, valueFuturePosition, currentPlayer, kill = [] }) {
    const newBoard = board.map(row => [...row]);
    
    newBoard[futureP[0]][futureP[1]] = currentPlayer;
    newBoard[currentP[0]][currentP[1]] = valueFuturePosition;
  
    if (kill.length !== 0) {
      newBoard[kill[0]][kill[1]] = 'EB';

      if(currentPlayer === players.n1){
        const count = killsN2 + 1
        setKillsN2(count)
        if(count === 12) {
          setWinner(currentPlayer)
        }
      }else {
        const count = killsN1 + 1
        setKillsN1(count)
        if(count === 12) {
          setWinner(currentPlayer)
        }
      }
    } 
  
    setBoard(newBoard);
    setTurn(currentPlayer === 'N1' ? 'N2' : 'N1');
  
    
    setCurrentPosition([0,0]);       
    setFuturePositions([[0,0],[0,0],[],[]]);
    setValueFuture('');

    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', JSON.stringify(turn))
  }
  
  
  

  const handleClick = (e) =>{
    const player = e.target.dataset.player
    
    
    if(player === turn) {
    

    const currentP = [Number(e.target.dataset.positionY),Number(e.target.dataset.positionX)]
    setCurrentPosition(currentP)
    

    if(turn === players.n1) {
      const fPositions = [[Number(e.target.dataset.positionY) + 1,Number(e.target.dataset.positionX) -1],[Number(e.target.dataset.positionY) + 1,Number(e.target.dataset.positionX) + 1]]
      
      if(board[Number(e.target.dataset.positionY) + 1][Number(e.target.dataset.positionX) -1] === players.n2){
        fPositions[0] = [Number(e.target.dataset.positionY) + 2,Number(e.target.dataset.positionX) - 2]
        fPositions[2] = [Number(e.target.dataset.positionY) + 1,Number(e.target.dataset.positionX) -1]
      }

      if(board[Number(e.target.dataset.positionY) + 1][Number(e.target.dataset.positionX) + 1] === players.n2) {
        fPositions[1] = [Number(e.target.dataset.positionY) + 2,Number(e.target.dataset.positionX) + 2]
        fPositions[3] = [Number(e.target.dataset.positionY) + 1,Number(e.target.dataset.positionX) + 1]
      }
      setFuturePositions(fPositions)
      
    }else {
      const fPositions = [[Number(e.target.dataset.positionY) - 1,Number(e.target.dataset.positionX) -1],[Number(e.target.dataset.positionY) - 1,Number(e.target.dataset.positionX) + 1]]
      
      if(board[Number(e.target.dataset.positionY) - 1][Number(e.target.dataset.positionX) - 1] === players.n1){
        fPositions[0] = [Number(e.target.dataset.positionY) - 2,Number(e.target.dataset.positionX) - 2]
        fPositions[2] = [Number(e.target.dataset.positionY) - 1,Number(e.target.dataset.positionX) - 1]
      }

      if(board[Number(e.target.dataset.positionY) - 1][Number(e.target.dataset.positionX) + 1] === players.n1) {
        fPositions[1] = [Number(e.target.dataset.positionY) - 2,Number(e.target.dataset.positionX) + 2]
        fPositions[3] = [Number(e.target.dataset.positionY) - 1,Number(e.target.dataset.positionX) + 1]
      }
      
      setFuturePositions(fPositions)
      
      
    }

  }
    
  }

  const wannaMove = (e) => {
      if(e.target.dataset.value === 'EB'){
        setValueFuture(e.target.dataset.value)
      } 
      
      const wannaM = [Number(e.currentTarget.dataset.positionY),Number(e.currentTarget.dataset.positionX)]
     
      if(turn === players.n1){

        if(isEqual(futurePositions[0],wannaM) ){
          return movePiece({currentP:currentPosition,futureP:wannaM,valueFuturePosition:valueFuture,currentPlayer:turn, kill:futurePositions[2]})
        }

        if(isEqual(futurePositions[1],wannaM) ){
          return movePiece({currentP:currentPosition,futureP:wannaM,valueFuturePosition:valueFuture,currentPlayer:turn,kill:futurePositions[3]})
        }
      }


      if(turn === players.n2){

        if(isEqual(futurePositions[0],wannaM) ){
          return movePiece({currentP:currentPosition,futureP:wannaM,valueFuturePosition:valueFuture,currentPlayer:turn,kill:futurePositions[2]})
        }

        if(isEqual(futurePositions[1],wannaM) ){
          return movePiece({currentP:currentPosition,futureP:wannaM,valueFuturePosition:valueFuture,currentPlayer:turn,kill:futurePositions[3]})

        }
      }
        
      
    }



  return (
    <>
    <article className='Board'>
      {
        board.map((value, index)=>{
          return value.map((v,i) => {
            const token = v === 'N1' ? 'token-black' : 'token-white'
            if(v === 'N1' || v === 'N2'){
            return <div data-position-y={index}
                        data-position-x={i}
                        className='Board-SquareBoard-BLACK'
                        key={[index,i]}
                        onClick={handleClick}>
                    
                      <div
                        className={token}
                       data-position-y={index}
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
                          onClick={wannaMove}>
                            
                        <div
                        data-position-y={index}
                        data-position-x={i}
                        data-value={v}>{v}
                        </div>

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
                        data-value={v}>
                        </div>

                     </div>
            }
          })
        })
      }
    </article>

    <div className='table-turns'>
      <div className={turnN1}>
        
      </div>
      <button className='table-turn-button' onClick={restartBoard} >
        Restart
      </button>
      <div className={turnN2}>
        
      </div>
    </div>
    
    </>
  )
}