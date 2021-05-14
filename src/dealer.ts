import { Domino } from "./domino";
import { Player } from "./player";

export class GameDealer {
    public readonly dominoes = this.startingDominoes;

    // Using the Fisher-Yates (aka Knuth) Shuffle algorithm
    // https://git.daplie.com/Daplie/knuth-shuffle
    public shuffleDominoes(): void {
        let currentIndex = this.dominoes.length;
        let randomIndex: number;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            const temporaryValue = this.dominoes[currentIndex];
            this.dominoes[currentIndex] = this.dominoes[randomIndex];
            this.dominoes[randomIndex] = temporaryValue;
        }
    }

    public deal(player: Player, amountToDeal: number): void {
        for (let i = 0; i < amountToDeal; i++) {
            player.addDomino(this.dominoes.pop()!);
        }
    }

    public get canDeal(): boolean {
        return !!this.dominoes.length;
    }

    private get startingDominoes(): Domino[] {
        const dominoes: Domino[] = [];
        for (let i = 0; i <= 6; i++) {
            for (let j = 0; j <= i; j++) {
                dominoes.push(new Domino(i, j));
            }
        }

        return dominoes;
    }
}
