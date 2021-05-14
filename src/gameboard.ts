import { Domino } from "./domino";

export class GameBoard {
    public leftEdge: number;
    public rightEdge: number;
    private readonly dominoesLine: Domino[] = [];

    public addFirstDomino(domino: Domino): void {
        this.dominoesLine.push(domino);
        this.leftEdge = domino.head;
        this.rightEdge = domino.tail;
    }

    public addDominoToLeftEdge(domino: Domino, isHead: boolean): void {
        if (isHead) {
            domino.flip();
        }

        this.leftEdge = domino.head;
        this.dominoesLine.unshift(domino);
    }

    public addDominoToRightEdge(domino: Domino, isHead: boolean): void {
        if (!isHead) {
            domino.flip();
        }

        this.rightEdge = domino.tail;
        this.dominoesLine.push(domino);
    }

    public get isEmpty(): boolean {
        return this.dominoesLine.length === 0;
    }

    public get dominoLine(): string {
        return this.dominoesLine.map(({ view }) => view).join("");
    }
}
