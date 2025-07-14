// src/lib/stores/coin.ts
import { writable } from 'svelte/store';

export const coins = writable(0); // parte da 0 monete
export const max_score = writable(0); // parte da 0 di punteggio massimo
export const skin_in_use = writable("/flappy.png"); // skin base
export const background_in_use = writable<string[]>([
    "/standard/1.png",
    "/standard/6.png",
    "/standard/ae.png",
    "/standard/origbig.png",
    "/standard/sfdgh.png",
    "/standard/tsrh.png",
]); // background base
export const owned_skins = writable<string[]>([
    "/flappy.png"
]);
