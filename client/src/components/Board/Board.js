import React from 'react';
import './Board.scss';
import {Square} from '../Square/Square';

export const Board = ({rows,columns}) => {
    // TODO : render dynamic rows and columns
    return (
        <div className='board' >
            {[...Array(rows*columns).fill().map((square,index)=> <Square id={index}/>)]}
        </div>
    )
}

Board.defaultProps = {
    rows:3,
    columns:3
}