using System;
using EnumsNET;
using System.Collections.Generic;

namespace SimplifiedBattleshipGame
{
    public class Board
    {
        private const int DefaultSize = 8;

        public Dictionary<string, MarkerType> Grid { get; }

        public int Dimension => Grid.Keys.Count;

        public Board()
        {
            Grid = new Dictionary<string, MarkerType>();
            for (int index = 1; index <= DefaultSize; index++)
            {
                for (var ch = 'A'; ch < DefaultSize + 'A'; ch++)
                    Grid.Add($"{ch.ToString()}{index}", MarkerType.Empty);
            }
        }

        public void Print()
        {
            Console.Write("  ");
            for (var ch = 'A'; ch < DefaultSize + 'A'; ch++)
                Console.Write($"{ch} ");

            Console.WriteLine();
            for (int index = 1; index < DefaultSize; index++)
            {
                Console.Write($"{index} ");
                for (var ch = 'A'; ch < DefaultSize + 'A'; ch++)
                    Console.Write($"{Grid[ch.ToString() + index].AsString<MarkerType>(EnumFormat.Description)} ");
                Console.WriteLine();
            }
        }
    }
}
