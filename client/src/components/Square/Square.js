import React from 'react';
import './Square.scss';

export const Square = ({value}) => {
    return (
        <div className='square'>
            <span className='square__text'>{value}</span>   
        </div>
    )
}
