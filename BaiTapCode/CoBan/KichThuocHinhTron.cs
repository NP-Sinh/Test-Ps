using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class KichThuocHinhTron
    {
        public static void chay()
        {
            // Tính chu vi và diện tích hình tròn

            Console.Write("Nhập radius: ");
            int r = int.Parse(Console.ReadLine());

            double pi = Math.PI;

            double chuVi = 2 * pi * r;
            double DienTich = pi * (r * r);

            Console.WriteLine("Chu vi: " + chuVi.ToString("0.00"));
            Console.WriteLine("Diện tích: " + DienTich.ToString("0.00"));
        }
    }
}
