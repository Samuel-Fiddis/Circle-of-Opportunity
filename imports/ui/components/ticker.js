// Downloaded package to allow us to pull GBP
// Can get a number of different currencies

EthTools.ticker.start();
EthTools.setUnit('gbp');
var gbp = EthTools.ticker.findOne('gbp');
if(gbp)
    console.log("GBP ether price: " + gbp.price); // "2.0000"