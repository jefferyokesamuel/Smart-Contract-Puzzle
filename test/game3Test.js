const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();
    const signers = []

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1)
    const signer3 = ethers.provider.getSigner(2)

    signers.push(signer, signer2, signer3);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signers };
  }

  it('should be a winner', async function () {
    const { game, signers } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(signers[0]).buy({ value: '2' });
    await game.connect(signers[1]).buy({ value: '3' });
    await game.connect(signers[2]).buy({ value: '1' });

    // TODO: win expects three arguments
    const first = signers[0].getAddress()
    const second = signers[1].getAddress()
    const third = signers[2].getAddress()

    await game.win(first, second, third);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
