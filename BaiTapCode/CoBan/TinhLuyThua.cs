using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class TinhLuyThua
    {
        public static int Dang1()
        {
            Console.Write("Nhập base: ");
            int b = int.Parse(Console.ReadLine());

            Console.Write("Nhập exponent: ");
            int e = int.Parse(Console.ReadLine());

            double result = Math.Pow(b, e);
            return (int)result;
        }
        public static int Dang2()
        {
            // base^exponent
            Console.Write("Nhập base: ");
            int b = int.Parse(Console.ReadLine());

            Console.Write("Nhập exponent: ");
            int e = int.Parse(Console.ReadLine());

            int result = 1;
            for (int i = 0; i < e; i ++)
            {
                result = result * b;
            }
            return result;
        }
    }
}
