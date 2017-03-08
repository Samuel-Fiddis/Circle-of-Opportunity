var ETHERSCAN_API_KEY = "HBVQZ9YIPPDFF94WR7H4FTRTIMYI8IJN3V";

etherscanAccountBalance = function etherscanAccountBalance(address) {
    var testnet_url = "https://testnet.etherscan.io/api?";
    var balance_action = "module=account&action=balance&address=";
    var balance_url = testnet_url + balance_action + address + "&tag=latest&apikey=" + ETHERSCAN_API_KEY;

    var myresult = jsonValueGet(balance_url, "result");
    // console.log(myresult);
    if (myresult == "Error!") {
      // console.log(myresult);
      throw "Address field is empty or invalid";
      return false;
    }
    return myresult * 0.000000000000000001; // convert to ETH
}

// 8/8 statements
// 2/2 branches

jsonValueGet = function jsonValueGet(url, key) {
    var xmlhttp = new XMLHttpRequest();
    var myresult;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myresult = myArr[key];
        }
    };
    xmlhttp.open("GET", url, false); // synchronous request
    xmlhttp.send();

    return myresult;
}

// 10/10 statements
// 2/2 branches
