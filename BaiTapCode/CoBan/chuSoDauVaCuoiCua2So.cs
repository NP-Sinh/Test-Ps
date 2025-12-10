using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class chuSoDauVaCuoiCua2So
    {
        public static void Dang1()
        {
            Console.Write("Nhập n: ");
            int n = int.Parse(Console.ReadLine());

            int first = n / 10;
            int last = n % 10;

            Console.WriteLine($"First: {first}, Last: {last}");
        }
    }
}
