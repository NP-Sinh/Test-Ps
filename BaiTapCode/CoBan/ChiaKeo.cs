using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class ChiaKeo
    {
        public static void Dang1()
        {
            Console.Write("Nhập student: ");
            int s = int.Parse(Console.ReadLine());
            Console.Write("Nhập fruit: ");
            int f = int.Parse(Console.ReadLine());

            Console.WriteLine($"Mỗi bạn nhận được {f / s} quả và dư {f % s} quả.");
        }
    }
}
