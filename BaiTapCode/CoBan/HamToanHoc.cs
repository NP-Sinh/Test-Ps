using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class HamToanHoc
    {
        public static void Dang1()
        {
            Console.Write("Nhập a: ");
            double a = double.Parse(Console.ReadLine());
            Console.Write("Nhập b: ");
            double b = double.Parse(Console.ReadLine());

            Console.WriteLine($"{a} + {b} = {a+b}");
            Console.WriteLine($"{a} - {b} = {a-b}");
            Console.WriteLine($"{a} / {b} = {(a/b).ToString("0.00")}");
            Console.WriteLine($"{a} % {b} = {a%b}");
        }
    }
}
