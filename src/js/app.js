App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',

    init: function(){
        console.log("Spp initialized...")
        return App.initWeb3();
    },

    initWeb3: function(){
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
          } else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
          }
          return App.initContracts();
    },

    initContracts: function() {
        $.getJSON("TokenSale.json", function(TokenSale) {
          App.contracts.TokenSale = TruffleContract(TokenSale);
          App.contracts.TokenSale.setProvider(App.web3Provider);
          App.contracts.TokenSale.deployed().then(function(TokenSale) {
            console.log("Token Sale Address:", TokenSale.address);
          });
        }).done(function() {
          $.getJSON("Token.json", function(Token) {
            App.contracts.Token = TruffleContract(Token);
            App.contracts.Token.setProvider(App.web3Provider);
            App.contracts.Token.deployed().then(function(Token) {
              console.log("Token Address:", Token.address);
            });
            
            // App.listenForEvents();
            return App.render();
          });
        })
      },
      render: function() {
    //     if (App.loading) {
    //       return;
    //     }
    //     App.loading = true;
    
    //     var loader  = $('#loader');
    //     var content = $('#content');
    
    //     loader.show();
    //     content.hide();
    
    //     // Load account data
        web3.eth.getCoinbase(function(err, account) {
          if(err === null) {
              console.log("account", account);
            App.account = account;
            $('#accountAddress').html("Your Account: " + account);
          }
        })
    
    //     // Load token sale contract
    //     App.contracts.DappTokenSale.deployed().then(function(instance) {
    //       dappTokenSaleInstance = instance;
    //       return dappTokenSaleInstance.tokenPrice();
    //     }).then(function(tokenPrice) {
    //       App.tokenPrice = tokenPrice;
    //       $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
    //       return dappTokenSaleInstance.tokensSold();
    //     }).then(function(tokensSold) {
    //       App.tokensSold = tokensSold.toNumber();
    //       $('.tokens-sold').html(App.tokensSold);
    //       $('.tokens-available').html(App.tokensAvailable);
    
    //       var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
    //       $('#progress').css('width', progressPercent + '%');
    
    //       // Load token contract
    //       App.contracts.DappToken.deployed().then(function(instance) {
    //         dappTokenInstance = instance;
    //         return dappTokenInstance.balanceOf(App.account);
    //       }).then(function(balance) {
    //         $('.dapp-balance').html(balance.toNumber());
    //         App.loading = false;
    //         loader.hide();
    //         content.show();
    //       })
    //     });
    //   },
    //   buyTokens: function() {
    //     $('#content').hide();
    //     $('#loader').show();
    //     var numberOfTokens = $('#numberOfTokens').val();
    //     App.contracts.DappTokenSale.deployed().then(function(instance) {
    //       return instance.buyTokens(numberOfTokens, {
    //         from: App.account,
    //         value: numberOfTokens * App.tokenPrice,
    //         gas: 500000 // Gas limit
    //       });
    //     }).then(function(result) {
    //       console.log("Tokens bought...")
    //       $('form').trigger('reset') // reset number of tokens in form
    //       // Wait for Sell event
    //     });
      }
}

$(function(){
    $(window).load(function(){
        App.init();
    })
});