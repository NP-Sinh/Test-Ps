using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class KichThuocHinhVuong
    {
        public static void chay()
        {
            Console.Write("Nhập squareLength:");
            int canh = int.Parse(Console.ReadLine());

            int chuVi = canh * 4;
            int DienTich = canh * canh;

            Console.WriteLine($"Chu vi: {chuVi}");
            Console.WriteLine($"Diện tích: {DienTich}");
        }
    }
}
// Tính diện tích và chu vi hình vuông, với squareLength (độ dài cạnh)