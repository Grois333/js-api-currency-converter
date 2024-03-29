//API COUNTRY CURRENCY LINK: http://www.apilayer.net/api/list?access_key=075d15d60a95b06528ad8d5812e3d35e&format=1

//API COUNTRY EXCHANGE RATE LINK: http://www.apilayer.net/api/live?access_key=075d15d60a95b06528ad8d5812e3d35e&format=1

//Fetch Api and assign the currencies in created Option tags for the First Select
fetch(
    "http://www.apilayer.net/api/list?access_key=075d15d60a95b06528ad8d5812e3d35e&format=1"
)
    .then(response => response.json())
    .then(response => response.currencies)
    //.then(console.log)
    .then(data => {
        for (key in data) {
            //console.log(key);
            //console.log(data[key]);

            let options1 = document.createElement("option");
            options1.setAttribute("value", key);
            options1.innerText = `${key} - ${data[key]}`;
            options1.setAttribute("id", key);
            document.querySelector("#list_country1").appendChild(options1);

            let options2 = document.createElement("option");
            options2.setAttribute("value", key);
            options2.innerText = `${key} - ${data[key]}`;
            options2.setAttribute("id", key);
            document.querySelector("#list_country2").appendChild(options2);
        }
    });

//Fetch Api and assign the currencies in created Option tags for the Second Select
// fetch(
//     "http://www.apilayer.net/api/list?access_key=075d15d60a95b06528ad8d5812e3d35e&format=1"
// )
//     .then(response => response.json())
//     .then(response => response.currencies)
//     .then(console.log)
//     .then(data => {
//         for (key in data) {
//             //console.log(key);
//             //console.log(data[key]);
//             let options2 = document.createElement("option");
//             options2.setAttribute("value", key);
//             options2.innerText = `${key} - ${data[key]}`;
//             options2.setAttribute("id", key);
//             document.querySelector("#list_country2").appendChild(options2);
//         }
//     });

//Calculate the conversion onclick
document.querySelector("button").onclick = function () {

    var value1;
    var value2;

    //Select each of the first SELECT currency with its index
    let choice1 = document.querySelector("#list_country1").selectedIndex;
    //console.log(choice1);

    //Select the id of the currency
    let monney1 = document.querySelector("#list_country1").options[choice1].id;
    //console.log(monney1);

    //Select each of the second SELECT currency with its index
    let choice2 = document.querySelector("#list_country2").selectedIndex;
    //console.log(choice2);

    //Select the id of the currency
    let monney2 = document.querySelector("#list_country2").options[choice2].id;
    //console.log(monney2);

    //Select the amount input
    let amount = document.querySelector("input").value;
    //console.log(amount);

    //Fetch the exchange currency API Link, loop the keys and assign the rate values
    fetch(
        "http://www.apilayer.net/api/live?access_key=075d15d60a95b06528ad8d5812e3d35e&format=1"
    )
        .then(response => response.json())
        .then(response => response.quotes)
        //.then(console.log)
        .then(data => {
            for (key in data) {
                //Currency
                //console.log(key);

                //Rate
                //console.log(data[key]);

                if (key == "USD" + monney1) {
                    value1 = data[key];
                    //console.log(value1)
                }
                if (key == "USD" + monney2) {
                    value2 = data[key];
                    //console.log(value2)
                }
            }

            //Return the values for each selected currency
            return [value1, value2];
        })
        .then(values => {
            //Add the conversion calculation to the span
            document.querySelector("span").textContent =
                (amount * value2) / value1 + " " + monney2;
        });
};