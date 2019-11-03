var allNotes = [];

function changeFormat(date) {
    const d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    const year = d.getFullYear();
    if (day.length < 2) { day = "0" + day; }
    if (month.length < 2) { month = "0" + mon; }
    return day + "/" + month + "/" + year;
}
//Alerting while the user don't write something in the input fields
//Pushing the notes to the array and save it in the local Storage
//Calling other functions
function saveNote() {

    let description = document.getElementById("textBox");
    let date = document.getElementById("datePick");
    let time = document.getElementById("time");
    let index;

    if (description.value === "") {
        alert("Please write a description");
        return;
    }

    if (date.value === "") {
        alert("Please input the date");
        return;
    }

    localStorage.getItem("userDetails") ? index = allNotes.length : index = 0;

    let note = {
        id: index,
        description: description.value,
        date: changeFormat(date.value),
        time: time.value
    };
    allNotes.push(note);
    let str = JSON.stringify(allNotes)
    localStorage.setItem("userDetails", str);

    displayNotes();
    cleanNoteBook();
}
//Create the notePad with the data 
function displayNotes() {

    let container = document.getElementById("container");
    container.innerHTML = "";
    for (let i = 0; i < allNotes.length; i++) {

        let exit = document.createElement("image");
        exit.setAttribute("class", "glyphicon glyphicon-remove");
        exit.style.cssFloat = "right";
        exit.style.marginRight = "-10px"
        exit.id = allNotes[i].id;
        exit.onclick = deleteNote;

        let div = document.createElement("div");
        div.appendChild(exit);
        container.appendChild(div);

        div.style.animation = "fadeIn 3s";// fade-in animation

        let paraDescription = document.createElement("p");
        paraDescription.setAttribute("class", "paraDescription");
        div.appendChild(paraDescription);

        let paraDate = document.createElement("p");
        paraDate.setAttribute("class", "paraDate");
        div.appendChild(paraDate);

        if (allNotes[i].time === "") {
            allNotes[i].time = "&nbsp";
        }

        paraDate.innerHTML = allNotes[i].date + "<br>" + allNotes[i].time;
        paraDescription.innerHTML = allNotes[i].description;
    }
}
//input automaticly while reloading the page the current hour of the day
function updateTime() {
    let current = new Date();
    let h = current.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    let m = current.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    document.getElementById("time").value = (h + ":" + m);
    return (h + ":" + m);
}
//delete the note by pressing the X button
function deleteNote() {
    for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i].id == this.id) {
            allNotes.splice(i, 1);
        }
    }
    str = JSON.stringify(allNotes);
    console.log(str);    
    localStorage.setItem("userDetails", str);
    displayNotes();
}
//loadind the notes from the localStorage while enterring the page
function loadNotes() {
    if (localStorage.getItem("userDetails") && allNotes) {
        allNotes = JSON.parse(localStorage.getItem("userDetails"));
        for (let item of allNotes) {
            displayNotes();
        }

    }
    else {
        allNotes = [];
    }

}
//clean the input field after addind new note
function cleanNoteBook() {
    let description = document.getElementById("textBox");
    let date = document.getElementById("datePick");
    let time = document.getElementById("time");

    description.value = "";
    date.value = "";
    time.value = updateTime();
}

// prevant the user to choose past dates
function formatDate() {
    let input = document.getElementById("datePick");
    let today = new Date();
    // Set month and day to string to add leading 0
    let day = new String(today.getDate());
    let mon = new String(today.getMonth() + 1); //January is 0!
    let yr = today.getFullYear();

    if (day.length < 2) { day = "0" + day; }
    if (mon.length < 2) { mon = "0" + mon; }

    let date = new String(yr + '-' + mon + '-' + day);

    input.setAttribute('min', date);
}

