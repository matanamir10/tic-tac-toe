import React from 'react';
import './Game.scss';
import {Board} from '../../components/Board/Board';
import { MatchDetails } from '../../components/MatchDetails/MatchDetails';

export const Game = () => {
    return (
    <div className='game'>
    <MatchDetails/>
     <Board/>       
     </div>
    )
}
