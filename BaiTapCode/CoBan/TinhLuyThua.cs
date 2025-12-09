using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class TinhLuyThua
    {
        public static int chay()
        {
            Console.Write("Nhập base: ");
            int b = int.Parse(Console.ReadLine());

            Console.Write("Nhập exponent: ");
            int e = int.Parse(Console.ReadLine());

            double result = Math.Pow(b, e);
            return (int)result;
        }
    }
}
