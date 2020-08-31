using System;
using SimplifiedBattleshipGame;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SimplifiedBattleshipGameTests
{
    [TestClass]
    public class ShipTests
    {
        [TestMethod]
        public void ShipLengthShouldBe3()
        {
            var expectedLength = 3;

            var ship = new Ship();

            Assert.AreEqual(expectedLength, ship.Length);
        }

        [TestMethod]
        public void ShipShouldSink()
        {
            var ship = new Ship();

            ship.Hits = 3;

            Assert.IsTrue(ship.IsSunk);
        }

        [TestMethod]
        public void ShipShouldNotSink()
        {
            var ship = new Ship();

            ship.Hits++;

            Assert.IsFalse(ship.IsSunk);
        }
    }
}