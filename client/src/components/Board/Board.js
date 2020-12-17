import React from 'react';
import './Board.scss';
// import PropTypes from 'prop-types';
import {Square as SquareCmp} from '../Square/Square';
import {Square} from '../../models/Square';

export const Board = ({rows,columns,squares,onSquareClicked}) => {
    // TODO : render dynamic rows and columns
    return (
        <div className='board' >
            {squares.map(square=> <SquareCmp key={square.id} square={square} onSquareClicked={onSquareClicked}/>)}
        </div>
    )
}

Board.defaultProps = {
    rows:3,
    columns:3
}

Board.propTypes = {
    squares: function(props, propName, componentName) {
        let error = false;
        const {rows,colums} = props;
        const squares = props[propName]
        if(!squares ){
            error = true;
        }
        // ensure it is an array
        if (!Array.isArray(squares)) {
            error = true;
        }
        // ensure array has items
        else if (squares.length !== rows*colums) {
            error = true;
        }
        // ensure all items are strings
        else {
          for (let i = 0; i < squares.length; i++) {
            if (!squares[i] instanceof Square) {
                error = true;
                break;
            }
          }
        }
        // throw error
        if (error) {
          return new Error(
            `Invalid prop ${propName} supplied to 
             ${componentName} Validation failed.`
          );
        }
    }
}