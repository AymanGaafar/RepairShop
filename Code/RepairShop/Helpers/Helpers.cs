namespace RepairShop.Helpers
{
    using System;
    using System.Linq;

    public static class Helpers
    {
        public static string GetUniqueKey(ushort KeyLength = 8)
        {
            return new String(Guid.NewGuid().ToString().Take(KeyLength).ToArray());
        }
    }
}