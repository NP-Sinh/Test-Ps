using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class SoLonNhatTrong3So
    {
        public static int Dang1()
        {
            Console.Write("Nhập a: ");
            int a = int.Parse(Console.ReadLine());
            Console.Write("Nhập b: ");
            int b = int.Parse(Console.ReadLine());
            Console.Write("Nhập c: ");
            int c = int.Parse(Console.ReadLine());

            int max = a;

            if (max < b) max = b;
            if (max < c) max = c;

            return max;
        }
        public static int Dang2()
        {
            Console.Write("Nhập a: ");
            int a = int.Parse(Console.ReadLine());
            Console.Write("Nhập b: ");
            int b = int.Parse(Console.ReadLine());
            Console.Write("Nhập c: ");
            int c = int.Parse(Console.ReadLine());

            int max = Math.Max(a, Math.Max(c, b));

            return max;
        }
    }
}
