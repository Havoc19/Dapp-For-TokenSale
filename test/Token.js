const Token = artifacts.require("./Token.sol");

contract('Token',function(accounts){
    var tokenInstance;

    it('initializes the contract with correct values',function(){
        return Token.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, 'Earthen','Doesn\'t has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol,'ERH','Doesn\'t have the correct symbol');
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard,'Earthen v1.0','Doesn\'t has the correct standard');
        });
    })

    it('allocates the initial supply upon deployment',function(){
        return Token.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),100000,'set the total supply to 100000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(),100000,'allocate the initial supply to the admin account');
        });
    });

    it('transfers token ownership',function(){
        return Token.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1],99999999999999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0,'error message must contain revert');
            return tokenInstance.transfer(accounts[1],25000,{from : accounts[0]});
        }).then(function(receipt){
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(),25000,'adds the amount to receiver');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(),75000,'deducts amount from sending account');
        });
    });





})