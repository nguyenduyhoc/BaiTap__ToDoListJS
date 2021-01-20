function TaskList() {
    this.arr = [];

    this.addTask = function(task) {
        this.arr.push(task);
    }

    this.deleteTask = function(maID) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id === maID) {
                this.arr.splice(i, 1)
            }
        }
    }
    this._findIndex = function(maID) {
        var viTri = -1;
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id === maID) {
                viTri = i
                break;
            }
        }
    }

    this.layThongTinTask = function(maID) {
        var viTri = this._findIndex(maID);
        if (viTri !== -1) {
            return this.arr[viTri]
        }
    }

    this.updateTask = function(maID) {
        var viTri = this._findIndex(maID.status)
        if (viTri !== -1) {

            this.arr[viTri] = maID
        }
    }



}