import { Domino } from "./domino";
import { GameBoard } from "./gameboard";

enum Edge {
    LEFT = "left",
    RIGHT = "right"
}

/**
 * Player class
 * class representation of a player and what they can actually do
 */
export class Player {
    private readonly dominoes: Domino[] = [];

    constructor(
        public readonly name: string,
        private readonly withStrategy = false
    ) {}

    public play(board: GameBoard): Domino | null {
        if (board.isEmpty) {
            const domino = this.removeDominoAtIndex(0);
            board.addFirstDomino(domino);
            return domino;
        }

        const { leftEdge, rightEdge } = board;

        const [dominoIndexToPlay, edgeToPlayAt, isHead] = this.getDominoIndexAndEdgeToPlay(
            leftEdge,
            rightEdge
        );

        if (dominoIndexToPlay === -1) {
            return null;
        }

        const domino = this.removeDominoAtIndex(dominoIndexToPlay);

        if (edgeToPlayAt === Edge.LEFT) {
            board.addDominoToLeftEdge(domino, isHead!);
        }

        if (edgeToPlayAt === Edge.RIGHT) {
            board.addDominoToRightEdge(domino, isHead!);
        }

        return domino;
    }

    public addDomino(tile: Domino): void {
        if (this.withStrategy) {
            if (tile.head === tile.tail) {
                this.dominoes.unshift(tile);
                return;
            }
        }

        this.dominoes.push(tile);
    }

    public hasPlayable(edge: number): boolean {
        for (let i = 0; i < this.dominoes.length; i++) {
            if (edge === this.dominoes[i].head) {
                return true;
            }

            if (edge === this.dominoes[i].tail) {
                return true;
            }
        }
        return false;
    }

    public get numOfTilesInHand(): number {
        return this.dominoes.length;
    }

    public get hasHandEmpty(): boolean {
        return this.dominoes.length === 0;
    }

    private getDominoIndexAndEdgeToPlay(
        leftEdge: number,
        rightEdge: number
    ): [number, Edge, boolean] | [number] {
        for (let i = 0; i < this.dominoes.length; i++) {
            if (this.dominoes[i].head === leftEdge) {
                return [i, Edge.LEFT, true];
            }

            if (this.dominoes[i].tail === leftEdge) {
                return [i, Edge.LEFT, false];
            }

            if (this.dominoes[i].head === rightEdge) {
                return [i, Edge.RIGHT, true];
            }

            if (this.dominoes[i].tail === rightEdge) {
                return [i, Edge.RIGHT, false];
            }
        }
        return [-1];
    }

    private removeDominoAtIndex(index: number): Domino {
        const [domino] = this.dominoes.splice(index, 1);
        return domino;
    }
}
