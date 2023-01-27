const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
 
describe('Game2', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game2');
    const game = await Game.deploy();

    return { game };
  }

  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // press all the right switches to win this stage
    game.switchOn(20)
    game.switchOn(47)
    game.switchOn(212)

    await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
