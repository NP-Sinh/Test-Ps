using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.VongLap
{
    internal class DaySoChiaHet13
    {
        public static void Dang1()
        {
            /*
                Cho trước 2 số nguyên start và end lần lượt là giá trị bắt đầu và giá trị kết thúc của một dãy số chia hết cho 13. 
                Bạn hãy viết chương trình để in ra các số chia hết cho 13 nằm trong khoảng từ start đến end cho trước (không bao gồm start và end).
             */
            Console.Write("Nhập s: ");
            int s = int.Parse(Console.ReadLine());
            Console.Write("Nhập e: ");
            int e = int.Parse(Console.ReadLine());

            for (int i = s + 1; i < e; i++)
            {
                if (i % 13 == 0)
                {
                    Console.Write($"{i} ");
                }
            }
        }
    }
}
