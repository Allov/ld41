import React, { Component } from "react";
import PropTypes from "prop-types";
import { HexUtils, Path } from "react-hexgrid";

class Ennemy extends Component {
  static propTypes = {
    position: PropTypes.object,
    directions: PropTypes.array,
  };

  static contextTypes = {
    layout: PropTypes.object // TODO Shape
  };

  render() {
    const { position, directions } = this.props;
    const { layout } = this.context;
    const size = layout.size.x;

    const pixel = HexUtils.hexToPixel(position, layout);

    return [
      directions.map((x, i) =>
        <g className="ennemy"><Path key={i} start={position} end={HexUtils.neighbour(position, x)} /></g>
      ),
      <g key={directions.length} className="ennemy" transform={`translate(${pixel.x}, ${pixel.y})`}>
        <circle cx={0} cy={0} r={size / 2} />
      </g>
    ];
  }
}

export default Ennemy;
