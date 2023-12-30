const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

let createRectWithBorder = (x, y, width, height, colorRect, colorBorder, thickness = 3) => {
    canvasContext.fillStyle = colorBorder;
    canvasContext.fillRect(x - (thickness), y - (thickness), width + (thickness * 2), height + (thickness * 2));

    canvasContext.fillStyle = colorRect;
    canvasContext.fillRect(x, y, width, height);
}

let oneBlockSize = 10;
let maxCol = 49;
let maxRow = 49;
let node = [];
let startNode = new Node(0, 0);
let goalNode = new Node(0, 0);
let currentNode = new Node(0, 0);
let openList = new Set();
let checkedList = [];
let goalReached = false;

let algorithm = () => {
    draw();
};

let draw = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    createRect(0, 0, canvas.width, canvas.height, "green");

    drawWalls();

    // SET START AND GOAL NODE
    setStartNode(2, 3);
    setGoalNode(47, 45);

    // SET COST
    setCostOnNodes();

    autoSearch();

    for (let i = 0; i < maxRow; i++) {
        for (let j = 0; j < maxCol; j++) {
            if (node[i][j].path) {
                createRectWithBorder(
                    node[i][j].row * oneBlockSize,
                    node[i][j].col * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    node[i][j].color,
                    "red",
                    2
                );
            }
        }
    }
};

let drawWalls = () => {
    for (let i = 0; i < maxRow; i++) {
        node.push([]);
        node[i].push(new Array(maxCol));
        for (let j = 0; j < maxCol; j++) {
            node[i][j] = new Node(i, j);
            let wall = false;
            if (Math.random() < 0.7) {
                wall = true;
            }
            if (wall) {
                createRectWithBorder(
                    j * oneBlockSize,
                    i * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    node[i][j].color,
                    "red",
                    2
                );
            } else {
                setSolidNode(i, j);
                createRectWithBorder(
                    j * oneBlockSize,
                    i * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    node[i][j].color,
                    "red",
                    2
                );

            }
        }
    }
};

function setStartNode(col, row) {
    node[col][row].setAsStart();
    createRectWithBorder(
        node[col][row].row * oneBlockSize,
        node[col][row].col * oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        node[col][row].color,
        "red",
        2
    );
    startNode = node[col][row];
    currentNode = startNode;
};

function setGoalNode(col, row) {
    node[col][row].setAsGoal();
    createRectWithBorder(
        node[col][row].row * oneBlockSize,
        node[col][row].col * oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        node[col][row].color,
        "red",
        2
    );
    goalNode = node[col][row];
};

function setSolidNode(col, row) {
    node[col][row].setAsSolid();
}

function setCostOnNodes() {
    let col = 0;
    let row = 0;

    while (col < maxCol && row < maxRow) {
        getCost(node[col][row]);
        col++;
        if (col === maxCol) {
            col = 0;
            row++;
        }
    }
}

function getCost(node) {
    // GET G COST (The distance from the start node)
    let xDistance = Math.abs(node.col - startNode.col);
    let yDistance = Math.abs(node.row - startNode.row);
    node.gCost = xDistance + yDistance;

    // GET H COST (The distance from the goal node)
    xDistance = Math.abs(node.col - goalNode.col);
    yDistance = Math.abs(node.row - goalNode.row);
    node.hCost = xDistance + yDistance;

    // GET F COST (The total cost)
    node.fCost = node.gCost + node.hCost;
}

function autoSearch() {
    while (goalReached === false) {
        let row = currentNode.row;
        let col = currentNode.col;

        currentNode.setAsChecked();
        createRectWithBorder(
            currentNode.row * oneBlockSize,
            currentNode.col * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            currentNode.color,
            "red",
            2
        );
        checkedList.push(currentNode);
        openList.delete(currentNode);

        if (row - 1 >= 0) {
            openNode(node[col][row - 1]);
        }

        if (col - 1 >= 0) {
            openNode(node[col - 1][row]);
        }

        if (row + 1 < maxRow) {
            openNode(node[col][row + 1]);
        }

        if (col + 1 < maxCol) {
            openNode(node[col + 1][row]);
        }

        if (row - 1 >= 0 && col - 1 >= 0) {
            openNode(node[col - 1][row - 1]);
        }
        if (col + 1 < maxCol && row - 1 >= 0) {
            openNode(node[col + 1][row - 1]);
        }
        if (col - 1 >= 0 && row + 1 < maxRow) {
            openNode(node[col - 1][row + 1]);
        }
        if (col + 1 < maxCol && row + 1 < maxRow) {
            openNode(node[col + 1][row + 1]);
        }

        // FIND THE BEST NODE
        let bestNodeIndex = 0;
        let bestNodefCost = 999;

        const openListArray = [...openList];
        for (let i = 0; i < openListArray.length; i++) {
            // Check if this node's F cost is better
            if (openListArray[i].fCost < bestNodefCost) {
                bestNodeIndex = i;
                bestNodefCost = openListArray[i].fCost;
            } // if F cost is equal, check the G cost
            else if (openListArray[i].fCost === bestNodefCost) {
                if (openListArray[i].gCost < openListArray[bestNodeIndex].gCost) {
                    bestNodeIndex = i;
                }
            }
        }
        // After the loop, we get the best node which is our next step
        currentNode = openListArray[bestNodeIndex];

        if (currentNode === goalNode) {
            goalReached = true;
            trackThePath();
        }
    }
}

function openNode(node) {
    if (node.open === false && node.checked === false && node.solid === false) {
        // If the node is not opened yet, add it to the open list
        node.setAsOpen();
        node.parent = currentNode;
        openList.add(node);
    }
}

function trackThePath() {
    // Backtrack and draw the best path
    let current = goalNode;

    while (current !== startNode) {
        current = current.parent;
        if (current !== null && current !== startNode) {
            current.setAsPath();
        }
    }
}

algorithm();
