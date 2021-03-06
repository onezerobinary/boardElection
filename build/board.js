"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("./function");
const hasha_1 = __importDefault(require("hasha"));
const lodash_1 = __importDefault(require("lodash"));
// const hash = '4ceb86317d0d4dac6853663589ef02ccb67134cee75bb886a4410b7aedd0e109';
const prev_hash = '6bb1c89598c75ba1d4ee138091b51b5e905212cf1ffc4242b0d26545597154e3';
function getTickets(hash, numberOfTickets, accumulator) {
    let nextTicket = numberOfTickets - 1;
    if (nextTicket >= 0) {
        console.log(`0. For security do an hash of the input hash: ${hash}`);
        hash = hasha_1.default(hash, { algorithm: 'sha256' });
        console.log(`1. Starting hash: ${hash}`);
        const part1 = hash.slice(0, 8);
        const part2 = hash.slice(8, 16);
        const part3 = hash.slice(16, 24);
        const part4 = hash.slice(24, 32);
        const part5 = hash.slice(32, 40);
        const part6 = hash.slice(40, 48);
        const part7 = hash.slice(48, 56);
        const part8 = hash.slice(56, 64);
        console.log(`2. Split the hash in 8 parts:`);
        console.log(`Part 1: ${part1}`);
        console.log(`Part 2: ${part2}`);
        console.log(`Part 3: ${part3}`);
        console.log(`Part 4: ${part4}`);
        console.log(`Part 4: ${part5}`);
        console.log(`Part 4: ${part6}`);
        console.log(`Part 4: ${part7}`);
        console.log(`Part 4: ${part8}`);
        const partsHex = [part1, part2, part3, part4, part5, part6, part7, part8];
        const partsBinary = [];
        partsHex.map((part) => {
            partsBinary.push(function_1.hexToBinary(part));
        });
        console.log(`3. Trasform each part into binary`);
        console.log(`Binary Part 1:  ${partsBinary[0]}`);
        console.log(`Binary Part 2:  ${partsBinary[1]}`);
        console.log(`Binary Part 3:  ${partsBinary[2]}`);
        console.log(`Binary Part 4:  ${partsBinary[3]}`);
        console.log(`Binary Part 5:  ${partsBinary[4]}`);
        console.log(`Binary Part 6:  ${partsBinary[5]}`);
        console.log(`Binary Part 7:  ${partsBinary[6]}`);
        console.log(`Binary Part 8:  ${partsBinary[7]}`);
        console.log(`4. Compute the XOR between [part 1 - part 2] and [part 3 = part 4]`);
        const partialResult1 = function_1.binaryXOR(partsBinary[0], partsBinary[1]);
        const partialResult2 = function_1.binaryXOR(partsBinary[2], partsBinary[3]);
        console.log('Partial Result 1: ' + partialResult1);
        console.log('Partial Result 2: ' + partialResult2);
        const partialResult3 = function_1.binaryXOR(partsBinary[4], partsBinary[5]);
        const partialResult4 = function_1.binaryXOR(partsBinary[6], partsBinary[7]);
        console.log('Partial Result 3: ' + partialResult3);
        console.log('Partial Result 4: ' + partialResult4);
        const partialResult5 = function_1.binaryXOR(partialResult1, partialResult2);
        const partialResult6 = function_1.binaryXOR(partialResult3, partialResult4);
        console.log('Partial Result 3: ' + partialResult5);
        console.log('Partial Result 4: ' + partialResult6);
        console.log(`5. Compute the XOR between [partial resutl 1 and partial result 2]`);
        const finalBinaryResult = function_1.binaryXOR(partialResult5, partialResult6);
        console.log('Final Result    : ' + finalBinaryResult);
        console.log(`6. Trasform the Binary number into a decimal number and compute the modulo N function`);
        var ticket = parseInt(finalBinaryResult, 2) % 1000;
        console.log(`Decimal value: ${parseInt(finalBinaryResult, 2)} `);
        console.log('Ticket: ' + ticket);
        console.log(`7. Add the ticket to the list`);
        accumulator.push(ticket);
        console.log(`8. Generate the new hash based on the previous one and the current number of tickets`);
        let new_hash = hash + numberOfTickets;
        new_hash = hasha_1.default(new_hash, { algorithm: 'sha256' });
        console.log(`New hash: ${new_hash}`);
        // Recursion ..
        getTickets(new_hash, nextTicket, accumulator);
    }
}
function doStatistics() {
    const data = [];
    const iteractions = 3;
    const numberOfTickets = 10;
    for (let i = 0; i < iteractions; i++) {
        let random = Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        let hash = hasha_1.default(random, { algorithm: 'sha256' });
        const tickets = [];
        getTickets(hash, numberOfTickets, tickets);
        data.push({ key: hash, value: tickets });
    }
    // console.log(JSON.stringify(data));
    data.map((stat) => {
        // console.log(`Data Results: ${stat.key} - ${stat.value}`);
        console.log(lodash_1.default.groupBy(stat.value));
    });
}
exports.doStatistics = doStatistics;
