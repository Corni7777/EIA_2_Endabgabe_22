namespace Garden22 {
    export class Pesticide {
    static price: number = Math.random() + 0.5;
    static removePest(_i: number): void {
        for (let j: number = 0; j < pests.length; j++) {
            if (pests[j].position == plants[_i].position) {
                pests.splice(j, 1);
            }
        }
    }
}
}
