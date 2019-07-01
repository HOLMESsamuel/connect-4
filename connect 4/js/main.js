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


    /**the fonction checks for an alignement of 4 colors in one of four directions
     * (South-North, East-West, SouthWest-NorthEast, NorthWest-SouthEsast)
     * It work thanks to a recursive method 
     */
    checkForWinner(row, col, player) {
        const that = this; //that will be used as this in the following functions

        function checkS(n, row, col, player) {
            if (row < 5) { //verify we are not looking outside the grid
                if (that.getCell(row + 1, col).hasClass(player)) {
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
                if (that.getCell(row, col + 1).hasClass(player)) {
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
                if (that.getCell(row, col - 1).hasClass(player)) {
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
                if (that.getCell(row - 1, col + 1).hasClass(player)) {
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
                if (that.getCell(row + 1, col - 1).hasClass(player)) {
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
                if (that.getCell(row - 1, col - 1).hasClass(player)) {
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
                if (that.getCell(row + 1, col + 1).hasClass(player)) {
                    return checkSE(n + 1, row + 1, col + 1, player);
                } else {
                    return n;
                }
            } else {
                return n;
            }
        }

        if (checkS(1, row, col, player) >= 4) {
            return player + " wins !";
        } else if (checkE(1, row, col, player) + checkW(0, row, col, player) >= 4) {
            return player + " wins !";
        } else if (checkNE(1, row, col, player) + checkSW(0, row, col, player) >= 4) {
            return player + " wins !";
        } else if (checkNW(1, row, col, player) + checkSE(0, row, col, player) >= 4) {
            return player + " wins !";
        } else {
            return null;
        }
    }

    evaluateScore(player) {

        function evaluate(nPlayer, nEmpty, nOther) {
            var score = 0;
            if (nEmpty == 4) {
                return score;
            }
            if (nPlayer == 4) {
                score += 100;
            } else if (nPlayer == 3 && nEmpty == 1) {
                score += 10;
            } else if (nPlayer == 2 && nEmpty == 2) {
                score += 5;
            }

            return score;
        }

        var score = -1000;

        const otherPlayer = (player === 'red') ? "yellow" : "red";

        //checks for horizontal alignement
        for (var row = 0; row < this.ROWS; row++) {
            for (var col = 0; col < this.COLS - 3; col++) {
                var nPlayer = 0;
                var nEmpty = 0;
                var nOther = 0;
                for (var i = 0; i < 4; i++) {
                    if (this.getCell(row, col + i).hasClass(player)) {
                        nPlayer += 1;
                    } else if (this.getCell(row, col + i).hasClass("empty")) {
                        nEmpty += 1;
                    } else if (this.getCell(row, col + i).hasClass(otherPlayer)) {
                        nOther += 1;
                    }
                }
                score += evaluate(nPlayer, nEmpty, nOther);
            }
        }

        //checks for vertical alignement
        for (var col = 0; col < this.COLS; col++) {
            for (var row = 0; row < this.ROWS - 3; row++) {
                var nPlayer = 0;
                var nEmpty = 0;
                var nOther = 0;
                for (var i = 0; i < 4; i++) {
                    if (this.getCell(row + i, col).hasClass(player)) {
                        nPlayer += 1;
                    } else if (this.getCell(row + i, col).hasClass("empty")) {
                        nEmpty += 1;
                    } else if (this.getCell(row + i, col).hasClass(otherPlayer)) {
                        nOther += 1;
                    }
                }
                score += evaluate(nPlayer, nEmpty, nOther);
            }
        }

        //checks for down diagonal alignement
        for (var col = 0; col < this.COLS - 3; col++) {
            for (var row = 0; row < this.ROWS - 3; row++) {
                var nPlayer = 0;
                var nEmpty = 0;
                var nOther = 0;
                for (var i = 0; i < 4; i++) {
                    if (this.getCell(row + i, col + i).hasClass(player)) {
                        nPlayer += 1;
                    } else if (this.getCell(row + i, col + i).hasClass("empty")) {
                        nEmpty += 1;
                    } else if (this.getCell(row + i, col + i).hasClass(otherPlayer)) {
                        nOther += 1;
                    }
                }
                score += evaluate(nPlayer, nEmpty, nOther);
            }
        }

        //checks for up diagonal alignement
        for (var col = 0; col < this.COLS; col++) {
            for (var row = this.ROWS; row > this.ROWS - 3; row--) {
                var nPlayer = 0;
                var nEmpty = 0;
                var nOther = 0;
                for (var i = 0; i < 4; i++) {
                    if (this.getCell(row - i, col + i).hasClass(player)) {
                        nPlayer += 1;
                    } else if (this.getCell(row - i, col + i).hasClass("empty")) {
                        nEmpty += 1;
                    } else if (this.getCell(row - i, col + i).hasClass(otherPlayer)) {
                        nOther += 1;
                    }
                }
                score += evaluate(nPlayer, nEmpty, nOther);
            }
        }

        return score;
    }

    minimax(node, depth, maximizingPlayer) {
        const end = node.isTerminal()
        if (depth == 0 || end) {
            if (end) {
                if (node.winner(maximizingPlayer)) {
                    return 1000000000;
                } else if (node.winner(otherPlayer)) {
                    return -100000000;
                } else {
                    return 0;
                }
            } else {
                return node.evaluateScore(player)
            }
        }
        if (maximizingPlayer) {

        } else { //minimisingPlayer

        }
    }

    pickBestMove(player) {
        var bestCol = 0;
        const cell = this.findLastEmptyCell(bestCol);
        cell.removeClass("empty");
        cell.addClass(player);
        var scoreMax = this.evaluateScore(player);
        console.log(0 + " " + scoreMax + " ");
        cell.removeClass(player);
        cell.addClass("empty");
        for (var col = 1; col < this.COLS; col++) {
            const cell = this.findLastEmptyCell(col);
            if (cell) {
                cell.removeClass("empty");
                cell.addClass(player);
                var score = this.evaluateScore(player);
                if (col == 1 || col == 5) {
                    score += 1;
                } else if (col == 2 || col == 4) {
                    score += 3;
                } else if (col == 3) {
                    score += 6;
                }
                console.log(col + " " + score + " ");
                cell.removeClass(player);
                cell.addClass("empty");
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
        const bestCol = this.pickBestMove(ai);
        const cell = this.findLastEmptyCell(bestCol);
        cell.removeClass("empty");
        cell.addClass(ai);
        console.log("best " + bestCol);
        const row = cell.data("row");
        if (this.checkForWinner(row, bestCol, ai)) {
            alert(this.checkForWinner(row, bestCol, ai));
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
            if (that.checkForWinner(row, col, that.player)) {
                $board.off("click");
                $board.off("mouseenter");
                $board.off("mouseleave");
                that.gameNumber = 0;
                alert(that.checkForWinner(row, col, that.player));
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