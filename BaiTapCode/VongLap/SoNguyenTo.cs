using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.VongLap
{
    internal class SoNguyenTo
    {
        public static void Dang1()
        {
            Console.Write("Nhập n: ");
            int n = int.Parse(Console.ReadLine());

            if (n < 2)
            {
                Console.WriteLine($"{n} Không là số nguyên tố");
                return;
            }

            for(int i = 2; i * i <= n; i++)
            {
                if (n % i == 0)
                {
                    Console.WriteLine($"{n} Không là số nguyên tố");
                    return;
                }
            }    
            Console.WriteLine($"{n} Là số nguyên tố");
        }

    }
}
