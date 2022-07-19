namespace Garden22 {
    export class Wallet {
        static money: number = 0;
        static update(): void {
            document.querySelector("#wallet").innerHTML = "Your Wallet: " + Wallet.money.toFixed(2) + "€";
        }
    }
}