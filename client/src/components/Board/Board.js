import React from 'react';
import './Board.scss';

export const Board = ({rows,columns}) => {

    const style = {
        'grid-template-rows': rows,
       'grid-template-columns': columns,
    }

    return (
        <div className='board' style={style}>
            {[... Array(rows*columns).map((square,index)=> <Square id={index}/>)]}
        </div>
    )
}

Board.defaultProps = {
    rows:3,
    columns:3
}