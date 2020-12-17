import React, { useState } from 'react';
import {Player} from '../constants/Player';

export const OponentContext = React.createContext();

export const OponentProvider = props =>{
    const [turn,setTurn] = useState(Player.X);

    const setPlayerTurn =()=> setTurn(prevTurn=> prevTurn===Player.X ? Player.O : Player.X); 

    return(
        <OponentContext.Provider value={{turn,setPlayerTurn}}>
            {props.children}
        </OponentContext.Provider>
    )
}