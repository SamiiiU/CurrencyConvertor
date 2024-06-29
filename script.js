


const main_URL = "https://v6.exchangerate-api.com/v6/1224c7caacaaccb4d00c79e6/latest/PKR";


const dropdown = document.querySelectorAll(".dropdown select");

let btn = document.querySelector("button");

let fromCur = document.querySelector(".from select");

let toCur = document.querySelector(".to select");

let massage = document.querySelector(".msg");





for(let select of dropdown){
    for(currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if(select.name === "from" && currCode === "AED"){
            newOpt.selected = "selected";
        }   
        else if(select.name === "to" && currCode === "PKR"){
            newOpt.selected = "selected";
        }    
        select.append(newOpt);
    }

    select.addEventListener("change" , (evt) => {
        flag(evt.target);
    })
}



//flag update function
const flag = (ele) => {
    let currCode = ele.value;
    let cont_code = countryList[currCode];
    let flagUrl = `https://flagsapi.com/${cont_code}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = flagUrl;
};


btn.addEventListener("click" , async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    
    console.log(amount.value);
    if(amt === "" || amt <= 1){
        amt = 1;
        amount.value = 1;
    }

    //Fetching URL
    const URL = `https://v6.exchangerate-api.com/v6/1224c7caacaaccb4d00c79e6/latest/${fromCur.value}`;
    let response = await fetch(URL);
    let data = await response.json();

    let rates = data.conversion_rates;
    let final_amount = (amt * rates[toCur.value]).toFixed(3);
    console.log(final_amount);
    
    massage.innerHTML = amt + " " + data.base_code + " = " + final_amount + " " + toCur.value;    

});
