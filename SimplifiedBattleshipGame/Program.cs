using System;

namespace SimplifiedBattleshipGame
{
    public class Program
    {
        private static void Main(string[] args)
        {
            var player1 = new Player(new Ship(), new Board(), "Player 1");
            var player2 = new Player(new Ship(), new Board(), "Player 2");

            Console.WriteLine("Welcome to Battleship!");
            player1.AskUserWhereToPlaceShip();
            player2.AskUserWhereToPlaceShip();

            while (!player2.HasLost && !player1.HasLost)
            {
                var coordinate = player1.AskUserWhereToAttack();
                player2.HandleAttack(coordinate);

                if (player2.HasLost)
                  break;

                coordinate = player2.AskUserWhereToAttack();
                player1.HandleAttack(coordinate);
            }

            player1.PrintBoard();
            player2.PrintBoard();

            if (player1.HasLost)
                Console.WriteLine($"\nCongratulations {player2.Name}! You won!");
            else if (player2.HasLost)
                Console.WriteLine($"\nCongratulations {player1.Name}! You won!");

            Console.WriteLine("\nPress any key to exit...");
            Console.ReadLine();
        }
    }
}
