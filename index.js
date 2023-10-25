const game = document.querySelector(".game");
const res = document.querySelector(".res");
const btnGame = document.querySelector(".new-game");
const fields = document.querySelectorAll(".field");

const circle = `<svg class="circle">
<circle r="45" cx="58" cy="58" stroke="blue" stroke-width="10" fill="none"/></svg>`;
const cross = `<svg class="cross">
<line class="first" x1="15" y1="15" x2="105" y2="105" stroke="red" stroke-width="10" stroke-linecap="round"/>
<line class="second" x1="105" y1="15" x2="15" y2="105" stroke="red" stroke-width="10" stroke-linecap="round"/></svg>`;

let stepCross = true;
let count = 0;

game.addEventListener("click", init);
btnGame.addEventListener("click", newGame);

function doStep(target) {
    target.innerHTML = stepCross ? cross : circle;
    target.classList.add(stepCross ? "x" : "o");
}

function init(e) {
    const curField = e.target.closest(".field");
    console.log(curField);
    if (
        !curField.classList.contains("x") &&
        !curField.classList.contains("o")
    ) {
        doStep(curField);
        stepCross = !stepCross;
        count++;
        win();
    }
}

function newGame() {
    res.innerHTML = "";
    game.addEventListener("click", init);
    stepCross = true;
    count = 0;
    Array.from(fields).forEach((el) => {
        el.innerHTML = "";
        el.classList.remove("x", "o", "active");
    });
}

function win() {
    const comb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let winner = null;

    for (let i = 0; i < comb.length; i++) {
        const cur = comb[i];
        const curFields = [fields[cur[0]], fields[cur[1]], fields[cur[2]]];
        if (curFields.every((el) => el.classList.contains("x"))) {
            winner = "x";
            curFields.forEach((field) => field.classList.add("active"));
            break;
        } else if (curFields.every((el) => el.classList.contains("o"))) {
            winner = "o";
            curFields.forEach((field) => field.classList.add("active"));
            break;
        }
    }

    if (winner) {
        res.innerHTML = `Выиграли ${winner === "x" ? "крестики" : "нолики"}`;
        game.removeEventListener("click", init);
    } else if (count === 9) {
        res.innerHTML = "Ничья";
        game.removeEventListener("click", init);
    }
}
