// JavaScript source code
function Answer1() {
    var x = document.getElementById("Ans1");
    var y = document.getElementById("But1");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.innerHTML = "Hide Answer";
    } else {
        x.style.display = "none";
        y.innerHTML = "Show Answer";
    }
}
function Answer2() {
    var x = document.getElementById("Ans2");
    var y = document.getElementById("But2");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.innerHTML = "Hide Answer";
    } else {
        x.style.display = "none";
        y.innerHTML = "Show Answer";
    }
}

function Answer3() {
    var x = document.getElementById("Ans3");
    var y = document.getElementById("But3");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.innerHTML = "Hide Answer";
    } else {
        x.style.display = "none";
        y.innerHTML = "Show Answer";
    }
}

function ChangeCSS(file) {
    document.getElementById("Style").setAttribute('href', file);
}

function clock() {
    var today = new Date();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    document.getElementById('time').innerHTML =
        hour + ":" + min + ":" + sec;
    var t = setTimeout(clock, 3000);
}

function myFunction(imgs) {
    var expandImg = document.getElementById("expandedImg");
    expandImg.src = imgs.src;
    expandImg.parentElement.style.display = "block";
    //document.getElementById("imgtext").style.border = '4em solid black';

}

function img(clicked_id) {
    document.getElementById("col1").style.border = "none";
    document.getElementById("col2").style.border = "none";
    document.getElementById("col3").style.border = "none";
    document.getElementById("col4").style.border = "none";
    document.getElementById(clicked_id).style.border = "thick solid #0000FF";
}
