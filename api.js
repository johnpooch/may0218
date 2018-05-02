// XML means extensible markup language
let request = new XMLHttpRequest();

function displayNicely(apiData) {
    let newData = JSON.parse(apiData);
    console.log("x");
    document.getElementById("data").innerHTML +=
        "<strong>Name:</strong> " + newData.name +
        "<br/><strong>Height:</strong> " + newData.height + "cm" +
        "<br/><strong>Mass:</strong> " + newData.mass + "kg" +
        "<br/><strong>Gender:</strong> " + newData.gender + "<br/><br/>";
}

function loopRequest() {
    for (var i = 1; i < 88; i++) {
        console.log(i);
        request.open("GET", "https://swapi.co/api/people/" + i + "/");
        request.send();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                displayNicely(this.responseText);
            }
        }
        request = new XMLHttpRequest();
    }
}
loopRequest();
