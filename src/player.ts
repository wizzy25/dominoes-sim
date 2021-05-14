import { Domino } from "./domino";
import { GameBoard } from "./gameboard";

enum Edge {
    LEFT = "left",
    RIGHT = "right"
}

export class Player {
    private readonly dominoes: Domino[] = [];

    constructor(
        public readonly name: string,
        private readonly board: GameBoard,
        private readonly withStrategy = false
    ) {}

    public play(): Domino | null {
        if (this.board.isEmpty) {
            const domino = this.removeDominoAtIndex(0);
            this.board.addFirstDomino(domino);
            return domino;
        }

        const [dominoIndexToPlay, edgeToPlayAt, isHead] = this.getDominoIndexAndEdgeToPlay();

        if (dominoIndexToPlay === -1) {
            return null;
        }

        const domino = this.removeDominoAtIndex(dominoIndexToPlay);

        if (edgeToPlayAt === Edge.LEFT) {
            this.board.addDominoToLeftEdge(domino, isHead!);
        }
        if (edgeToPlayAt === Edge.RIGHT) {
            this.board.addDominoToRightEdge(domino, isHead!);
        }
        return domino;
    }

    private getDominoIndexAndEdgeToPlay(): [number, Edge, boolean] | [number] {
        for (let i = 0; i < this.dominoes.length; i++) {
            if (this.dominoes[i].head === this.board.leftEdge) {
                return [i, Edge.LEFT, true];
            }
            if (this.dominoes[i].tail === this.board.leftEdge) {
                return [i, Edge.LEFT, false];
            }

            if (this.dominoes[i].head === this.board.rightEdge) {
                return [i, Edge.RIGHT, true];
            }
            if (this.dominoes[i].tail === this.board.rightEdge) {
                return [i, Edge.RIGHT, false];
            }
        }
        return [-1];
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

    public removeDominoAtIndex(index: number): Domino {
        const [domino] = this.dominoes.splice(index, 1);
        return domino;
    }

    public getPlayable(edge: number): [number, boolean] | undefined {
        for (let i = 0; i < this.dominoes.length; i++) {
            if (edge === this.dominoes[i].head) {
                return [i, true];
            }
            if (edge === this.dominoes[i].tail) {
                return [i, false];
            }
        }
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
}
