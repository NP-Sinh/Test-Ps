using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class ChuyenDoiThoiGian
    {
        public static void Dang1()
        {
            Console.Write("Nhập n: ");
            int n = int.Parse(Console.ReadLine());

            int gio = n/3600;
            int phut = (n%3600)/60;
            int giay = n % 60;

            Console.WriteLine($"{gio}:{phut}:{giay}");
        }
    }
}
