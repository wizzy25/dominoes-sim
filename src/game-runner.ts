import { GameDealer } from "./dealer";
import { GameBoard } from "./gameboard";
import { Player } from "./player";
import { delay, prompt } from "./utils";

/**
 * GameRunner class
 * Executes the gameplay and serves as an entry point to the game
 */
export class GameRunner {
    private readonly strategyForKey = "y";
    private readonly startingDominoesCount = 7;
    private readonly numberOfPlayers = 2;
    private readonly delayBetweenTurns = 500; // ms
    private readonly board = new GameBoard();
    private readonly dealer = new GameDealer();
    private readonly playerList: Player[] = [];
    private gameOver = false;
    private playerOnTurn: Player;

    public async start() {
        await this.setupPlayers();

        this.dealer.shuffleDominoes();

        this.playerList.forEach((player) => {
            for (let i = 0; i < this.startingDominoesCount; i++) {
                player.addDomino(this.dealer.getDomino());
            }
        });

        this.playerOnTurn = this.playerList[Math.floor(Math.random() * this.numberOfPlayers)];

        while (!this.gameOver) {
            await delay(this.delayBetweenTurns);
            this.switchPlayerTurn();
            this.play();
            this.gameOverCheck();
        }

        this.endGameSequence();
    }

    private async setupPlayers(): Promise<void> {
        for (let i = 1; i <= this.numberOfPlayers; i++) {
            const playerName = await this.getName(i);
            const useAdvancedStrategy = await this.getshouldUseStrategy();

            this.playerList.push(new Player(playerName.trim(), this.board, useAdvancedStrategy));
        }
    }

    private play(): void {
        const playedDomino = this.playerOnTurn.play();
        if (!playedDomino) {
            if (this.dealer.canDeal) {
                this.playerOnTurn.addDomino(this.dealer.getDomino())
                console.log(
                    `\n${this.playerOnTurn.name} has no playable domino and picks one from the stack`
                );
                this.play();
            }
            return;
        }

        console.log(
            `\n${this.playerOnTurn.name} plays ${playedDomino.view} and has ${this.playerOnTurn.numOfTilesInHand} dominoes left`
        );
        console.log(`Current Dominoes Line: ${this.board.dominoLine}`);
    }

    private async getName(index: number): Promise<string> {
        const data = await prompt(`Enter name for player ${index}: \n`);
        const name = data.trim();

        return name.length ? name : this.getName(index);
    }

    private async getshouldUseStrategy(): Promise<boolean> {
        const shouldUseAdvancedStrategy = await prompt(
            `Would you like to play with an advanced strategy?: Only "y" would mean Yes! \n`
        );

        return shouldUseAdvancedStrategy === this.strategyForKey;
    }

    private gameOverCheck(): void {
        const playCanContinue = this.playerList.find(
            (player) =>
                player.hasPlayable(this.board.rightEdge) || player.hasPlayable(this.board.leftEdge)
        );

        if (this.playerOnTurn.hasHandEmpty || (!playCanContinue && !this.dealer.canDeal)) {
            this.gameOver = true;
        }
    }

    private endGameSequence(): void {
        const winner = this.playerOnTurn;
        const message = winner.hasHandEmpty
            ? `${winner.name} wins the game!!! by having no tiles left!!!`
            : `${winner.name} wins the game!!! by blocking the game!!!`;
        console.log(message);
        process.exit();
    }

    private switchPlayerTurn(): void {
        const playerPosition = this.playerList.indexOf(this.playerOnTurn);
        const isLastPlayer = playerPosition === this.playerList.length - 1;

        if (isLastPlayer) {
            this.playerOnTurn = this.playerList[0];
        } else {
            this.playerOnTurn = this.playerList[playerPosition + 1];
        }
    }
}
