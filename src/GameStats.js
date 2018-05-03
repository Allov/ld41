import React from 'react';
import PropTypes from 'prop-types';

const GameStats = (props) => (
  <div>
    Current turn: {props.currentTurn} Remaining turns: {props.remainingTurns}
  </div>
);

GameStats.propTypes = {
  currentTurn: PropTypes.number.isRequired,
  remainingTurns: PropTypes.number.isRequired,
};

export default GameStats;
