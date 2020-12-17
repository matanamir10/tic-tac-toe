import React, { useContext, useState } from 'react';
import './Game.scss';
import {Board} from '../../components/Board/Board';
import { MatchDetails } from '../../components/MatchDetails/MatchDetails';
import { Square } from '../../models/Square';
import { OponentContext } from '../../context/Oponent';

// Maybe use game configuraion page before
const initalSquares = [];
for(let i=0; i<9; i++){
   initalSquares.push(new Square(i,null,false))
}


export const Game = () => {
    const [squares,setSquares]  = useState(initalSquares);
    const {turn,setPlayerTurn} = useContext(OponentContext);

    const onSquareClicked = index =>{
        console.log('index',index);
        setSquares(prevSquares => prevSquares.map((square,currIndex)=>{
            if(currIndex === index){
                return {...square,value:turn,isChecked:true};
            }
            return  square
        }));
        setPlayerTurn();
        // TODO: check win
    }
    return (
    <div className='game'>
    <MatchDetails/>
     <Board squares={squares} rows={3} columns={3} onSquareClicked={onSquareClicked}/>       
     </div>
    )
}
