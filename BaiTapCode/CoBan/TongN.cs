using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class TongN
    {
        public static int Dang1()
        {
            Console.Write("Nhập n: ");
            int n = int.Parse(Console.ReadLine());

            int nn = n * 10 + n;
            int nnn = n * 100 + nn;

            int tong = n + nn + nnn;
            return tong;
        }
    }
}
