"use strict";
class sortAlgorithms {
    constructor(time) {
        this.list = document.querySelectorAll(".cell");
        console.log(this.list);
        this.size = this.list.length;
        this.time = time;
        this.help = new Helper(this.time, this.list);

    }
    // BUBBLE SORT
    BubbleSort = async () => {
        for(let i = 0 ; i < this.size - 1 ; ++i) {
            for(let j = 0 ; j < this.size - i - 1 ; ++j) {
                await this.help.mark(j);
                await this.help.mark(j+1);
                if(await this.help.compare(j, j+1)) {
                    await this.help.swap(j, j+1);
                }
                await this.help.unmark(j);
                await this.help.unmark(j+1);
            }
            this.list[this.size - i - 1].setAttribute("class", "cell done");
        }
        this.list[0].setAttribute("class", "cell done");
    }

    // INSERTION SORT
    InsertionSort = async () => {
        for(let i = 0 ; i < this.size - 1 ; ++i) {
            let j = i;
            while(j >= 0 && await this.help.compare(j, j+1)) {
                await this.help.mark(j);
                await this.help.mark(j+1);
                await this.help.pause();
                await this.help.swap(j, j+1);
                await this.help.unmark(j);
                await this.help.unmark(j+1);
                j -= 1;
            }
        }
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }

    // SELECTION SORT
    SelectionSort = async () => {
        for(let i = 0 ; i < this.size ; ++i) {
            let minIndex = i;
            for(let j = i ; j < this.size ; ++j) {
                await this.help.markSpl(minIndex);
                await this.help.mark(j);
                if(await this.help.compare(minIndex, j)) {
                    await this.help.unmark(minIndex);
                    minIndex = j;
                }
                await this.help.unmark(j);
                await this.help.markSpl(minIndex);
            }
            await this.help.mark(minIndex);
            await this.help.mark(i);
            await this.help.pause();
            await this.help.swap(minIndex, i);
            await this.help.unmark(minIndex);
            this.list[i].setAttribute("class", "cell done");
        }
    }

    // MERGE SORT
    MergeSort = async () => {
        await this.MergeDivider(0, this.size - 1);
        for(let counter = 0 ; counter < this.size ; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }

    MergeDivider = async (start, end) => {
        if(start < end) {
            let mid = start + Math.floor((end - start)/2);
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid+1, end);
            await this.Merge(start, mid, end);
        }
    }

    Merge = async (start, mid, end) => {
        let newList = new Array();
        let frontcounter = start;
        let midcounter = mid + 1;
        
        while(frontcounter <= mid && midcounter <= end) {
            let fvalue = Number(this.list[frontcounter].getAttribute("value"));
            let svalue = Number(this.list[midcounter].getAttribute("value"));
            if(fvalue >= svalue) {
                newList.push(svalue);
                ++midcounter;
            }
            else {
                newList.push(fvalue);
                ++frontcounter;
            }
        }
        while(frontcounter <= mid) {
            newList.push(Number(this.list[frontcounter].getAttribute("value")));
            ++frontcounter;
        }
        while(midcounter <= end) {
            newList.push(Number(this.list[midcounter].getAttribute("value")));
            ++midcounter;
        }

        for(let c = start ; c <= end ; ++c) {
            this.list[c].setAttribute("class", "cell current");
        }
        for(let c = start, point = 0 ; c <= end && point < newList.length; 
            ++c, ++point) {
                await this.help.pause();
                this.list[c].setAttribute("value", newList[point]);
                this.list[c].style.height = `${3.5*newList[point]}px`;
        }
        for(let c = start ; c <= end ; ++c) {
            this.list[c].setAttribute("class", "cell");
        }
    }

    // QUICK SORT
    QuickSort = async () => {
        await this.QuickDivider(0, this.size-1);
        for(let c = 0 ; c < this.size ; ++c) {
            this.list[c].setAttribute("class", "cell done");
        }
    }

    QuickDivider = async (start, end) => {
        if(start < end) {
            let pivot = await this.Partition(start, end);
            await this.QuickDivider(start, pivot-1);
            await this.QuickDivider(pivot+1, end);
        }
    }

    Partition = async (start, end) => {
        let pivot = this.list[end].getAttribute("value");
        let prev_index = start - 1;

        await this.help.markSpl(end);
        for(let c = start ; c < end ; ++c) {
            let currValue = Number(this.list[c].getAttribute("value"));
            await this.help.mark(c);
            if(currValue < pivot) {
                prev_index += 1;
                await this.help.mark(prev_index);
                await this.help.swap(c, prev_index);
                await this.help.unmark(prev_index);
            }
            await this.help.unmark(c);
        }
        await this.help.swap(prev_index+1, end);
        await this.help.unmark(end);
        return prev_index + 1;
    }

   // HEAP SORT (Ascending Order)
HeapSort = async (start = 0, end = this.size - 1) => {
    // Build min heap
    for (let i = Math.floor((end - start) / 2) + start; i >= start; i--) {
        await this.Heapify(start, end, i);
    }

    // Extract elements from heap one by one
    for (let i = end; i > start; i--) {
        await this.help.mark(start);
        await this.help.mark(i);
        await this.help.swap(start, i);
        await this.help.unmark(start);
        await this.help.unmark(i);
        this.list[i].setAttribute("class", "cell done");

        // Heapify reduced heap
        await this.Heapify(start, i - 1, start);
    }
    this.list[start].setAttribute("class", "cell done");
};

// Min Heapify function (for Ascending Order)
Heapify = async (start, end, root) => {
    let smallest = root;
    let left = 2 * (root - start) + 1 + start;
    let right = 2 * (root - start) + 2 + start;

    if (left <= end && await this.help.compare(left, smallest)) {
        smallest = left;
    }

    if (right <= end && await this.help.compare(right, smallest)) {
        smallest = right;
    }

    if (smallest !== root) {
        await this.help.mark(root);
        await this.help.mark(smallest);
        await this.help.swap(root, smallest);
        await this.help.unmark(root);
        await this.help.unmark(smallest);
        await this.Heapify(start, end, smallest);
    }
};

// COUNTING SORT
CountingSort = async (start = 0, end = this.size - 1) => {
    // Find the maximum value in the range
    let maxVal = 0;
    for (let i = start; i <= end; i++) {
        let val = Number(this.list[i].getAttribute("value"));
        maxVal = Math.max(maxVal, val);
    }

    // Initialize count array
    let count = new Array(maxVal + 1).fill(0);

    // Store the frequency of each element
    for (let i = start; i <= end; i++) {
        let val = Number(this.list[i].getAttribute("value"));
        count[val]++;
    }

    // Reconstruct the sorted array
    let index = start;
    for (let val = 0; val <= maxVal; val++) {
        while (count[val] > 0) {
            await this.help.mark(index);
            await this.help.pause();
            this.list[index].setAttribute("value", val);
            this.list[index].style.height = `${3.5 * val}px`;
            await this.help.unmark(index);
            index++;
            count[val]--;
        }
    }

    // Mark all elements as sorted
    for (let i = start; i <= end; i++) {
        this.list[i].setAttribute("class", "cell done");
    }
};
// RADIX SORT
RadixSort = async (start = 0, end = this.size - 1) => {
    let maxVal = 0;
    for (let i = start; i <= end; i++) {
        let val = Number(this.list[i].getAttribute("value"));
        maxVal = Math.max(maxVal, val);
    }

    for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
        await this.CountingSortForRadix(start, end, exp);
    }

    // Mark all elements as sorted
    for (let i = start; i <= end; i++) {
        this.list[i].setAttribute("class", "cell done");
    }
};

// COUNTING SORT FOR RADIX SORT
CountingSortForRadix = async (start, end, exp) => {
    let output = new Array(end - start + 1);
    let count = new Array(10).fill(0);

    // Count occurrences of digits at current place (exp)
    for (let i = start; i <= end; i++) {
        let val = Number(this.list[i].getAttribute("value"));
        let digit = Math.floor(val / exp) % 10;
        count[digit]++;
    }

    // Convert count array to prefix sum
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = end; i >= start; i--) {
        let val = Number(this.list[i].getAttribute("value"));
        let digit = Math.floor(val / exp) % 10;
        output[count[digit] - 1] = val;
        count[digit]--;
    }

    // Copy the sorted values back to the list
    for (let i = start; i <= end; i++) {
        await this.help.mark(i);
        await this.help.pause();
        this.list[i].setAttribute("value", output[i - start]);
        this.list[i].style.height = `${3.5 * output[i - start]}px`;
        await this.help.unmark(i);
    }
};
// BUCKET SORT
BucketSort = async (start = 0, end = this.size - 1) => {
    let numBuckets = 10; // You can change the number of buckets based on the range
    let buckets = Array.from({ length: numBuckets }, () => []);

    let minValue = Number(this.list[start].getAttribute("value"));
    let maxValue = minValue;

    // Find min and max values
    for (let i = start; i <= end; i++) {
        let val = Number(this.list[i].getAttribute("value"));
        minValue = Math.min(minValue, val);
        maxValue = Math.max(maxValue, val);
    }

    let range = (maxValue - minValue) / numBuckets;

    // Distribute elements into buckets
    for (let i = start; i <= end; i++) {
        let val = Number(this.list[i].getAttribute("value"));
        let index = Math.floor((val - minValue) / range);
        if (index >= numBuckets) index = numBuckets - 1;
        buckets[index].push(val);
    }

    // Sort individual buckets
    for (let i = 0; i < numBuckets; i++) {
        buckets[i].sort((a, b) => a - b);
    }

    // Merge sorted buckets back into the list
    let index = start;
    for (let i = 0; i < numBuckets; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            await this.help.mark(index);
            await this.help.pause();
            this.list[index].setAttribute("value", buckets[i][j]);
            this.list[index].style.height = `${3.5 * buckets[i][j]}px`;
            await this.help.unmark(index);
            index++;
        }
    }

    // Mark elements as sorted
    for (let i = start; i <= end; i++) {
        this.list[i].setAttribute("class", "cell done");
    }
};
// SHELL SORT
ShellSort = async (start = 0, end = this.size - 1) => {
    let gap = Math.floor((end - start + 1) / 2);

    while (gap > 0) {
        for (let i = start + gap; i <= end; i++) {
            let temp = Number(this.list[i].getAttribute("value"));
            let j = i;

            while (j >= start + gap && Number(this.list[j - gap].getAttribute("value")) > temp) {
                await this.help.mark(j);
                await this.help.mark(j - gap);
                await this.help.pause();
                await this.help.swap(j, j - gap);
                await this.help.unmark(j);
                await this.help.unmark(j - gap);
                j -= gap;
            }
        }
        gap = Math.floor(gap / 2);
    }

    // Mark elements as sorted
    for (let i = start; i <= end; i++) {
        this.list[i].setAttribute("class", "cell done");
    }
};
// TIM SORT
TimSort = async (start = 0, end = this.size - 1) => {
    let RUN = 32; // Optimal run size for small segments

    // Sort small segments using Insertion Sort
    for (let i = start; i <= end; i += RUN) {
        await this.InsertionSortHelper(i, Math.min(i + RUN - 1, end));
    }

    // Merge sorted runs using Merge Sort
    for (let size = RUN; size <= end - start; size = 2 * size) {
        for (let left = start; left <= end; left += 2 * size) {
            let mid = left + size - 1;
            let right = Math.min(left + 2 * size - 1, end);

            if (mid < right) {
                await this.Merge(left, mid, right);
            }
        }
    }

    // Mark elements as sorted
    for (let i = start; i <= end; i++) {
        this.list[i].setAttribute("class", "cell done");
    }
};

// Insertion Sort Helper (for small runs)
InsertionSortHelper = async (start, end) => {
    for (let i = start + 1; i <= end; i++) {
        let j = i;
        while (j > start && await this.help.compare(j - 1, j)) {
            await this.help.mark(j);
            await this.help.mark(j - 1);
            await this.help.pause();
            await this.help.swap(j, j - 1);
            await this.help.unmark(j);
            await this.help.unmark(j - 1);
            j--;
        }
    }
};
// COMB SORT
CombSort = async () => {
    let gap = this.size;
    let shrinkFactor = 1.3;
    let swapped = true;

    while (gap > 1 || swapped) {
        gap = Math.floor(gap / shrinkFactor);
        if (gap < 1) gap = 1; // Ensure the last phase is a standard Bubble Sort
        swapped = false;

        for (let i = 0; i + gap < this.size; i++) {
            let j = i + gap;
            await this.help.mark(i);
            await this.help.mark(j);
            
            if (await this.help.compare(i, j)) {
                await this.help.swap(i, j);
                swapped = true;
            }

            await this.help.unmark(i);
            await this.help.unmark(j);
        }
    }

    // Mark the array as sorted
    for (let i = 0; i < this.size; i++) {
        this.list[i].setAttribute("class", "cell done");
    }
};
// PIGEONHOLE SORT
PigeonholeSort = async () => {
    // Find the minimum and maximum values
    let min = Number(this.list[0].getAttribute("value"));
    let max = min;
    
    for (let i = 1; i < this.size; i++) {
        let value = Number(this.list[i].getAttribute("value"));
        if (value < min) min = value;
        if (value > max) max = value;
    }

    let range = max - min + 1; // Range of values
    let holes = new Array(range).fill(null).map(() => []);

    // Place elements into pigeonholes
    for (let i = 0; i < this.size; i++) {
        let value = Number(this.list[i].getAttribute("value"));
        holes[value - min].push(value);
        await this.help.mark(i);
        await this.help.pause();
        await this.help.unmark(i);
    }

    // Reconstruct sorted array from pigeonholes
    let index = 0;
    for (let i = 0; i < range; i++) {
        while (holes[i].length > 0) {
            let value = holes[i].shift();
            this.list[index].setAttribute("value", value);
            this.list[index].style.height = `${3.5 * value}px`;
            await this.help.mark(index);
            await this.help.pause();
            await this.help.unmark(index);
            index++;
        }
    }

    // Mark the array as sorted
    for (let i = 0; i < this.size; i++) {
        this.list[i].setAttribute("class", "cell done");
    }
};

// CYCLE SORT
CycleSort = async () => {
    // Traverse the array one cycle at a time
    for (let cycleStart = 0; cycleStart < this.size - 1; cycleStart++) {
        let item = Number(this.list[cycleStart].getAttribute("value"));
        let pos = cycleStart;

        // Find the correct position for this element by comparing it with others
        for (let i = cycleStart + 1; i < this.size; i++) {
            let value = Number(this.list[i].getAttribute("value"));
            if (value < item) {
                pos++;
            }
        }

        // If the element is already in the correct position, skip the cycle
        if (pos === cycleStart) {
            continue;
        }

        // Otherwise, put the element to the correct position
        // Repeat the process until we rotate the cycle completely
        while (item === Number(this.list[pos].getAttribute("value"))) {
            pos++;
        }

        // Now, swap the element with the element at the correct position
        await this.help.mark(cycleStart);
        await this.help.mark(pos);
        await this.help.swap(cycleStart, pos);
        await this.help.unmark(cycleStart);
        await this.help.unmark(pos);

        // Rotate the cycle, placing the correct element in the current position
        while (pos !== cycleStart) {
            pos = cycleStart;
            for (let i = cycleStart + 1; i < this.size; i++) {
                let value = Number(this.list[i].getAttribute("value"));
                if (value < item) {
                    pos++;
                }
            }

            while (item === Number(this.list[pos].getAttribute("value"))) {
                pos++;
            }

            // Now swap again with the correct position
            await this.help.mark(cycleStart);
            await this.help.mark(pos);
            await this.help.swap(cycleStart, pos);
            await this.help.unmark(cycleStart);
            await this.help.unmark(pos);
        }
    }

    // Mark the array as sorted at the end
    for (let i = 0; i < this.size; i++) {
        this.list[i].setAttribute("class", "cell done");
    }
};



// COCKTAIL SORT
CocktailSort = async (start=0, end=this.size-1) => {
    let swapped = true;
    while (swapped) {
        swapped = false;

        // Move from left to right
        for (let i = start; i < end; i++) {
            await this.help.mark(i);
            await this.help.mark(i + 1);
            if (await this.help.compare(i, i + 1)) {
                await this.help.swap(i, i + 1);
                swapped = true;
            }
            await this.help.unmark(i);
            await this.help.unmark(i + 1);
        }
        end--;

        if (!swapped) break;

        // Move from right to left
        for (let i = end - 1; i >= start; i--) {
            await this.help.unmark(i);
            await this.help.unmark(i + 1);
            if (await this.help.compare(i, i + 1)) {
                await this.help.swap(i, i + 1);
                swapped = true;
            }
            await this.help.unmark(i);
            await this.help.unmark(i + 1);
        }
        start++;

        for (let i = start; i <= end; ++i) {
            this.list[i].setAttribute("class", "cell done");
        }
    }
};

}