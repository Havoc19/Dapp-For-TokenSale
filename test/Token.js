const Token = artifacts.require("./Token.sol");

contract('Token',function(accounts){
    it('sets the total supply upon deployment',function(){
        return Token.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),100000,'set the total suppky to 100000');
        });
    });
})