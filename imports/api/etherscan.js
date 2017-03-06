// import '../../client/main.html';
// import { Template } from 'meteor/templating';

etherscanAccountBalance = function etherscanAccountBalance() {
    var account_url = "https://testnet.etherscan.io/api?module=account&action=balance&address=0x5097D17e4C8b2372Ae6082CEA32Ac7AFdFDE3c28&tag=latest&apikey=HBVQZ9YIPPDFF94WR7H4FTRTIMYI8IJN3V";

    var xmlhttp = new XMLHttpRequest();
    var myresult;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myresult = myArr["result"];
        }
    };
    xmlhttp.open("GET", account_url, false); // synchronous request
    xmlhttp.send();

    return myresult * 0.000000000000000001; // convert to ETH
}
