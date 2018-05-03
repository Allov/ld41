import { PASSABLE, IMPASSABLE, DESTRUCTIBLE, START, END } from './constants';
import { prompt } from './helpers/string';

const delay = 4000;

export default [
  {
    title: ".commit",
    size: { x: 8, y: 8 },
    isBlurry: true,
    dialogsStyle: 'left',
    tools: ['.sync', '.push', '.move'],
    dialogs: [
      { text: prompt("cd /dev"), delay: 0 },
      { text: prompt("mkdir .commit"), delay: 1000 },
      { text: prompt(".commit init"), delay: 1000 },
      { text: "  initializing [..............]", delay: 1000 },
      { text: "  .commit ready in /dev/.commit", delay: 1000 },
      { text: prompt(""), delay: 250 },
    ],
    tiles: [
      { q: 0, r: 2, s: -2, type: START, start: true },
      { q: 0, r: 1, s: -1, type: PASSABLE },
      { q: 0, r: 0, s: 0, type: END, end: true },
    ],
  },
  {
    title: ".awakening",
    size: { x: 8, y: 8 },
    isBlurry: true,
    tools: [],
    dialogs: [
      { text: "0: hey...", delay: 0 },
      { text: "0: you're awake. nice.", delay },
      { text: "1: what time is it?", delay },
      { text: "0: it doesn't matter, you're fine now.", delay },
      { text: "1: i'm so dizzy.", delay },
      { text: "0: follow me...", delay: 1000 },
    ],
    tiles: [
      { q: 0, r: 2, s: -2, type: START, start: true },
      { q: 0, r: 1, s: -1, type: PASSABLE },
      { q: 0, r: 0, s: 0, type: PASSABLE },
      { q: 0, r: -1, s: 1, type: IMPASSABLE },
      { q: -1, r: 0, s: 1, type: PASSABLE },
      { q: -1, r: -1, s: 2, type: PASSABLE },
      { q: 0, r: -2, s: 2, type: END, end: true },
    ],
  },
  {
    title: ".debris",
    size: { x: 8, y: 8 },
    isBlurry: true,
    tools: ['.delete'],
    dialogs: [
      { text: "1: why is everything so blurry...", delay: 0 },
      { text: "1: and this headache is awful.", delay },
      { text: "0: take it slow, no need to hurry.", delay: 1000 },
    ],
    tiles: [
      { q: 0, r: 2, s: -2, type: START, start: true },
      { q: 0, r: 1, s: -1, type: DESTRUCTIBLE },
      { q: -1, r: +2, s: -1, type: IMPASSABLE },
      { q: -1, r: +3, s: -2, type: IMPASSABLE },
      { q: 0, r: 0, s: 0, type: PASSABLE },
      { q: 0, r: -1, s: 1, type: DESTRUCTIBLE },
      { q: -1, r: 0, s: 1, type: IMPASSABLE },
      { q: -1, r: -1, s: 2, type: IMPASSABLE },
      { q: 1, r: -1, s: 0, type: IMPASSABLE },
      { q: 1, r: 0, s: -1, type: IMPASSABLE },
      { q: 0, r: -2, s: 2, type: END, end: true },
    ],
  },
  {
    title: ".outside",
    size: { x: 5, y: 5 },
    isBlurry: true,
    tools: ['.warp'],
    dialogs: [
      { text: "0: i like to come here... it's peaceful", delay: 0 },
      { text: "1: ...", delay: 1000 },
    ],
    tiles: [
      // LEFT
      { q: -3, r: 3, s: 0, type: IMPASSABLE },
      { q: -3, r: 2, s: 1, type: IMPASSABLE },
      { q: -3, r: 1, s: 2, type: PASSABLE },
      { q: -3, r: 0, s: 3, type: DESTRUCTIBLE },

      { q: -2, r: 3, s: -1, type: DESTRUCTIBLE },
      { q: -2, r: 2, s: 0, type: IMPASSABLE },
      { q: -2, r: 1, s: 1, type: IMPASSABLE },
      { q: -2, r: 0, s: 2, type: DESTRUCTIBLE },
      { q: -2, r: -1, s: 3, type: DESTRUCTIBLE },

      { q: -1, r: 3, s: -2, type: IMPASSABLE },
      { q: -1, r: 2, s: -1, type: DESTRUCTIBLE },
      { q: -1, r: 1, s: 0, type: DESTRUCTIBLE },
      { q: -1, r: 0, s: 1, type: IMPASSABLE },
      { q: -1, r: -1, s: 2, type: IMPASSABLE },
      { q: -1, r: -2, s: 3, type: PASSABLE },

      // CENTER
      { q: 0, r: 3, s: -3, type: START, start: true },
      { q: 0, r: 2, s: -2, type: IMPASSABLE },
      { q: 0, r: 1, s: -1, type: PASSABLE },
      { q: 0, r: 0, s: -0, type: IMPASSABLE },
      { q: 0, r: -1, s: 1, type: PASSABLE },
      { q: 0, r: -2, s: 2, type: IMPASSABLE },
      { q: 0, r: -3, s: 3, type: END, end: true },

      // RIGHT
      { q: 1, r: 2, s: -3, type: IMPASSABLE },
      { q: 1, r: 1, s: -2, type: PASSABLE },
      { q: 1, r: 0, s: -1, type: DESTRUCTIBLE },
      { q: 1, r: -1, s: 0, type: IMPASSABLE },
      { q: 1, r: -2, s: 1, type: IMPASSABLE },
      { q: 1, r: -3, s: 2, type: IMPASSABLE },

      { q: 2, r: 1, s: -3, type: PASSABLE },
      { q: 2, r: 0, s: -2, type: DESTRUCTIBLE },
      { q: 2, r: -1, s: -1, type: IMPASSABLE },
      { q: 2, r: -2, s: 0, type: IMPASSABLE },
      { q: 2, r: -3, s: 1, type: IMPASSABLE },

      { q: 3, r: 0, s: -3, type: DESTRUCTIBLE },
      { q: 3, r: -1, s: -2, type: IMPASSABLE },
      { q: 3, r: -2, s: -1, type: IMPASSABLE },
      { q: 3, r: -3, s: 0, type: IMPASSABLE },
    ],
  },
  {
    title: ".combat(0)",
    size: { x: 8, y: 8 },
    isBlurry: true,
    tools: [],
    dialogs: [
      { text: "0: soon, i'll need your help.", delay },
      { text: "0: will you help me?", delay },
      { text: "1: i guess. Do I even have a choice?", delay: 1000 },
      { text: "0: ...", delay: 1000 },
    ],
    tiles: [
      { q: 0, r: 2, s: -2, type: START, start: true },
      { q: 0, r: 1, s: -1, type: PASSABLE },
      { q: 0, r: 0, s: 0, type: PASSABLE, ennemy: { directions: [1, 3, 5] } },
      { q: 0, r: -1, s: 1, type: IMPASSABLE },
      { q: -1, r: 0, s: 1, type: PASSABLE },
      { q: -1, r: -1, s: 2, type: PASSABLE },
      { q: 0, r: -2, s: 2, type: END, end: true },
    ],
  },
  {
    title: ".combat(1)",
    size: { x: 5, y: 5 },
    isBlurry: true,
    tools: [],
    dialogs: [
      { text: "1: what... what was that?", delay },
      { text: "0: they started to appear not so long ago.", delay },
      { text: "1: but why are they hurting me?", delay: 1000 },
      { text: "0: you have to be strong.", delay: 1000 },
    ],
    tiles: [
      // LEFT
      { q: -3, r: 3, s: 0, type: IMPASSABLE },
      { q: -3, r: 2, s: 1, type: PASSABLE, ennemy: { directions: [0, 2, 4] } },
      { q: -3, r: 1, s: 2, type: PASSABLE },
      { q: -3, r: 0, s: 3, type: PASSABLE },

      { q: -2, r: 3, s: -1, type: IMPASSABLE },
      { q: -2, r: 2, s: 0, type: IMPASSABLE },
      { q: -2, r: 1, s: 1, type: DESTRUCTIBLE },
      { q: -2, r: 0, s: 2, type: PASSABLE },
      { q: -2, r: -1, s: 3, type: PASSABLE },

      { q: -1, r: 3, s: -2, type: IMPASSABLE },
      { q: -1, r: 2, s: -1, type: PASSABLE },
      { q: -1, r: 1, s: 0, type: PASSABLE },
      { q: -1, r: 0, s: 1, type: PASSABLE },
      { q: -1, r: -1, s: 2, type: DESTRUCTIBLE },
      { q: -1, r: -2, s: 3, type: PASSABLE, ennemy: { directions: [1, 3, 5] } },

      // CENTER
      { q: 0, r: 3, s: -3, type: START, start: true },
      { q: 0, r: 2, s: -2, type: PASSABLE },
      { q: 0, r: 1, s: -1, type: PASSABLE },
      { q: 0, r: 0, s: -0, type: DESTRUCTIBLE },
      { q: 0, r: -1, s: 1, type: PASSABLE },
      { q: 0, r: -2, s: 2, type: PASSABLE },
      { q: 0, r: -3, s: 3, type: END, end: true },

      // RIGHT
      { q: 1, r: 2, s: -3, type: IMPASSABLE },
      { q: 1, r: 1, s: -2, type: PASSABLE },
      { q: 1, r: 0, s: -1, type: PASSABLE },
      { q: 1, r: -1, s: 0, type: PASSABLE },
      { q: 1, r: -2, s: 1, type: PASSABLE },
      { q: 1, r: -3, s: 2, type: PASSABLE },

      { q: 2, r: 1, s: -3, type: IMPASSABLE },
      { q: 2, r: 0, s: -2, type: IMPASSABLE },
      { q: 2, r: -1, s: -1, type: DESTRUCTIBLE },
      { q: 2, r: -2, s: 0, type: PASSABLE },
      { q: 2, r: -3, s: 1, type: PASSABLE },

      { q: 3, r: 0, s: -3, type: IMPASSABLE },
      { q: 3, r: -1, s: -2, type: PASSABLE },
      { q: 3, r: -2, s: -1, type: PASSABLE },
      { q: 3, r: -3, s: 0, type: PASSABLE, ennemy: { directions: [0, 2, 4] } },
    ],
  },
  {
    title: ".combat(2)",
    size: { x: 5, y: 5 },
    isBlurry: true,
    tools: [],
    dialogs: [
      { text: "1: it hurts so much, I need to rest.", delay },
      { text: "0: take it slow, this won't be easy.", delay },
    ],
    tiles: [
      // LEFT
      { q: -3, r: 3, s: 0, type: IMPASSABLE },
      { q: -3, r: 2, s: 1, type: PASSABLE, ennemy: { directions: [0, 2, 4] } },
      { q: -3, r: 1, s: 2, type: PASSABLE },
      { q: -3, r: 0, s: 3, type: PASSABLE },

      { q: -2, r: 3, s: -1, type: IMPASSABLE },
      { q: -2, r: 2, s: 0, type: IMPASSABLE },
      { q: -2, r: 1, s: 1, type: DESTRUCTIBLE },
      { q: -2, r: 0, s: 2, type: PASSABLE },
      { q: -2, r: -1, s: 3, type: PASSABLE },

      { q: -1, r: 3, s: -2, type: IMPASSABLE },
      { q: -1, r: 2, s: -1, type: PASSABLE },
      { q: -1, r: 1, s: 0, type: PASSABLE },
      { q: -1, r: 0, s: 1, type: PASSABLE },
      { q: -1, r: -1, s: 2, type: DESTRUCTIBLE },
      { q: -1, r: -2, s: 3, type: PASSABLE, ennemy: { directions: [1, 3, 5] } },

      // CENTER
      { q: 0, r: 3, s: -3, type: IMPASSABLE },
      { q: 0, r: 2, s: -2, type: PASSABLE },
      { q: 0, r: 1, s: -1, type: PASSABLE },
      { q: 0, r: 0, s: -0, type: START, start: true },
      { q: 0, r: -1, s: 1, type: PASSABLE },
      { q: 0, r: -2, s: 2, type: PASSABLE },
      { q: 0, r: -3, s: 3, type: END, end: true },

      // RIGHT
      { q: 1, r: 2, s: -3, type: IMPASSABLE },
      { q: 1, r: 1, s: -2, type: PASSABLE },
      { q: 1, r: 0, s: -1, type: PASSABLE },
      { q: 1, r: -1, s: 0, type: PASSABLE },
      { q: 1, r: -2, s: 1, type: PASSABLE },
      { q: 1, r: -3, s: 2, type: PASSABLE },

      { q: 2, r: 1, s: -3, type: IMPASSABLE },
      { q: 2, r: 0, s: -2, type: IMPASSABLE },
      { q: 2, r: -1, s: -1, type: DESTRUCTIBLE },
      { q: 2, r: -2, s: 0, type: PASSABLE },
      { q: 2, r: -3, s: 1, type: PASSABLE },

      { q: 3, r: 0, s: -3, type: IMPASSABLE },
      { q: 3, r: -1, s: -2, type: PASSABLE },
      { q: 3, r: -2, s: -1, type: PASSABLE },
      { q: 3, r: -3, s: 0, type: PASSABLE, ennemy: { directions: [0, 2, 4] } },
    ],
  },
];
