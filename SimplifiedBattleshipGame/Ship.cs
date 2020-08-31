using System;

namespace SimplifiedBattleshipGame
{
    public class Ship
    {
		private const int DefaultLength = 3;

        public int Length => DefaultLength;

        public int Hits { get; set; }

        public bool IsSunk => Hits.Equals(Length);
    }
}
