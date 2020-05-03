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
        //const hash_number = hexToBinary(hash)
        //console.log('hash_number: '+ hash_number)
        //let part_hash: number[] = intToVec(hash_number)
        const part1 = hash.slice(0, 8);
        const part2 = hash.slice(8, 16);
        const part3 = hash.slice(16, 24);
        const part4 = hash.slice(24, 32);
        const part5 = hash.slice(32, 40);
        const part6 = hash.slice(40, 48);
        const part7 = hash.slice(48, 56);
        const part8 = hash.slice(56, 64);
        console.log(`2. Split the hash into eight parts:  `);
        console.log(`Part 1: ${part1}`);
        console.log(`Part 2: ${part2}`);
        console.log(`Part 3: ${part3}`);
        console.log(`Part 4: ${part4}`);
        console.log(`Part 5: ${part5}`);
        console.log(`Part 6: ${part6}`);
        console.log(`Part 7: ${part7}`);
        console.log(`Part 8: ${part8}`);
        const partsHex = [part1, part2, part3, part4, part5, part6, part7, part8];
        //const partsHex = [part1, part2, part3, part4];
        const partsBinary = [];
        partsHex.map((part) => {
            //console.log(parseInt(hexToBinary(part), 2))
            const binary = function_1.hexToBinary(part);
            partsBinary.push(binary);
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
        console.log(`4. Compute the XOR between [part 1 / part 2] and [part 3 / part 4]`);
        const partialResult1 = function_1.binaryXOR(partsBinary[0], partsBinary[1]);
        const partialResult2 = function_1.binaryXOR(partsBinary[2], partsBinary[3]);
        console.log('Partial Result 1: ' + partialResult1);
        console.log('Partial Result 2: ' + partialResult2);
        console.log(`5. Compute the XOR between [part 5 / part 6] and [part 7 / part 8]`);
        const partialResult3 = function_1.binaryXOR(partsBinary[4], partsBinary[5]);
        const partialResult4 = function_1.binaryXOR(partsBinary[6], partsBinary[7]);
        console.log('Partial Result 3: ' + partialResult3);
        console.log('Partial Result 4: ' + partialResult4);
        /*
          const partialResult5 = binaryXOR(partialResult1, partialResult2);
          const partialResult6 = binaryXOR(partialResult3, partialResult4);
      
          console.log('Partial Result 5: ' + partialResult5);
          console.log('Partial Result 6: ' + partialResult6);
      
          console.log(
            `5. Compute the XOR between [partial result 1 and partial result 2]`
          );
      
          const finalBinaryResult = binaryXOR(partialResult5, partialResult6);
      
          console.log('Final Result    : ' + finalBinaryResult);
      
          console.log(
            `6. Trasform the Binary number into a decimal number and compute the modulo N function`
          );
        */
        const partialR = [parseInt(partialResult1, 2), parseInt(partialResult2, 2),
            parseInt(partialResult3, 2), parseInt(partialResult4, 2)];
        // assuring to obtain 4-bit number
        for (var i = 0; i < partialR.length; i++) {
            partialR[i] = Math.abs(partialR[i] >> 27);
        }
        const nib = function_1.VecToInt(partialR);
        console.log('nib: ' + nib);
        console.log('first round partsBinary = ' + partialR);
        const state_1 = function_1.Sub4Niblist(partialR);
        const state_2 = function_1.shiftRow(state_1);
        const state_3 = function_1.mixCol(state_2);
        console.log('second round state_3 = ' + state_3);
        const state_ = function_1.Sub4Niblist(state_3);
        const state_4 = function_1.shiftRow(state_3);
        const state_5 = function_1.mixCol(state_4);
        console.log('third round state_5 = ' + state_5);
        const state = function_1.Sub4Niblist(state_5);
        const state_6 = function_1.shiftRow(state);
        const state_7 = function_1.mixCol(state_6);
        const state_8 = function_1.shiftRow(state_7);
        //const finalBinaryResult = (state_3[0] & state_3[3])^(state_3[1]&state_3[2]) 
        const finalBinaryResult = function_1.VecToInt(state_8);
        const r = Math.trunc(Math.random() * 1000) << 8;
        console.log("Random number: " + r);
        var ticket = (finalBinaryResult) % 1000;
        console.log(`Decimal value: ${finalBinaryResult} `);
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
    const numberOfTickets = 1000;
    for (let i = 0; i < iteractions; i++) {
        let random = Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        let hash = hasha_1.default(random, { algorithm: 'sha256' });
        const tickets = [];
        getTickets(hash, numberOfTickets, tickets);
        data.push({ key: hash, value: tickets });
        console.log(data);
    }
    // console.log(JSON.stringify(data));
    //console.log(data)
    let plt = [];
    data.map((stat) => {
        // console.log(`Data Results: ${stat.key} - ${stat.value}`);
        //console.log(_.groupBy(stat.value));
        //console.log(stat.value)
        plt.push(stat.value);
    });
    const ls_dict = [];
    plt.map((ls) => {
        ls_dict.push(lodash_1.default.groupBy(ls));
    });
    console.log(ls_dict);
    return data;
}
exports.doStatistics = doStatistics;
