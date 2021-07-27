//Variable used to decide if the list of cars needs to be sorted in a particular way
var sortParem;

//Main function. Used to fetch the json data and display it.
function fetchData(sortParem){
    fetch("http://www.cartrawler.com/ctabe/cars.json").then(response => {
        if (!response.ok){
            throw Error("Error");
        }
        return response.json();
    })
    //The fetched data is put into array cars through a nested for loop.
    //The first for loop goes through all the vendors, the vendor name is stored so that the vendor name can be stored in each cars array easier.
    //The nested for loop then goes through all the cars at that vendor and adds each cars details and its associated vendor
    .then(data => {
        var cars = [];
        for (i=0; i<data[0].VehAvailRSCore.VehVendorAvails.length; i++){
            var vendor = [data[0].VehAvailRSCore.VehVendorAvails[i].Vendor["@Name"]];
                for (j=0; j<data[0].VehAvailRSCore.VehVendorAvails[i].VehAvails.length; j++){
                    var carInfo = data[0].VehAvailRSCore.VehVendorAvails[i].VehAvails[j];
                    carInfo.Vendor = vendor;
                    cars.push(carInfo); 
                }
        }

        //If statement to sort how the cards are displayed. This is connected to the drop down.
        //if the variable in fetch function is low or high then the coresponding function is ran to sort the list of cars. 
        //If sortParem is neither of these two then low to high is done, making it the default.
        if (sortParem == "Low") {
            sortCarsLowHigh(cars);
        } else if (sortParem == "High"){
            sortCarsHighLow(cars);
        } else {
            sortCarsLowHigh(cars);
        }

        //Getting variables for the legend so that these can be displayed
        var pickupLocation = data[0].VehAvailRSCore.VehRentalCore.PickUpLocation["@Name"];
        var pickupInput = data[0].VehAvailRSCore.VehRentalCore["@PickUpDateTime"];
        var pickupFields = pickupInput.split('T');
        var pickupDate= pickupFields[0].split('-');
        var pickupDay= pickupDate[2];
        var pickupMonth= pickupDate[1];
        var pickupYear= pickupDate[0];
        var pickupTime = pickupFields[1].substring(0, pickupFields[1].length - 4);;

        var returnLocation = data[0].VehAvailRSCore.VehRentalCore.ReturnLocation["@Name"];
        var returnInput = data[0].VehAvailRSCore.VehRentalCore["@ReturnDateTime"];
        var returnFields = returnInput.split('T');
        var returnDate= returnFields[0].split('-');
        var returnDay= returnDate[2];
        var returnMonth= returnDate[1];
        var returnYear= returnDate[0];
        var returnTime = returnFields[1].substring(0, returnFields[1].length - 4);;

        //variable with the html for the legend column
        var legend = `
            <div class="row g-3" id="legendRow">
                <div class="col-3">
                </div>
                <div class="col-3 border border-dark rounded-start bg-secondary text-white" id="legend">
                <p>Pickup Location: ${pickupLocation}</p>
                <p>Pickup Date: ${pickupDay}-${pickupMonth}-${pickupYear}</p>
                <p>Pickup Time: ${pickupTime}</p>
                </div>
                <div class="col-3 border border-dark rounded-end bg-secondary text-white" id="legend">
                <p>Return Location: ${returnLocation}</p>
                <p>Return Date: ${returnDay}-${returnMonth}-${returnYear}</p>
                <p>Return Time: ${returnTime}</p>
                </div>
                <div class="col-3">
                </div>
            </div>
        `
        
        //variable with the html for the dropdown column
        var dropdown = `
        <div class="col-12 g-3 d-flex" id="dropdownRow">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort Cars
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" onclick='repopulate();fetchData("Low")' href="#">Price : Lowest - Highest</a></li>
                    <li><a class="dropdown-item" onclick='repopulate();fetchData("High")' href="#">Price : Highest - Lowest</a></li>
                </ul>
            </div>
        </div>
        `
        //To display the cars, the cars array is mapped to a new array called vehicle. The html if for reach element in the vehicle array is then created and joined toghter 
        var carCards = cars.map(vehicle => {
            return `
            <div class="col-12 col-md-4 gy-3" id="carCard">
                <div class="card border-secondary mb-3 h-100" id="${vehicle.Vendor} ${vehicle.Vehicle.VehMakeModel["@Name"]}">
                    <img src="${vehicle.Vehicle["PictureURL"]}" class="card-img-top" alt="Picture of ${vehicle.Vehicle.VehMakeModel["@Name"]}">
                    <div class="card-body">
                        <h4 class="card-title">${vehicle.Vehicle.VehMakeModel["@Name"]}</h4>
                        <h5 class="card-subtitle mb-2 ">Cost: &euro;${vehicle.TotalCharge["@RateTotalAmount"]} </h5>
                        <h5 class="card-subtitle mb-2 ">Vendor: ${vehicle.Vendor} </h5>
                        <h5 class="card-subtitle mb-2 ">Status: ${vehicle["@Status"]} </h5>
                        <h5 class="card-subtitle mb-2 ">Details : </h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Passengers: ${vehicle.Vehicle["@PassengerQuantity"]} </li>
                            <li class="list-group-item">Baggage: ${vehicle.Vehicle["@BaggageQuantity"]} </li>
                            <li class="list-group-item">Fuel: ${vehicle.Vehicle["@FuelType"]} </li>
                            <li class="list-group-item">Transmission: ${vehicle.Vehicle["@TransmissionType"]} </li>
                            <li class="list-group-item">Air Conditioned: ${vehicle.Vehicle["@AirConditionInd"]} </li>
                            <li class="list-group-item">Drive Type: ${vehicle.Vehicle["@DriveType"]}</li>
                            <li class="list-group-item">Doors: ${vehicle.Vehicle["@DoorCount"]} </li>
                        </ul>
                        <a href="#" onclick='store("${vehicle.Vendor} ${vehicle.Vehicle.VehMakeModel["@Name"]}")' class="btn btn-secondary" id="button">More Details</a>
                    </div>
                </div>
            </div>
            `;
        }).join("");

        //These three lines then insert the html for the legend, dropdown and car cards into the app div.
        document.querySelector("#app").insertAdjacentHTML("beforeend", legend);
        document.querySelector("#app").insertAdjacentHTML("beforeend", dropdown);
        document.querySelector("#app").insertAdjacentHTML("beforeend", carCards);

    }).catch(error => {
        console.log(error);
    });
}

    //function used to go through the cars array and sort them by lowest to highest
    function sortCarsLowHigh(cars){
        cars.sort(function (a, b){
            return a.TotalCharge["@RateTotalAmount"] - b.TotalCharge["@RateTotalAmount"];
        })
    }

    //function used to go through the cars array and sort them by highest to lowest
    function sortCarsHighLow(cars){
        cars.sort(function (a, b){
            return b.TotalCharge["@RateTotalAmount"] - a.TotalCharge["@RateTotalAmount"];
        })
    }

    //Function used to empty all the htlm from the app div. This is used in the button to sort as the html needs to be deleted so that it can be repoulated through a new fetchData()
    function repopulate(){
        var myNode = document.getElementById("app");
        myNode.innerHTML = '';
      }

      //function used to store selected car in the session memory when you click for more details. Info.html is then loaded.
      function store(car) {
        var carInfo = document.getElementById(`${car}`);
        carInfoString = carInfo.outerHTML;
        sessionStorage.setItem("carInfo", carInfoString);
        location.href = "info.html";


      }

      //function used to get the prevously selected car info and display it on info.html.
      //An if statements is ran incase you where to access info.html without prevously selecting a car. If so then an error alert is shown.
      function get() {
        var carCard = sessionStorage.getItem("carInfo");
        var errorAlert = `
        <div class="alert alert-secondary" role="alert">
            <strong>Error</strong> - Page loaded without selecting car. Please click the return button to head to the homepage.
        </div>`
        if(carCard==null){
            document.querySelector("#load").insertAdjacentHTML("beforeend", errorAlert);
        }else{
            document.querySelector("#load").insertAdjacentHTML("beforeend", carCard);
            var button = document.getElementById('button');
            button.remove(); 
        }

      }


 