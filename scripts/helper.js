"use strict";
class Helper {
    constructor(time, list = []) {
        this.time = parseInt(400/time);
        this.list = Array.from(list);
        list = [...list];
        
        this.values = list.map(cell => Number(cell.getAttribute("value"))); // Store values as an array
    }

    mark = async (index) => {
        this.list[index].setAttribute("class", "cell current");
    }

    markSpl = async (index) => {
        this.list[index].setAttribute("class", "cell min");
    }

    unmark = async (index) => {
        this.list[index].setAttribute("class", "cell");
    }
    
    pause = async() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.time);
        });
    }

    compare = async (index1, index2) => {
        await this.pause();
        let value1 = Number(this.list[index1].getAttribute("value"));
        let value2 = Number(this.list[index2].getAttribute("value"));
        if(value1 > value2) {
            return true;
        }
        return false;
        //return this.values[index1] > this.values[index2];
    }

    swap = async (index1, index2) => {
       // console.log(index1,index2);
        await this.pause();
        console.log(index1,index2);
        
        let temp = this.values[index1];
        this.values[index1] = this.values[index2];
        this.values[index2] = temp;
        console.log(this.values[index1],this.values[index1])
        this.list[index1].setAttribute("value", this.values[index1]);
        this.list[index1].style.height = `${3.8 * this.values[index1]}px`;
        this.list[index1].textContent = this.values[index1];
        this.list[index2].setAttribute("value", this.values[index2]);
        this.list[index2].style.height = `${3.8 * this.values[index2]}px`;
        this.list[index2].textContent = this.values[index2];
    }
};
