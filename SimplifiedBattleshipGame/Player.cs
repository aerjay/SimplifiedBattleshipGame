using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace SimplifiedBattleshipGame
{
    public class Player
    {
        public string Name { get; }

        public Ship Ship { get; }

        public Board Board { get; }

        public bool HasLost => Ship.IsSunk;

        public Player(Ship ship, Board board, string name)
        {
            Ship = ship;
            Board = board;
            Name = name;
        }

        public void AskUserWhereToPlaceShip()
        {
            var validShipCoordinates = new List<string>();

            do
            {
                Console.WriteLine($"Enter ship location for {Name} (format: A5 A8).");
            }
            while (!ValidateShipLocation(Console.ReadLine(), out validShipCoordinates));
            
			PlaceShipOnBoard(validShipCoordinates);
        }

        public bool ValidateShipLocation(string location, out List<string> validShipCoordinates)
        {
            validShipCoordinates = new List<string>();

            try
            {
                ValidateTargetShipLocation(location, out validShipCoordinates);
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

            return true;
        }

        public void ValidateTargetShipLocation(string location, out List<string> validShipCoordinates)
        {
            validShipCoordinates = new List<string>();
            var parsedLocations = Regex.Split(location, "\\s+").Where(x => x != string.Empty);
            
			if (!parsedLocations.Any() || parsedLocations.Count() < 2)
                throw new ArgumentException("Not enough input. Input should follow this format: A5 A8.");
            
			if (!Board.Grid.ContainsKey(parsedLocations.First()))
                throw new ArgumentException($"The {parsedLocations.First()} is outside board's bounds.");
            
			if (!Board.Grid.ContainsKey(parsedLocations.Last()))
                throw new ArgumentException($"The {parsedLocations.Last()} is outside board's bounds.");
            
			validShipCoordinates = PopulateShipBoardCoordinates(parsedLocations.First(), parsedLocations.Last());
            
			if (Ship.Length > validShipCoordinates.Count())
                throw new ArgumentException($"Ship needs to be placed on at least {Ship.Length} grid units.");
            
			validShipCoordinates = validShipCoordinates.Take(Ship.Length).ToList();
        }

        public List<string> PopulateShipBoardCoordinates(string startLocation, string endLocation)
        {
            var validShipCoordinates = new List<string>();

            // Horizontal case.
            if (startLocation.ElementAt(0) == endLocation.ElementAt(0))
            {
				// The row values can be more than 1 digit.
                int startLocationRowValue = Convert.ToInt32(Regex.Replace(startLocation, "^[A-Z]", ""));
                int endLocationRowValue = Convert.ToInt32(Regex.Replace(endLocation, "^[A-Z]", ""));

                if (endLocationRowValue < startLocationRowValue)
                    throw new ArgumentException("Coordinates should be in accending order, e.g. A1 A3.");

                validShipCoordinates.Add(startLocation);
                for (int index = startLocationRowValue + 1; index < endLocationRowValue; index++)
                    validShipCoordinates.Add(startLocation.ElementAt(0).ToString() + index);
                validShipCoordinates.Add(endLocation);
            }
			// Vertical case.
            else if (startLocation.ElementAt(1) == endLocation.ElementAt(1))
            {
                if (endLocation.ElementAt(0) < startLocation.ElementAt(0))
                    throw new ArgumentException("Coordinates should be in accending order, e.g. 1B 3B.");

                validShipCoordinates.Add(startLocation);
                for (char ch = Convert.ToChar(startLocation.ElementAt(0) + 1); ch < endLocation.ElementAt(0); ch++)
                    validShipCoordinates.Add(ch.ToString() + startLocation.ElementAt(1));
                validShipCoordinates.Add(endLocation);
            }
			else{
				 throw new ArgumentException("Ship can only be place horizontally or vertically.");
			}

            return validShipCoordinates;
        }

        public void PlaceShipOnBoard(IList<string> coordinates)
        {
            foreach (string coordinate in coordinates)
            {
                if (Board.Grid[coordinate] == MarkerType.Empty)
                    Board.Grid[coordinate] = MarkerType.Ship;
            }
        }

        public string AskUserWhereToAttack()
        {
            var valid = false;
            var coordinate = "";

            do
            {
                Console.WriteLine($"{Name}: Enter a location to attack opponent's ship (format: A5).");
                coordinate = Console.ReadLine().Trim();
                valid = Board.Grid.ContainsKey(coordinate);
                if (!valid)
                    Console.WriteLine($"The {coordinate} is outside board's bounds. Enter a valid coordinate, e.g. H8.");
            }
            while (!valid);

            return coordinate;
        }

        public void HandleAttack(string coordinate)
        {
            switch (Board.Grid[coordinate])
            {
                case MarkerType.Empty:
                    Board.Grid[coordinate] = MarkerType.Hit;
                    break;
                case MarkerType.Ship:
                    Board.Grid[coordinate] = MarkerType.Hit;
                    Ship.Hits++;
                    break;
            }
        }

        public void PrintBoard()
        {
            Console.WriteLine($"\n{Name}'s board:");
            Board.Print();
        }
    }
}
