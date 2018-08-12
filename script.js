'use strict';
let interval = setInterval(function () {
    document.querySelector('.bartenders__list').innerHTML = '';
    let data = JSON.parse(FooBar.getData());
    document.querySelector('.bar__name').innerHTML = data.bar.name
    document.querySelector('.bar__name__time').innerHTML = data.bar.closingTime;
    //
    const bartenders = document.querySelector('.bartenders__list');
    for (let i = 0; i < data.bartenders.length; i++) {
        let bartender = document.createElement('p');
        let bartenderData = data.bartenders[i];
        //Set name
        let name = document.createElement('h2');
        name.innerHTML = bartenderData.name;
        //Set customers
        let servingCustomer = document.createElement('p');
        //Replace null with none
        if (bartenderData.servingCustomer == null) {
            bartenderData.servingCustomer = 'None';
        }
        servingCustomer.innerHTML = 'Serving customer no.: <br>' + bartenderData.servingCustomer;
        //Set status
        let stat = document.createElement('p');
        stat.innerHTML = 'Status: <br>' + bartenderData.status;
        //Set statusdetail
        let statusDetail = document.createElement('p');
        //Make output readable
        let readable = document.createElement('p');
        if (bartenderData.statusDetail == 'reserveTap') {
            readable = 'Reserving tap';
        }
        else if (bartenderData.statusDetail == 'pourBeer') {
            readable = 'Pouring beer';
        }
        else if (bartenderData.statusDetail == 'waiting') {
            readable = 'Waiting';
        }
        else if (bartenderData.statusDetail == 'receivePayment') {
            readable = 'Receiving payment';
        }
        else if (bartenderData.statusDetail == 'startServing') {
            readable = 'Starting a new serving';
        }
        else if (bartenderData.statusDetail == 'releaseTap') {
            readable = 'Releasing tap';
        }
        else if (bartenderData.statusDetail == 'endServing') {
            readable = 'Finishing a serving';
        }
        else if (bartenderData.statusDetail == 'replaceKeg') {
            readable = 'Getting keg from storage';
        }
        statusDetail.innerHTML = 'Task: <br>' + readable;
        //Append all data to each bartender
        bartender.appendChild(name);
        bartender.appendChild(stat);
        bartender.appendChild(statusDetail);
        bartender.appendChild(servingCustomer);
        //Append all to list
        bartenders.appendChild(bartender);
    }
    document.querySelector('.taps__list').innerHTML = '';
    const taps = document.querySelector('.taps__list');
    for (var i = 0; i < data.taps.length; i++) {
        let tap = document.createElement('p');
        const tapData = data.taps[i];
        //Set name
        let name = document.createElement('h2');
        name.innerHTML = tapData.beer;
        //Set capacity
        //Set level
        let level = document.createElement('p');
        level.innerHTML = 'Level: ' + tapData.level + ' ml.';
        //Make a bar that shows status on taps
        //Green and 100% width if over 2000
        if (tapData.level > 2000) {
            document.querySelector('.taps__status').style.backgroundColor = '#70D602';
            document.querySelector('.taps__status').style.color = '#70D602';
            document.querySelector('.taps__status').style.width = '100%';
        }
        //Yellow and 75% width if between 1500-2000
        else if (tapData.level > 1500) {
            document.querySelector('.taps__status').style.backgroundColor = '#F0B326';
            document.querySelector('.taps__status').style.color = '#F0B326';
            document.querySelector('.taps__status').style.width = '75%';
        }
        //Orange and 50% width if between 1000-1500
        else if (tapData.level < 1500) {
            document.querySelector('.taps__status').style.backgroundColor = '#FF971A';
            document.querySelector('.taps__status').style.color = '#FF971A';
            document.querySelector('.taps__status').style.width = '50%';
        }
        //Red and 25% width if under 1000
        else if (tapData.level < 1000) {
            document.querySelector('.taps__status').style.backgroundColor = '#D92D0B';
            document.querySelector('.taps__status').style.color = '#D92D0B';
            document.querySelector('.taps__status').style.width = '25%';
        }
        //Set in use
        let inUse = document.createElement('p');
        inUse.innerHTML = tapData.inUse ? 'In use' : 'Not in use';
        //Append all data to each tap
        tap.appendChild(name);
        tap.appendChild(level);
        tap.appendChild(inUse);
        //Append this tap to taps list
        taps.appendChild(tap);
        console.log(data.taps);
    }
    document.querySelector('.queue__list').innerHTML = '';
    const queue = document.querySelector('.queue__list');
    for (var i = 0; i < data.queue.length; i++) {
        let q = document.createElement('p');
        const queueData = data.queue[i];
        //Set name
        let number = document.createElement('h2');
        number.innerHTML = 'Customer no. ' + queueData.id;
        //Set order
        let order = document.createElement('p');
        order.innerHTML = 'Order: <br>' + queueData.order;
        //Append
        q.appendChild(number);
        q.appendChild(order);
        queue.appendChild(q);
    }
}, 1000);
//Countdown variables
let date = new Date();
let hour = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
let hTs = hour * 3600;
let mTs = min * 60;
let closing = 22 * 3600;
let current = hTs + mTs;
let left = closing - current;
let countdown = 0;
//Countdown
function counter() {
    countdown++;
    //Write to html
    document.querySelector(`.countdown__div`).textContent = c(left - countdown);
    //Say 'Closed' when closed
    if (left < 0) {
        document.querySelector(`.countdown__div`).textContent = `Closed`;
    }
    //Loop every second
    setTimeout(counter, 1000);
}
//Call function
counter();
//Convert into readable time
function c(sec) {
    //Hours
    let h = Math.floor(sec / 60 / 60);
    //Minutes
    const HremaindingS = sec - h * 60 * 60;
    let m = Math.floor(HremaindingS / 60);
    //Seconds
    const MremaindingS = HremaindingS - m * 60;
    let s = MremaindingS;
    //If under 10 add a 0
    if (h < 10) {
        h = `0` + h;
    }
    if (m < 10) {
        m = `0` + m;
    }
    if (s < 10) {
        s = `0` + s;
    }
    return h + `h ` + m + `min ` + s + `sec `;
}