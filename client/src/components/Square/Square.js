import React from 'react';
import './Square.scss';

export const Square = ({id}) => {
    return (
        <div className='square'>
            <span className='square__text'>{id}</span>   
        </div>
    )
}
