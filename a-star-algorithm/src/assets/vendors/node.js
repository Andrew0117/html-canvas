class Node {

    row;
    color;

    constructor(
        col,
        row
    ) {
        this.parent = null;
        this.col = col;
        this.row = row;
        this.gCost = null;
        this.hCost = null;
        this.fCost = null;
        this.start = false;
        this.goal = false;
        this.solid = false;
        this.open = false;
        this.checked = false;
        this.path = false;
        this.color = "rgb(52, 45, 202)";
    }

    setAsStart() {
        this.color = "rgb(247, 7, 7)";
        this.start = true;
    }

    setAsGoal() {
        this.color = "rgb(247, 7, 7)";
        this.goal = true;
    }

    setAsSolid() {
        this.color = "rgb(219, 33, 201)";
        this.solid = true;
    }

    setAsOpen() {
        this.open = true;
    }

    setAsChecked() {
        if (this.start === false && this.goal === false) {
            this.color = "rgb(201, 219, 33)";
        }
        this.checked = true;
    }

    setAsPath() {
        this.color = "rgb(7, 0, 0)";
        this.path = true;
    }

}
