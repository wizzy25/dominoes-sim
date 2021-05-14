import * as readline from "readline";
import { promisify } from "util";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(rl.question as any)[promisify.custom] = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

export const prompt = promisify(rl.question) as unknown as (x: string) => Promise<string>;
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
