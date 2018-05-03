import React from 'react';
import PropTypes from 'prop-types';

import './PlayerStats.css';

const PlayerStats = (props) => (
  <p className="player-commits">.commits [{[...Array(props.commits)].map((x, i) => '■')}{props.maxCommits - props.commits > 0 && [...Array(props.maxCommits - props.commits)].map((x, i) => '□')}]</p>
);

PlayerStats.propTypes = {
  commits: PropTypes.number.isRequired,
  maxCommits: PropTypes.number.isRequired,
};

export default PlayerStats;
