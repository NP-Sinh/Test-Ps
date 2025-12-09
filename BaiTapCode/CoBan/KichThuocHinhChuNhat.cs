using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class KichThuocHinhChuNhat
    {
        public static void chay()
        {
            Console.Write("Nhap width: ");
            int width = int.Parse(Console.ReadLine());
            Console.Write("Nhap length: ");
            int length = int.Parse(Console.ReadLine());


            int ChuVi = 2 * (width + length);
            int DienTich = width * length;

            Console.WriteLine("Chu vi = " + ChuVi);
            Console.WriteLine("Dien tich = " + DienTich);
        }
    }
}

// Tinh chu vi va dien tich hinh chu nhat