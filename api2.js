var request = new XMLHttpRequest();

function run() {

    var userInput = document.getElementById("userInput").value;
    userInput = capitaliseUserInput(userInput);
    console.log(userInput);

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayNicely(this.responseText);
        }
        else {
            document.getElementById("data").innerHTML = "Invalid user input: input must be a city name";
        }
    }

    function displayNicely(apiData) {
        let newData = JSON.parse(apiData);
        console.log(newData);
        let htmlString = "<div><strong>City:</strong> " + newData.name + "</div";
        htmlString += "<div><br/><strong>Current weather:</strong> " + newData.weather[0].description + "</div";
        htmlString += "<div><br/><strong>Temperature:</strong> " + (newData.main.temp - 273.15).toFixed(2) + " celsius</div";
        htmlString += "<div><br/><strong>Pressure:</strong> " + newData.main.pressure + "mb</div";
        htmlString += "<div><br/><strong>Humidity:</strong> " + newData.main.humidity + "</div";
        htmlString += "<div><br/><strong>Current weather:</strong> " + newData.weather[0].description + "</div";
        document.getElementById("data").innerHTML = htmlString;
    }

    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&APPID=6ebea87dfc131fd5402906ce4b098ab8");
    console.log(request);
    request.send();

}

function capitaliseUserInput(toCapitalise) {
    return toCapitalise.charAt(0).toUpperCase() + toCapitalise.slice(1);
}
