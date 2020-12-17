import React,{useContext} from 'react';
import './MatchDetails.scss';
import {OponentContext} from '../../context/Oponent';

export const MatchDetails = () => {
    const {turn} = useContext(OponentContext);

    return (
        <div className='match-details'>
            <p>Now: {turn}</p>
        </div>
    )
}
