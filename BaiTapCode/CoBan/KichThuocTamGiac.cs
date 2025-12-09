using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class KichThuocTamGiac
    {
        public static double D1()
        {
            Console.Write("Nhập a:");
            double a = double.Parse(Console.ReadLine());

            Console.Write("Nhập h:");
            double h = double.Parse(Console.ReadLine());

            double DienTich = a * h / 2;

            return DienTich;
        }
        public static void D2()
        {

            /*
            Cho trước các số nguyên a, b, c là 3 cạnh của 1 tam giác. Bạn hãy viết chương trình tính chu vi và diện tích một tam giác.

                    Lưu ý: Làm tròn đến chữ số thập phân thứ 2
                    Công thức tính chu vi (C) là C = a+b+c
                    Công thức tính diện tích (S) là S = sqrt(p*(p-a)*(p-b)*(p-c)) với p = C/2
             */

            Console.Write("Nhập a:");
            double a = double.Parse(Console.ReadLine());

            Console.Write("Nhập b:");
            double b = double.Parse(Console.ReadLine());

            Console.Write("Nhập c:");
            double c = double.Parse(Console.ReadLine());


            double ChuVi = a + b + c;
            double p = ChuVi / 2;
            double DienTich = Math.Sqrt(p* (p - a) * (p - b) * (p - c));

            Console.WriteLine("Chu vi = " + ChuVi.ToString("0.00"));
            Console.WriteLine("Dien tich = " + DienTich.ToString("0.00"));
        }
    }
}
