using System;
using SimplifiedBattleshipGame;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SimplifiedBattleshipGameTests
{
    [TestClass]
    public class PlayerTests
    {
        [TestMethod]
        public void PlayerShouldHaveAShipWithLengthOf3()
        {
            var expectedLength = 3;

            var player = new Player(new Ship(), null, "");

            Assert.IsNotNull(player.Ship);
            Assert.AreEqual(expectedLength, player.Ship.Length);
        }

        [TestMethod]
        public void PlayerBoardShouldNotBeNull()
        {
            var player = new Player(null, new Board(), "");

            Assert.IsNotNull(player.Board);
        }

        [TestMethod]
        public void PlayerShipPlacementWithInGridBoundsShouldPass()
        {
            var player = new Player(new Ship(), new Board(), "");
            var locations = new List<string> { "A1" };

            player.PlaceShipOnBoard(locations);

            Assert.AreEqual(MarkerType.Ship, player.Board.Grid["A1"]);
        }

        [TestMethod]
        [ExpectedException(typeof(KeyNotFoundException))]
        public void PlayerShipPlacementOutsideGridBoundsShouldFail()
        {
            var player = new Player(new Ship(), new Board(), "");
            var locations = new List<string> { "Z1" };

            player.PlaceShipOnBoard(locations);
        }

        [TestMethod]
        public void CalculateVerticalShipCoordinatesShouldPass()
        {
            var player = new Player(new Ship(), new Board(), "");
            var expectedResult = new List<string>();
            for (int i = 1; i <= 20; i++)
                expectedResult.Add($"A{i}");

            var result = player.PopulateShipBoardCoordinates("A1", "A20");

            CollectionAssert.AreEqual(expectedResult, result);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void CalculateVerticalShipCoordinatesWhereStartingPointIsGreaterThanEndPointShouldFail()
        {
            var player = new Player(new Ship(), new Board(), "");

            var result = player.PopulateShipBoardCoordinates("A20", "A1");
        }

        [TestMethod]
        public void CalculateHorizontalShipCoordinatesShouldPass()
        {
            var player = new Player(new Ship(), new Board(), "");
            var expectedResult = new List<string>();
            for (char i = 'A'; i <= 'Z'; i++)
                expectedResult.Add($"{i}1");

            var result = player.PopulateShipBoardCoordinates("A1", "Z1");

            CollectionAssert.AreEqual(expectedResult, result);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void CalculateHorizontalShipCoordinatesWhereStartingPointIsGreaterThanEndPointShouldFail()
        {
            var player = new Player(new Ship(), new Board(), "");

            var result = player.PopulateShipBoardCoordinates("Z1", "A1");
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void CalculateDiagonalShipCoordinatesWhereStartingPointIsGreaterThanEndPointShouldFail()
        {
            var player = new Player(new Ship(), new Board(), "");

            var result = player.PopulateShipBoardCoordinates("A1", "H8");
        }

        [TestMethod]
        public void HandleNoShipAtCoordinateAttackShouldPass()
        {
            var player = new Player(new Ship(), new Board(), "");
            var coordinate = "A1";

            player.HandleAttack(coordinate);

            Assert.AreEqual(MarkerType.Hit, player.Board.Grid[coordinate]);
        }

        [TestMethod]
        public void HandleShipAtCoordinateAttackShouldPass()
        {
            var player = new Player(new Ship(), new Board(), "");
            var firstCoordinate = "A8";
            var secondCoordinate = "C8";
            player.ValidateTargetShipLocation(firstCoordinate + " " + secondCoordinate, out var validCoordinates);
            player.PlaceShipOnBoard(validCoordinates);

            player.HandleAttack(firstCoordinate);

            Assert.AreEqual(MarkerType.Hit, player.Board.Grid[firstCoordinate]);
            Assert.AreEqual(1, player.Ship.Hits);
        }

        [TestMethod]
        [ExpectedException(typeof(KeyNotFoundException))]
        public void HandleAttackValidCoordinateShouldFail()
        {
            var player = new Player(new Ship(), new Board(), "");
            var coordinate = "Z1";

            player.HandleAttack(coordinate);
        }
    }
}