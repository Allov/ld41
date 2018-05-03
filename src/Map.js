import React, { Component } from "react";
import PropTypes from "prop-types";
import { HexGrid, Layout, Hexagon, Text, Path } from 'react-hexgrid';
import { PASSABLE, IMPASSABLE, DESTRUCTIBLE, START, END } from './constants';
import Ship from './Ship';
import Ennemy from './Ennemy';

export default class Map extends Component {
  static propTypes = {
    map: PropTypes.object,
    showCoordinates: PropTypes.bool,
    player: PropTypes.object,
    onMapInitialized: PropTypes.func,
    onSelectTile: PropTypes.func,
    onClickShip: PropTypes.func,
    ennemies: PropTypes.array,
  };

  getClassFromHexType(hex) {
    switch (hex.type) {
      case START:
        return 'start';
      case END:
        return 'end';
      case IMPASSABLE:
        return 'impassable';
      case DESTRUCTIBLE:
        return 'destructible';
      case PASSABLE:
      default:
        return 'passable';
    }
  }

  componentDidMount() {
    this.props.onMapInitialized();
  }

  onClickShip(e, h) {
    this.props.onClickShip(e, h);
  }

  render() {
    const { map, player, onSelectTile, showCoordinates, ennemies } = this.props;
    const { tiles, size } = map;

    return (
      <HexGrid width="100%" height="100%">
        <Layout size={size} spacing={1.1}>
          {tiles.map((hex, i) => (
            <Hexagon
              key={i}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              className={this.getClassFromHexType(hex)}
              onClick={(e, h) => onSelectTile(e, h)}
            >
              {showCoordinates && (
                <Text>{`${hex.q} ${hex.r} ${hex.s}`}</Text>
              )}
            </Hexagon>
          ))}
          {/* <Path start={path.start} end={path.end} /> */}
          <Ship {...player.position} canClick={player.commits === 0} onClickShip={(e, h) => this.onClickShip(e, h) } />
          {ennemies &&
            ennemies.map((ennemy, i) => [
              <Ennemy
                key={i}
                {...ennemy}
              />,
            ])}
        </Layout>
      </HexGrid>
    );
  }
}
