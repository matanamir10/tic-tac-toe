import React from 'react';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';
import { Game } from '../Game/Game';
import './App.scss';

export const App = () => {
  return (
    <div className='container'>
      <ErrorBoundary>
      <Game/>
      </ErrorBoundary>
    </div>
  )
}
