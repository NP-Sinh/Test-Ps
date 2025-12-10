using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class ChuSoHangTram
    {
        public static int Dang1()
        {
            Console.Write("Nhập n: ");
            int n = int.Parse(Console.ReadLine());

            int a = (n / 100)%10;

            return a;
        }
    }
}
