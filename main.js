const DATA_URL = "https://zepolrepus.github.io/time-tracking-dashboard-main/data.json";

const request = async(url) => {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error("WARN", response.status);
    const data = await response.json();
    return data;
}

/* DEntro de una funcion */
// const resultOk = await request(DATA_URL);


window.onload = async () => {
    const container = document.getElementById("container");

    const aDaily = document.getElementById("aDaily");
    const aWeekly = document.getElementById("aWeekly");
    const aMonthly = document.getElementById("aMonthly");

    const data = await request(DATA_URL);
    data.map((item) => {
        
         createCard(item.title, item.timeframes.daily.current, item.timeframes.daily.previous, item.img, item.color);
    });
    
}



function createCard(title, hrs, last, img, color) {
    
    const newTracking = document.createElement("div");
    newTracking.setAttribute("class", "trackings");
    newTracking.setAttribute("id", `tracking-${title}`);

    const newDiv = document.createElement("div");
    const newP = document.createElement("p");
    const newSpanTitle = document.createElement("span");
    newSpanTitle.setAttribute("id", title);
    const newTitle = document.createTextNode(title);
    newSpanTitle.appendChild(newTitle);
    const newA = document.createElement("a");
    newA.setAttribute("href", "#");
    const newAText = document.createTextNode("···");
    newA.appendChild(newAText);
    newP.appendChild(newSpanTitle);
    newP.appendChild(newA);
    newDiv.appendChild(newP);
    

    const newSpanHrs = document.createElement("span");
    newSpanHrs.setAttribute("id", "hrs");
    const newSpanHrsText = document.createTextNode(`${hrs}hrs`)
    newSpanHrs.appendChild(newSpanHrsText);
    newDiv.appendChild(newSpanHrs);

    const newSpanLast = document.createElement("span");
    newSpanLast.setAttribute("id", "last");
    const newSpanLastText = document.createTextNode(`Last day - ${last}hrs`)
    newSpanLast.appendChild(newSpanLastText);
    newDiv.appendChild(newSpanLast);


    newTracking.appendChild(newDiv);
    container.appendChild(newTracking);

    //Add background image    
    const elementTracking = document.getElementById(`tracking-${title}`);
    elementTracking.style.backgroundColor = color;
    elementTracking.style.backgroundImage = `url(images/${img})`;

    aDaily.setAttribute("class", "active");
}

async function getValues(timeframe){
    aDaily.removeAttribute('class');
    aWeekly.removeAttribute('class');
    aMonthly.removeAttribute('class');
    
    const data = await request(DATA_URL);
    data.map((item) => {
        const newTracking = document.getElementById(`tracking-${item.title}`);
        const hrs = newTracking.querySelector("#hrs");
        const last = newTracking.querySelector("#last");
        if (timeframe == 'daily') {
            aDaily.setAttribute('class', 'active');
            hrs.textContent = `${item.timeframes.daily.current}hrs`;
            last.textContent = `Last day - ${item.timeframes.daily.previous}hrs`;
        }
    
        if (timeframe == 'weekly') {
            aWeekly.setAttribute('class', 'active');
            hrs.textContent = `${item.timeframes.weekly.current}hrs`;
            last.textContent = `Last day - ${item.timeframes.weekly.previous}hrs`;
        }
        if (timeframe == 'monthly') {
            aMonthly.setAttribute('class', 'active');
            hrs.textContent = `${item.timeframes.monthly.current}hrs`;
            last.textContent = `Last day - ${item.timeframes.monthly.previous}hrs`;
        }
    });
    
}