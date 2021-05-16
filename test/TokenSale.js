const TokenSale = artifacts.require("./TokenSale");
contract('TokenSale', function(accounts){
    var tokenSaleInstance;
    var tokenPrice = 100000000000000;
    var buyer = accounts[1];

    it('intialize the contract with correct values',function(){
        return TokenSale.deployed().then(function(instance){
            tokenSaleInstance = instance;
            return tokenSaleInstance.address;
        }).then(function(address){
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).then(function(address){
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenPrice();
        }).then(function(price){
            assert.equal(price, tokenPrice, 'token price is correct');
        });
    });

    it('facilitates token buying',function(){
        return TokenSale.deployed().then(function(instance){
            tokenSaleInstance = instance;
            numberOfTokens = 10;
            return tokenSaleInstance.buyTokens(numberOfTokens,{from : buyer,value: numberOfTokens * tokenPrice})       
    }).then(function(receipt){
        return tokenSaleInstance.tokensSold();
    }).then(function(amount){
        assert.equal(amount.toNumber(),numberOfTokens,'increment the number of tokens sold');
        return tokenSaleInstance.buyTokens(numberOfTokens,{from : buyer,value : 1});
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert') >= 0,'msg.value must equal number of tokens in wei');
    });
});

})