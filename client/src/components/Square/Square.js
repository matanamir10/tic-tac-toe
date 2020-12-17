import React from 'react';
import './Square.scss';

export const Square = ({id}) => {
    return (
        <div className='square'>
            {id+1}
        </div>
    )
}
