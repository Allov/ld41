import React, { Component } from "react";
import PropTypes from "prop-types";
import { HexUtils, Hex } from 'react-hexgrid';

class Bullet extends Component {
  static propTypes = {
    q: PropTypes.number,
    r: PropTypes.number,
    s: PropTypes.number,
  };

  static contextTypes = {
    layout: PropTypes.object // TODO Shape
  };

  render() {
    const { q, r, s } = this.props;
    const { layout } = this.context;
    const size = layout.size.x;

    const pixel = HexUtils.hexToPixel(new Hex(q, r, s), layout);

    return (
      <circle
        transform={`translate(${pixel.x}, ${pixel.y})`}
        cx={0}
        cy={0}
        r={size / 2 * 0.5}
        className="bullet"
      />
    );
  }
}

export default Bullet;
