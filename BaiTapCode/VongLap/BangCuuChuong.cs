using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.VongLap
{
    internal class BangCuuChuong
    {
        public static void Dang1()
        {
            Console.Write("Nhập n: ");
            int n = int.Parse(Console.ReadLine());

            for(int i = 1; i <= 10; i++)
            {
                Console.WriteLine($"{i} x {n} = {n*i}");
            }    
        }
        public static void DayDu()
        {
            for(int i = 2; i <= 10; i++)
            {
                for (int j = 1; j <= 10; j++)
                {
                    Console.WriteLine($"{i} x {j} = {i*j}");
                }
                Console.WriteLine("");
            }    
        }
        public static void DangRutGon()
        {
            for (int i = 2; i <= 9; i++)
            {
                for (int j = 1; j <= 10; j++)
                {
                    Console.Write($" {i * j} ");
                }
                Console.WriteLine("");
            }
        }
    }
}
