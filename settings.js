const Promise = require('bluebird');
const fp = require('lodash/fp');
//
// let boilerPlateMarket =
// {
//     marketName: '',
//     URL: '', //URL To Fetch API From.
//     toBTCURL: false, //URL, if needed for an external bitcoin price api.
//     last: function (data, coin_prices) { //Get the last price of coins in JSON data
//         return new Promise(function (res, rej) {
//             try {
//                 for (x in / of data) {
//                     price = ...;
//                     coin_prices[coinName][marketName] = price;
//                 }
//                 res(coin_prices);
//             }
//             catch (err) {
//                 rej(err);
//             }
//
//         })
//     },
//
//
// }

let markets = [

  // {
  //     marketName: 'cryptowatchAPI',
  //     URL: 'https://api.cryptowat.ch/markets/summaries', //URL To Fetch API From.
  //     toBTCURL: false, //URL, if needed for an external bitcoin price api.
  //
  //     last: function (data, coin_prices, toBTCURL) { //Where to find the last price of coin in JSON data
  //         return new Promise(function (res, rej) {
  //             try {
  //                 data = data.result;
  //                 for (let key in data) {
  //                     let marketPair = key.split(':');
  //                     let market = marketPair[0], pair = marketPair[1];
  //                     let indexOfBTC = pair.indexOf('btc');
  //                     if (indexOfBTC > 0 && !pair.includes('future') && !market.includes('qryptos') && !market.includes('quoine') && !market.includes('poloniex')) {
  //                         if(marketNames.indexOf(market) === -1 ){
  //                             marketNames.push([[market], ['']]);
  //                             console.log(marketNames);
  //                         }
  //                         let coin = pair.replace(/btc/i, '').toUpperCase();
  //                         let price = data[key].price.last;
  //                         if(price > 0) {
  //                             if (!coin_prices[coin]) coin_prices[coin] = {};
  //                             coin_prices[coin][market] = price;
  //
  //                         }
  //                     }
  //                 }
  //                 res(coin_prices);
  //             }
  //             catch (err) {
  //                 console.log(err);
  //                 rej(err)
  //             }
  //         })
  //     }
  //
  // },
  {
    marketName: 'bittrex',
    URL: 'https://bittrex.com/api/v1.1/public/getmarketsummaries',
    toBTCURL: false,
    pairURL : '',
    last: function (data, coin_prices) { //Where to find the last price of coin in JSON data
      return new Promise(function (res, rej) {
        try {
          for (let obj of data.result) {
            if(obj["MarketName"].includes('BTC-')) {
              let coinName = obj["MarketName"].replace("BTC-", '');
              if (!coin_prices[coinName]) coin_prices[coinName] = {};
              coin_prices[coinName].bittrex = obj.Last;
            }
          }
          res(coin_prices);
        }
        catch (err) {
          console.log(err);
          rej(err);
        }

      })
    },

  },

  // {
  //     marketName: 'btc38',
  //     URL: 'http://api.btc38.com/v1/ticker.php?c=all&mk_type=cny',
  //     toBTCURL: false,
  //     pairURL : '',
  //     last: function (data, coin_prices, toBTCURL) { //Where to find the last price of coin in JSON data
  //         return new Promise(function (res, rej) {
  //             let priceOfBTC = data.btc.ticker.last;
  //             try {
  //                 for (let key in data) {
  //                     let coinName = key.toUpperCase();
  //                     let price = data[key]['ticker'].last;
  //                     if (!coin_prices[coinName]) coin_prices[coinName] = {};

  //                     coin_prices[coinName]["btc38"] = data[key]['ticker'].last / priceOfBTC;
  //                 }
  //                 res(coin_prices);
  //             }

  //             catch (err) {
  //                 console.log(err);
  //                 rej(err)
  //             }
  //         })
  //     }
  // },

  // {
  //   marketName: 'jubi',
  //   URL: 'https://www.jubi.com/api/v1/allticker/', //URL To Fetch API From.
  //   toBTCURL: false, //URL, if needed for an external bitcoin price api.
  //   pairURL : '',
  //   last: function (data, coin_prices, toBTCURL) { //Where to find the last price of coin in JSON data
  //     return new Promise(function (res, rej) {
  //       let priceOfBTC = data.btc.last;
  //       console.log(priceOfBTC);
  //       try {
  //         for (let key in data) {
  //           let coinName = key.toUpperCase();
  //           let price = data[key].last;
  //           if (!coin_prices[coinName]) coin_prices[coinName] = {};

  //           coin_prices[coinName]["jubi"] = data[key].last / priceOfBTC;
  //         }
  //         res(coin_prices);
  //       }

  //       catch (err) {
  //         console.log(err);
  //         rej(err)
  //       }
  //     })
  //   }

  // },


  {
    marketName: 'poloniex',
    URL: 'https://poloniex.com/public?command=returnTicker',
    toBTCURL: false,
    pairURL : '',
    last: function (data, coin_prices) { //Where to find the last price of coin in JSON data
      return new Promise(function (res, rej) {
        try {
          for (var obj in data) {
            if(obj.includes('BTC_')&&obj!=="BTC_EMC2") {
              let coinName = obj.replace("BTC_", '');
              if (!coin_prices[coinName]) coin_prices[coinName] = {};
              coin_prices[coinName].poloniex = data[obj].last;
            }
          }
          res(coin_prices);
        }
        catch (err) {
          console.log(err);
          rej(err);
        }

      })
    },

  },

  {
    marketName: 'cryptopia',
    URL: 'https://www.cryptopia.co.nz/api/GetMarkets/BTC', //URL To Fetch API From.
    toBTCURL: false, //URL, if needed for an external bitcoin price api.
    pairURL : '',
    last: function (data, coin_prices) { //Get the last price of coins in JSON data
      return new Promise(function (res, rej) {
        try {
          for (let obj of data.Data) {
            if(obj["Label"].includes('/BTC')) {
              let coinName = obj["Label"].replace("/BTC", '');
              if (!coin_prices[coinName]) coin_prices[coinName] = {};
              coin_prices[coinName].cryptopia = obj.LastPrice;
            }
          }
          res(coin_prices);

        }
        catch (err) {
          console.log(err);
          rej(err);
        }

      })
    },
  },

  {
    marketName: 'bleutrade',
    URL: 'https://bleutrade.com/api/v2/public/getmarketsummaries', //URL To Fetch API From.
    toBTCURL: false, //URL, if needed for an external bitcoin price api.
    pairURL : '',
    last: function (data, coin_prices) { //Get the last price of coins in JSON data
      return new Promise(function (res, rej) {
        try {
          for (let obj of data.result) {
            if(obj["MarketName"].includes('_BTC')) {
              let coinName = obj["MarketName"].replace("_BTC", '');
              if (!coin_prices[coinName]) coin_prices[coinName] = {};
              coin_prices[coinName].bleutrade = obj.Last;
            }
          }
          res(coin_prices);

        }
        catch (err) {
          console.log(err);
          rej(err);
        }

      })
    },
  },

  {

    marketName: 'kraken', // kraken has no one size fits all market summery so each pair has to be entered as param in GET - will need to add new coins as they are added to exchange
    URL: 'https://api.kraken.com/0/public/Ticker?pair=DASHXBT,EOSXBT,GNOXBT,ETCXBT,ETHXBT,ICNXBT,LTCXBT,MLNXBT,REPXBT,XDGXBT,XLMXBT,XMRXBT,XRPXBT,ZECXBT', //URL To Fetch API From.
    toBTCURL: false, //URL, if needed for an external bitcoin price api.
    pairURL : '',
    last: function (data, coin_prices) { //Get the last price of coins in JSON data
      return new Promise(function (res, rej) {
        try {
          for (let key in data.result) {
            let arr = key.match(/DASH|EOS|GNO|ETC|ETH|ICN|LTC|MLN|REP|XDG|XLM|XMR|XRP|ZEC/); // matching real names to weird kraken api coin pairs like "XETCXXBT" etc
            let name = key;
            let matchedName = arr[0];
            if (matchedName === "XDG") { //kraken calls DOGE "XDG" for whatever reason
              let matchedName = "DOGE";
              var coinName = matchedName;
            } else {
              var coinName = matchedName;
            }

            if (!coin_prices[coinName]) coin_prices[coinName] = {};

            coin_prices[coinName].kraken = data.result[name].c[0];

          }
          res(coin_prices);

        }
        catch (err) {
          console.log(err);
          rej(err);
        }

      });
    }
  },

  {
    marketName: 'binance',
    URL: 'https://api.binance.com/api/v3/ticker/price', //URL To Fetch API From.
    toBTCURL: false, //URL, if needed for an external bitcoin price api.
    pairURL : '',
    last: function (data, coin_prices) { //Get the last price of coins in JSON data
      console.log(data);
      return new Promise(function (res, rej) {
        try {
          data.forEach(pair => {
            if (pair.symbol.endsWith('BTC')) {
              let price = pair.price;
              let coinName = pair.symbol.substring(0, pair.symbol.length - 3);
              if (!coin_prices[coinName]) {
                coin_prices[coinName] = {};
              }
              coin_prices[coinName].binance = price;
            }
          });
          res(coin_prices);
        } catch (err) {
          console.error(err);
          rej(err);
        }
      });
    }
  },

  {
    marketName: 'indodaxbtc',
    URL: 'https://indodax.com/api/{}/ticker', //URL To Fetch API From.
    toBTCURL: false, //URL, if needed for an external bitcoin price api.
    pairs: [ 'bts_btc', 'drk_btc', 'doge_btc', 'eth_btc', 'ltc_btc', 'nxt_btc', 'ten_btc',
             'nem_btc', 'str_btc', 'xrp_btc' ],
    pairURL : '',
    last: function (data, coin_prices) { //Get the last price of coins in JSON data

      function nameTransform(coinName) {
        switch (coinName) {
          case 'DRK':
            return 'DASH';
          case 'STR':
            return 'XLM';
          case 'NEM':
            return 'XEM';
          default:
            return coinName;
        }
      }

      return new Promise(function (res, rej) {

        data.forEach(pair => {
          const pairName = fp.find(key => {
            return key.startsWith('vol_') && key !== 'vol_btc';
          })(Object.keys(pair.ticker));
          if (!pairName) {
            return rej(new Error('no pair name'));
          }
          let coinName = nameTransform(pairName.substring(4).toUpperCase());

          let price = pair.ticker.last;
          if (!coin_prices[coinName]) {
            coin_prices[coinName] = {};
          }
          coin_prices[coinName].indodaxbtc = price;
          return true;
        });
        return res(coin_prices);
      }).catch((err) => {
        console.error(err);
        throw err;
      });
    }
  },

  // This is for IDR pair in indodax. The IDR prices are converted to BTC using IDR/BTC price at the moment
  // So the suggestion made by this market is to buy/sell the coins to IDR
  {
    marketName: 'indodaxidr',
    URL: 'https://indodax.com/api/{}/ticker', //URL To Fetch API From.
    toBTCURL: false, //URL, if needed for an external bitcoin price api.
    pairs: [ 'btc_idr', 'ten_idr', 'act_idr', 'ada_idr', 'bcd_idr', 'bch_idr', 'btg_idr', 'bts_idr',
             'drk_idr', 'dax_idr', 'doge_idr', 'eth_idr', 'etc_idr', 'ignis_idr', 'gsc_idr', 'ltc_idr',
             'stq_idr', 'nem_idr', 'nxt_idr', 'trx_idr', 'sumo_idr', 'waves_idr', 'str_idr', 'xrp_idr',
             'xzc_idr' ],
    pairURL : '',
    last: function (data, coin_prices) { //Get the last price of coins in JSON data

      function nameTransform(coinName) {
        switch (coinName) {
          case 'DRK':
            return 'DASH';
          case 'STR':
            return 'XLM';
          case 'NEM':
            return 'XEM';
          default:
            return coinName;
        }
      }

      return new Promise(function (res, rej) {

        let btcPrice;

        data.forEach(pair => {
          const pairName = fp.find(key => {
            return key.startsWith('vol_') && key !== 'vol_idr';
          })(Object.keys(pair.ticker));
          if (!pairName) {
            return rej(new Error('no pair name'));
          }
          let coinName = nameTransform(pairName.substring(4).toUpperCase());

          if (coinName === 'BTC') {
            // save the IDR/BTC price
            btcPrice = pair.ticker.last;
          } else {
            if (btcPrice) {
              let price = pair.ticker.last;
              if (!coin_prices[coinName]) {
                coin_prices[coinName] = {};
              }

              // convert prices from IDR to BTC
              coin_prices[coinName].indodaxidr = (price / btcPrice).toFixed(8);
            }
          }
          return true;
        });
        return res(coin_prices);
      }).catch((err) => {
        console.error(err);
        throw err;
      });
    }
  },
];

let marketNames = [];
for(let i = 0; i < markets.length; i++) { // Loop except cryptowatch
  marketNames.push([[markets[i].marketName], [markets[i].pairURL]]);
}
console.log("Markets:", marketNames);
module.exports = function () {
  this.markets = markets;
  this.marketNames = marketNames;
};
