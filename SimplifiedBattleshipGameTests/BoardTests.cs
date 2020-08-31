using SimplifiedBattleshipGame;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SimplifiedBattleshipGameTests
{
    [TestClass]
    public class BoardTests
    {
        [TestMethod]
        public void BoardGridShouldNotBeNull()
        {
            var board = new Board();

            Assert.IsNotNull(board.Grid);
        }

        [TestMethod]
        public void BoardDimensionShouldBe64()
        {
            var board = new Board();
            
            Assert.AreEqual(64, board.Dimension);
        }
    }
}