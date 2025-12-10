using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class SoLonNhatTrong4So
    {
        public static int Dang1()
        {
            Console.Write("Nhập a: ");
            int a = int.Parse(Console.ReadLine());
            Console.Write("Nhập b: ");
            int b = int.Parse(Console.ReadLine());
            Console.Write("Nhập c: ");
            int c = int.Parse(Console.ReadLine());
            Console.Write("Nhập d: ");
            int d = int.Parse(Console.ReadLine());

            int max = a;

            if (max < b) max = b;
            if (max < c) max = c;
            if (max < d) max = d;

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
            Console.Write("Nhập d: ");
            int d = int.Parse(Console.ReadLine());

            int max = Math.Max(Math.Max(a, d), Math.Max(c, b));

            return max;
        }
        public static void TimMaxN()
        {
            Console.Write("Nhập số lượng phần tử n: ");
            int n = int.Parse(Console.ReadLine()!);

            Console.WriteLine("Nhập các số:");

            double max = double.MinValue;

            for (int i = 1; i <= n; i++)
            {
                Console.Write($"Số thứ {i}: ");
                double x = double.Parse(Console.ReadLine()!);

                if (x > max)
                    max = x;
            }

            Console.WriteLine("Số lớn nhất là: " + max);
        }

    }
}
