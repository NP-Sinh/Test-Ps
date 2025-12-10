using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class _2Dau2Cuoi
    {
        // Cho trước một số nguyên có 3 chữ số là number. Bạn hãy viết chương trình để in ra 2 chữ số cuối và 2 chữ số đầu của number.	\
        // number = 673
        // 2 số đầu: 67
        // 2 số cuối: 73
        public static void Dang1()
        {
            Console.Write("Nhập n: ");
            int n = int.Parse(Console.ReadLine());

            Console.WriteLine($"2 số đầu: {(n/10).ToString("00")} \n2 số cuối: {(n % 100).ToString("00")}");
        }
    }
}
