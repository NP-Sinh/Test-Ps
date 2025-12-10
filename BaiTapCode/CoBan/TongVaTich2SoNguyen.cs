using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class TongVaTich2SoNguyen
    {
        public static void Dang1()
        {
            Console.Write("Nhập a: ");
            int a = int.Parse(Console.ReadLine());
            Console.Write("Nhập b: ");
            int b = int.Parse(Console.ReadLine());

            int tong = a + b;
            int tich = a * b;
            Console.WriteLine($"Tổng: {tong}, Tích: {tich}");
        }
    }
}
