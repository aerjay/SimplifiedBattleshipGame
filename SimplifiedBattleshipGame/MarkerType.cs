using System.ComponentModel;

namespace SimplifiedBattleshipGame
{
    public enum MarkerType
    {
        [Description("—")]
        Empty,

        [Description("S")]
        Ship,

        [Description("X")]
        Hit
    }
}
