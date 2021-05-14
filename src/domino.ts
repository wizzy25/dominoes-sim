/**
 * Domino class
 * The representation of a single domino tile
 */
export class Domino {
    constructor(public head: number, public tail: number) {}

    public flip(): void {
        const temp = this.head;
        this.head = this.tail;
        this.tail = temp;
    }

    public get view(): string {
        return `{${this.head}:${this.tail}}`;
    }
}
