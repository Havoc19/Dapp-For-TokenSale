const Token = artifacts.require("./Token.sol");
const TokenSale = artifacts.require("./TokenSale");

module.exports = function(deployer) {
  deployer.deploy(Token,100000).then(function(){
    return deployer.deploy(TokenSale, Token.address, 100000000000000);
  });
};