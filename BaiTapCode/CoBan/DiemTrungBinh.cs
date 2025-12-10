using System;
using System.Collections.Generic;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BaiTapCode.CoBan
{
    internal class DiemTrungBinh
    {
        public static void Dang1()
        {
            /*
                 Cho trước các số nguyên dương scoreOne, scoreTwo, scoreThree 
                 lần lượt là điểm số 3 môn thi của sinh viên.Bạn hãy viết chương trình để in ra điểm số cao nhất và điểm số trung bình của sinh viên.

                Điểm số trung bình có một số thập phân
            */

            Console.Write("Nhập a: ");
            double a = double.Parse(Console.ReadLine());
            Console.Write("Nhập b: ");
            double b = double.Parse(Console.ReadLine());
            Console.Write("Nhập c: ");
            double c = double.Parse(Console.ReadLine());

            double max = Math.Max(a, Math.Max(b,c));
            double DTB = (a+b+c)/3;
            Console.WriteLine($"Điểm số cao nhất: {max}\nĐiểm trung bình: {DTB.ToString("0.0")}");
        }
    }
}
