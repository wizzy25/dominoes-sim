# Fun Fun Dominoes

## Introduction

Here is a dominoes game to play and take your time. Only twist is that you don't play but watch a gameplay simulation. 😃

The game is played by 2 players until a winner emerges. A winner emerges when a player runs out of dominoes or there is no possible domino to be played by both players

## Technical details
This package was created using [typescript v4](https://www.typescriptlang.org/) and consequently, the only dependencies are typescript-related dependencies.

### Requirements

In order to run this game, you need the following software installed on your machine:

* yarn preferred (or npm)
* node >= v12

### Installation and Build

* While in this directory from your command-line simply run `yarn install` (or `npm install`) to install the needed dependencies
* Run `yarn build` (or `npm run build`) to build the game
* Run `yarn start` (or `npm run start`) to begin the game

## Gameplay

The game begins by prompting for input names for both players (player 1 and player 2). After receiving the names, it asks if the player would like to play using an advanced strategy (more on that below). For this prompy a `"y"` means YES and all other inputs mean NO.
The game then proceeds to simulate turns by each player until a winner emerges.

### Advanced strategy

By default, each player is simulated to play a random domino they have on the board. However as the more skilled gamers should know, this is simply not enough. A skilled gamer should play strategically and so can a player in this simulation. To do this, `"y"` must be passed as the input when prompted.

The strategy employed here is to play all doubles as early as possible as there is less opportunity for continuity due to not changing the edge values and therefore to avoid being blocked ([Source](http://www.domino-play.com/Strategy.htm)).
