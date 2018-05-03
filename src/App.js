import React, { Component } from "react";
import uuid from "uuid/v4";
import { getRandomInt } from "./helpers/math";
import { prompt } from "./helpers/string";
import PlayerStats from "./PlayerStats";
import GameStats from "./GameStats";
import Map from "./Map";
import Dialog from "./Dialog";

import HexUtils from "react-hexgrid/lib/HexUtils";

import { PASSABLE, START, END, IMPASSABLE, DESTRUCTIBLE } from "./constants";
import maps from "./Maps";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    const currentMap = 0;
    //const hexagons = GridGenerator.spiral({ q: 0, r: 0, s: 0 }, gridSize).map(

    // const ennemy1 = {
    //   bullets: [],
    // };
    // ennemy1.position = this.getStartPosition(hexagons, ennemy1);

    // const ennemy2 = {
    //   bullets: [],
    // };
    // ennemy2.position = this.getStartPosition(hexagons, ennemy2);

    this.playTypingSound = this.playTypingSound.bind(this);
    const player = {
      commits: 4,
      maxCommits: 4,
      tools: [],
      position: {
        rotation: 0
      }
    };

    this.state = {
      path: {
        start: null,
        end: null
      },
      selectStart: false,
      selectEnd: false,
      size: { x: 5, y: 5 },
      currentMap: currentMap,
      map: maps[currentMap],
      // ennemies: [ennemy1, ennemy2],
      game: {
        currentTurn: 0,
        remainingTurns: 10
      },
      showCoordinates: false,
      loading: true,
      logs: [],
      ...this.getNextMapState(currentMap - 1, player)
    };
  }

  componentDidMount() {
    this.typingSound = document.getElementById("typing");
    this.typingSmallSound = document.getElementById("typing-small");
    this.typingMediumSound = document.getElementById("typing-medium");
    this.initializeMapSound = document.getElementById("initialize-map");
    this.setState({
      loading: false
    });
  }

  playTypingSound(length) {
    if (length < 15) {
      // this.typingSmallSound.play();
    } else if (length > 23) {
      // this.typingSound.play();
    } else {
      // this.typingMediumSound.play();
    }
  }

  showMap() {
    this.setState({
      nextMap: true
    });

    setTimeout(
      () =>
        this.setState({
          showMap: true
        }),
      1000
    );
  }

  nextMap() {
    this.setState(
      this.getNextMapState(this.state.currentMap, this.state.player)
    );
  }

  getNextMapState(currentMap, player) {
    const nextMapIndex = currentMap + 1;
    if (nextMapIndex >= maps.length) {
      throw "no more maps";
    }

    const tools = maps[nextMapIndex].tools;

    player.position = {
      ...player.position,
      ...this.getStartPosition(maps[nextMapIndex].tiles)
    };

    player.commits = player.maxCommits;
    player.tools = player.tools.concat(tools);

    const logs = [];
    if (tools) {
      for (let tool of tools) {
        logs.push({ log: prompt(`.add-command ${tool}`), type: "log" });
        logs.push({
          log: prompt(`installed ${tool} command successfuly.`),
          type: "success"
        });
      }
    }

    const ennemies = maps[nextMapIndex].tiles
      .filter(x => x.ennemy)
      .map(x => ({
        ...x.ennemy,
        position: {
          q: x.q,
          r: x.r,
          s: x.s,
        }
      }));

    return {
      nextMap: false,
      showMap: false,
      ending: false,
      currentMap: nextMapIndex,
      map: maps[nextMapIndex],
      player: player,
      ennemies,
      logs
    };
  }

  trySync(h) {
    const { player, logs } = this.state;

    this.setState({
      player: {
        ...player,
        commits: player.maxCommits
      },
      logs: logs.concat([
        { log: prompt(`.sync`), type: "log" },
        { log: `no conflict. commit restored.`, type: "success" }
      ])
    });
  }

  mapInitialized() {
    // this.initializeMapSound.play();
  }

  onSelectTile(e, source) {
    const selectStart = !this.state.selectStart;
    const selectEnd = this.state.selectStart;
    const hex = source.state.hex;

    let start = selectStart && !selectEnd ? hex : null;
    if (selectEnd) {
      start = this.state.path.start;
    }

    let end = selectEnd ? hex : null;

    this.setState({
      path: {
        start: start,
        end: end
      },
      selectStart: selectStart,
      selectEnd: selectEnd
    });
  }

  onToggleCoordinates() {
    this.setState({
      showCoordinates: !this.state.showCoordinates
    });
  }

  onRotatePlayer() {
    this.setState({
      player: {
        ...this.state.player,
        position: {
          ...this.state.player.position,
          rotation: this.state.player.position.rotation + 60
        }
      }
    });
  }

  getRandomStartPosition(hexagons, entity) {
    let validHexagons = hexagons.filter(x => x.type === PASSABLE && !x.entity);
    let hex = validHexagons[getRandomInt(0, validHexagons.length - 1)];
    const entities = hexagons.filter(x => x.entity);

    let valid = (hex, entities) => {
      const s =
        entities.filter(x => {
          const dist = HexUtils.distance(hex, x);
          return dist > 4;
        }).length === entities.length;

      return entities.length === 0 || s;
    };

    let i = 0;
    while (!valid(hex, entities)) {
      // validHexagons = validHexagons.filter(x => !HexUtils.equals(hex, x));
      // if (validHexagons.length === 0) {
      //   console.log('humm');
      //   break;
      // };
      hex = validHexagons[getRandomInt(0, validHexagons.length - 1)];
      i++;
    }

    // console.log(i);

    hex.entity = entity;
    return hex;
  }

  getStartPosition(hexagons) {
    return hexagons.find(h => h.start);
  }

  getValidNeighbours(hex, hexagons) {
    const neighbours = HexUtils.neighbours(hex);

    return neighbours.filter(h => {
      const foundHex = hexagons.find(x => {
        return HexUtils.equals(h, x);
      });
      if (foundHex) {
        return foundHex.type === PASSABLE;
      }

      return false;
    });
  }

  doAction(desiredPosition) {
    const { player, map, logs, ending } = this.state;

    if (ending) return;

    let destination = player.position;

    const finalDestination = map.tiles.find(tile =>
      HexUtils.equals(desiredPosition.state.hex, tile)
    );

    const distance = HexUtils.distance(
      desiredPosition.state.hex,
      player.position
    );

    let action = {};
    let valid = !!finalDestination && player.commits > 0;
    if (
      valid &&
      distance === 1 &&
      player.tools.includes(".move") &&
      (finalDestination.type === PASSABLE ||
        finalDestination.type === START ||
        finalDestination.type === END)
    ) {
      destination = finalDestination;
      action.a = ".move";
      action.m = "moved";
    } else if (
      valid &&
      distance === 1 &&
      player.tools.includes(".delete") &&
      finalDestination.type === DESTRUCTIBLE
    ) {
      finalDestination.type = PASSABLE;
      action.a = ".delete";
      action.m = "deleted";
    } else if (
      valid &&
      player.commits > 1 &&
      distance === 2 &&
      player.tools.includes(".warp") &&
      finalDestination.type === PASSABLE
    ) {
      player.commits = 0;
      destination = finalDestination;
      action.a = ".warp";
      action.m = ".warped";
    } else {
      valid = false;
    }

    if (valid) {
      const cm = `${action.m} to ${HexUtils.getID(finalDestination)}`;
      logs.push({
        log: prompt(`${action.a} ${HexUtils.getID(finalDestination)}`),
        type: "log"
      });
      logs.push({
        log: prompt(`.commit -am "${cm}"`),
        type: "log"
      });
      logs.push({
        log: `[master ${uuid().split("-")[0]}] ${cm}`,
        type: "success"
      });

      let isEnd = false;
      if (finalDestination.end) {
        logs.push({
          log: prompt(".push -f"),
          type: "success"
        });
        setTimeout(() => this.nextMap(), 2000);
        isEnd = true;
      }

      player.commits = player.commits - 1;

      if (player.commits <= 0) {
        player.commits = 0;
        logs.push({
          log: `no more commit space. please .sync to synchronize`,
          type: "error"
        });
      }

      this.setState({
        error: "",
        player: {
          ...player,
          position: {
            ...destination,
            rotation: player.position.rotation
          }
        },
        logs,
        ending: isEnd
      });
    } else if (player.commits === 0) {
      logs.push({
        log: `no more commit space. please .sync to synchronize`,
        type: "error"
      });
      this.setState({
        logs
      });
    } else {
      logs.push({
        log: prompt(`.unknown ${HexUtils.getID(finalDestination)}"`),
        type: "log"
      });
      logs.push({
        log: `error: unknown command for destination.`,
        type: "error"
      });
      this.setState({
        logs
      });
    }
  }

  render() {
    const { map, loading, showMap, nextMap, player, logs, ending, ennemies } = this.state;

    if (loading)
      return (
        <div className="App">
          <p>Loading...</p>
        </div>
      );

    return (
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title">Bullet Hell</h1>
        </header>
        <GameStats {...game} /> */}
        {showMap && (
          <div className={ending ? "fadeout-long" : ""}>
            <Map
              map={map}
              showCoordinates={this.state.showCoordinates}
              player={player}
              ennemies={ennemies}
              onMapInitialized={() => this.mapInitialized()}
              onSelectTile={(e, h) => this.doAction(h)}
              onClickShip={(e, h) => this.trySync(h)}
            />
            <PlayerStats {...player} />
            {player.commits === 0 && (
              <button className="sync" onClick={() => this.trySync()} />
            )}
            {logs &&
              player.commits > 0 &&
              showMap && (
                <div className="logs">
                  {logs
                    .slice()
                    .reverse()
                    .map((log, i) => (
                      <p key={i} className={`log ${log.type}`}>
                        {log.log}
                      </p>
                    ))}
                </div>
              )}
          </div>
        )}
        {!showMap && (
          <div className={`dialog-container ${nextMap ? "fadeout" : ""}`}>
            <Dialog
              lines={map.dialogs}
              onStartLine={length => this.playTypingSound(length)}
              onClickNext={() => this.showMap()}
            />
          </div>
        )}
        {/* <button>Next turn</button>
        <button onClick={() => this.onToggleCoordinates()}>Coords</button>
        <button onClick={() => this.onRotatePlayer()}>Rotate</button> */}
      </div>
    );
  }
}

export default App;
