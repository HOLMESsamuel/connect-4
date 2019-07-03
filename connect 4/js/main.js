/**the fonction checks for an alignement of 4 colors in one of four directions
 * (South-North, East-West, SouthWest-NorthEast, NorthWest-SouthEsast)
 * It work thanks to a recursive method 
 */
function winner(grid, player, row, col) {
    function checkS(n, row, col, player) {
        if (row < 5) { //verify we are not looking outside the grid
            if (grid[row + 1][col] == player) {
                return checkS(n + 1, row + 1, col, player);
            } else {
                return n;
            }
        } else {
            return n;
        }
    }

    function checkE(n, row, col, player) {
        if (col < 6) {
            if (grid[row][col + 1] == player) {
                return checkE(n + 1, row, col + 1, player);
            } else {
                return n;
            }
        } else {
            return n;
        }
    }

    function checkW(n, row, col, player) {
        if (col > 0) {
            if (grid[row][col - 1] == player) {
                return checkW(n + 1, row, col - 1, player);
            } else {
                return n;
            }
        } else {
            return n;
        }
    }

    function checkNE(n, row, col, player) {
        if (col < 6 && row > 0) {
            if (grid[row - 1][col + 1] == player) {
                return checkNE(n + 1, row - 1, col + 1, player);
            } else {
                return n;
            }
        } else {
            return n;
        }
    }

    function checkSW(n, row, col, player) {
        if (col > 0 && row < 5) {
            if (grid[row + 1][col - 1] == player) {
                return checkSW(n + 1, row + 1, col - 1, player);
            } else {
                return n;
            }
        } else {
            return n;
        }
    }

    function checkNW(n, row, col, player) {
        if (col > 0 && row > 0) {
            if (grid[row - 1][col - 1] == player) {
                return checkNW(n + 1, row - 1, col - 1, player);
            } else {
                return n;
            }
        } else {
            return n;
        }
    }

    function checkSE(n, row, col, player) {
        if (col < 6 && row < 5) {
            if (grid[row + 1][col + 1] == player) {
                return checkSE(n + 1, row + 1, col + 1, player);
            } else {
                return n;
            }
        } else {
            return n;
        }
    }

    if (checkS(1, row, col, player) >= 4) {
        return (true);
    } else if (checkE(1, row, col, player) + checkW(0, row, col, player) >= 4) {
        return (true);
    } else if (checkNE(1, row, col, player) + checkSW(0, row, col, player) >= 4) {
        return (true);
    } else if (checkNW(1, row, col, player) + checkSE(0, row, col, player) >= 4) {
        return (true);
    } else {
        return false;
    }
}

function modifTab(tab, x, y, player) {
    var newTab = $.extend(true, [], tab);

    newTab[x][y] = player;
    return newTab;
}

function getFreeRow(tab, col) {
    for (var row = 5; row >= 0; row--) {
        if (tab[row][col] == "empty") {
            return row;
        }
    }
}


function evaluate(nPlayer, nEmpty, nOther) {
    var score = 0;
    if (nEmpty == 4) {
        return score;
    }
    if (nPlayer == 4) {
        score += 100;
    } else if (nPlayer == 3 && nEmpty == 1) {
        score += 5;
    } else if (nPlayer == 2 && nEmpty == 2) {
        score += 2;
    } else if (nOther == 3 && nEmpty == 1) {
        score -= 4;
    }
    return score;
}

function evaluateScoreTab(grid, player) {
    var score = -1000;

    //checks for horizontal alignement
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 7 - 3; col++) {
            var nPlayer = 0;
            var nEmpty = 0;
            var nOther = 0;
            for (var i = 0; i < 4; i++) {
                if (grid[row][col + i] == player) {
                    nPlayer += 1;
                } else if (grid[row][col + i] == "empty") {
                    nEmpty += 1;
                } else {
                    nOther += 1;
                }
            }
            score += evaluate(nPlayer, nEmpty, nOther);
        }
    }

    //checks for vertical alignement
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 6 - 3; row++) {
            var nPlayer = 0;
            var nEmpty = 0;
            var nOther = 0;
            for (var i = 0; i < 4; i++) {
                if (grid[row + i][col] == player) {
                    nPlayer += 1;
                } else if (grid[row + i][col] == "empty") {
                    nEmpty += 1;
                } else {
                    nOther += 1;
                }
            }
            score += evaluate(nPlayer, nEmpty, nOther);
        }
    }

    //checks for down diagonal alignement
    for (var col = 0; col < 7 - 3; col++) {
        for (var row = 0; row < 6 - 3; row++) {
            var nPlayer = 0;
            var nEmpty = 0;
            var nOther = 0;
            for (var i = 0; i < 4; i++) {
                if (grid[row + i][col + i] == player) {
                    nPlayer += 1;
                } else if (grid[row + i][col + i] == "empty") {
                    nEmpty += 1;
                } else {
                    nOther += 1;
                }
            }
            score += evaluate(nPlayer, nEmpty, nOther);
        }
    }

    //checks for up diagonal alignement

    for (var col = 0; col < 7 - 3; col++) {
        for (var row = 6 - 1; row > 6 - 3; row--) {
            var nPlayer = 0;
            var nEmpty = 0;
            var nOther = 0;
            for (var i = 0; i < 4; i++) {

                if (grid[row - i][col + i] == player) {
                    nPlayer += 1;
                } else if (grid[row - i][col + i] == "empty") {
                    nEmpty += 1;
                } else {
                    nOther += 1;
                }
            }
            score += evaluate(nPlayer, nEmpty, nOther);
        }
    }

    return score;
}

function isFull(tab) {
    var full = true;
    for (var col = 0; col < tab.length; col++) {
        if (tab[0][col] == "empty") {
            full = false;
        }
    }
    return full;
}

function minimax(node, depth, maximizingPlayer, player, terminal) {
    var otherPlayer = (player === "red") ? "yellow" : "red";
    if (terminal == "yellow") {
        return [1000000000000, 0];
    } else if (isFull(node)) {
        return [0, 0];
    } else if (terminal == "red") {
        return [-1000000000000, 0];
    } else if (depth == 0) {
        return [evaluateScoreTab(node, player), 0];
    }
    if (maximizingPlayer) {
        var value = -Infinity;
        var bestCol = 0;
        for (var col = 0; col < 7; col++) {
            if (node[0][col] == "empty") {
                var row = getFreeRow(node, col);
                var child = modifTab(node, row, col, player);
                if (winner(child, player, row, col)) {
                    var newScore = minimax(child, depth - 1, false, otherPlayer, player)[0];
                    if (col == 1 || col == 5) {
                        newScore += 1;
                    } else if (col == 2 || col == 4) {
                        newScore += 2;
                    } else if (col == 3) {
                        newScore += 3;
                    }
                    if (newScore > value) {
                        value = newScore;
                        bestCol = col;
                    }
                } else {
                    var newScore = minimax(child, depth - 1, false, otherPlayer, "none")[0];
                    if (col == 1 || col == 5) {
                        newScore += 1;
                    } else if (col == 2 || col == 4) {
                        newScore += 2;
                    } else if (col == 3) {
                        newScore += 3;
                    }
                    if (newScore > value) {
                        value = newScore;
                        bestCol = col;
                    }
                }

            }
        }
        return [value, bestCol];
    } else { //minimisingPlayer
        var value = Infinity;
        var bestCol = 0;
        for (var col = 0; col < 7; col++) {
            if (node[0][col] == "empty") {
                var row = getFreeRow(node, col);
                var child = modifTab(node, row, col, player);
                if (winner(node, player, row, col)) {
                    var newScore = minimax(child, depth - 1, true, otherPlayer, player)[0];
                    if (col == 1 || col == 5) {
                        newScore += 1;
                    } else if (col == 2 || col == 4) {
                        newScore += 2;
                    } else if (col == 3) {
                        newScore += 3;
                    }
                    if (newScore < value) {
                        value = newScore;
                        bestCol = col;
                    }
                } else {
                    var newScore = minimax(child, depth - 1, true, otherPlayer, "none")[0];
                    if (col == 1 || col == 5) {
                        newScore += 1;
                    } else if (col == 2 || col == 4) {
                        newScore += 2;
                    } else if (col == 3) {
                        newScore += 3;
                    }
                    if (newScore < value) {
                        value = newScore;
                        bestCol = col;
                    }
                }

            }
        }
        return [value, bestCol];
    }
}

class grid {
    constructor(selector) {
        this.COLS = 7;
        this.ROWS = 6;
        this.selector = selector;
        this.createGrid();
        this.gameNumber = 0;
    }

    createGrid() {
        const $board = $(this.selector);
        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div>').addClass('row');
            for (let col = 0; col < this.COLS; col++) {
                const $col = $('<div>').addClass('column empty').attr("data-row", row).attr("data-col", col);
                $row.append($col);
            }
            $board.append($row);
        }
    }

    findLastEmptyCell(col) {
        //search all the cells on the column col and return an array of them
        const cells = $(`.column[data-col='${col}']`);
        for (let i = cells.length - 1; i >= 0; i--) {
            const $cell = $(cells[i]);
            if ($cell.hasClass("empty")) {
                return $cell;
            }
        }
        return null;
    }

    getCell(row, col) {
        const cell = $(`.column[data-col='${col}'][data-row='${row}']`);
        return cell;
    }

    createCopyTab() {
        var tab = [];
        for (var row = 0; row < this.ROWS; row++) {
            var line = [];
            for (var col = 0; col < this.COLS; col++) {
                var cell = this.getCell(row, col);
                if (cell.hasClass("empty")) {
                    line.push("empty");
                } else if (cell.hasClass("red")) {
                    line.push("red");
                } else {
                    line.push("yellow");
                }
            }
            tab.push(line);
        }
        return tab;
    }

    pickBestMove(player) {
        function modifTab(tab, x, y, player) {
            var newTab = $.extend(true, [], tab);

            newTab[x][y] = player;
            return newTab;
        }
        var bestCol = 0;
        var cell = this.findLastEmptyCell(bestCol);
        var x = cell.data("row");
        var y = cell.data("col");
        var tab = this.createCopyTab();
        var tab2 = modifTab(tab, x, y, player);
        var scoreMax = evaluateScoreTab(tab2, player);

        console.log(0 + " " + scoreMax + " ");
        for (var col = 1; col < this.COLS; col++) {
            var cell = this.findLastEmptyCell(col);
            if (cell) {
                x = cell.data("row");
                y = cell.data("col");
                tab2 = modifTab(tab, x, y, player);
                console.log(tab2);

                var score = evaluateScoreTab(tab2, player);
                if (col == 1 || col == 5) {
                    score += 1;
                } else if (col == 2 || col == 4) {
                    score += 3;
                } else if (col == 3) {
                    score += 6;
                }
                console.log(col + " " + score + " ");
                if (score > scoreMax) {
                    scoreMax = score;
                    bestCol = col;
                }
            }
        }
        return bestCol;
    }

    AIturn(player) {
        const ai = (player === 'red') ? "yellow" : "red";
        const grid = this.createCopyTab();
        const bestCol = minimax(grid, 4, true, ai, "none")[1];
        //const bestCol = this.pickBestMove(ai);
        const cell = this.findLastEmptyCell(bestCol);
        cell.removeClass("empty");
        cell.addClass(ai);
        //console.log("best " + bestCol);
        const row = cell.data("row");
        if (winner(this.createCopyTab(), ai, row, bestCol)) {
            alert(ai + " wins !");
        }
    }

    /**Sets the game mode and the player 1 color
     * It makes the AI begin randomly one over two times
     */
    setMode(mode, color) {
        this.mode = mode;
        this.player = color;
        if (Math.random() >= 0.5 && mode == "AI") {
            this.AIturn(color);
        }
    }


    createEventListeners() {
        const $board = $(this.selector);
        const that = this; //that will be used as this in the following functions


        $board.on("mouseenter", ".column.empty", function() {
            const col = $(this).data("col");
            const lastEmptyCell = that.findLastEmptyCell(col);
            lastEmptyCell.addClass("next-" + that.player);
        });

        $board.on("mouseleave", ".column", function() {
            $(".column").removeClass("next-" + that.player);
        });

        $board.on("click", ".column.empty", function() {
            const col = $(this).data("col");
            const lastEmptyCell = that.findLastEmptyCell(col);
            lastEmptyCell.removeClass("empty");
            lastEmptyCell.addClass(that.player);
            const row = lastEmptyCell.data("row");
            if (winner(that.createCopyTab(), that.player, row, col)) {
                $board.off("click");
                $board.off("mouseenter");
                $board.off("mouseleave");
                that.gameNumber = 0;
                alert(that.player + " wins !");
            }
            //if the player is red we change it to yellow
            if (that.mode == "2players") {
                that.player = (that.player === 'red') ? "yellow" : "red";
                $(this).trigger("mouseenter");
            } else {
                that.AIturn(that.player);
            }

        });
    }
}

$(document).ready(function() {
    $grid = new grid("#connect4");
    $("#begin").click(function() {
        $("#connect4").empty();
        $grid.createGrid();
        color = $('input[name=inlineRadioOptions2]:checked').val();
        if ($('input[name=inlineRadioOptions1]:checked').val() == "AI") {
            $grid.setMode("AI", color);
        } else {
            $grid.setMode("2players", color);
        }
        if ($grid.gameNumber == 0) {
            $grid.createEventListeners();
            $grid.gameNumber += 1;
        }


    });
});