import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HexUtils, Hex } from 'react-hexgrid';
import { equilateral } from './helpers/math'

class Ship extends Component {
  static propTypes = {
    q: PropTypes.number,
    r: PropTypes.number,
    s: PropTypes.number,
    rotation: PropTypes.number,
    onClickShip: PropTypes.func,
    canClick: PropTypes.bool,
  };

  static contextTypes = {
    layout: PropTypes.object, // TODO Shape
  };

  onClickShip(e, h) {
    this.props.onClickShip(e, h);
  }

  render() {
    const { q, r, s, rotation, canClick } = this.props;
    const { layout } = this.context;
    const size = layout.size.x;

    const hex = new Hex(q, r, s);

    const pixel = HexUtils.hexToPixel(hex, layout);
    const points = equilateral(size, [size / 2, size / 2]);

    return (
      <g
        className="ship-group"
        transform={`rotate(${rotation} ${pixel.x}, ${pixel.y}) translate(${pixel.x - (size / 2)}, ${pixel.y - (size / 2)})`}
        onClick={(e) => this.onClickShip(e, hex)}
      >
        <g className="ship">
          <polygon points={points} />
          <g className={canClick ? 'need-sync' : 'cockpit'}
            transform={`scale(0.5) translate(${size / 2} 0)`}
          >
            <polygon points={points} />
          </g>
          {/* <g className="cockpit"
            transform={`scale(0.5) translate(0 ${size - 1})`}
          >
            <polygon points={points} />
          </g>
          <g className="cockpit"
            transform={`scale(0.5) translate(${size} ${size - 1})`}
          >
            <polygon points={points} />
          </g> */}
        </g>
      </g>
    );
  }
}

export default Ship;
