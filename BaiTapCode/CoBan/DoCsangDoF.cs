using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class DoCsangDoF
    {
        public static double chay()
        {
            Console.Write("Nhập celsius: ");
            double c = double.Parse(Console.ReadLine());

            double result = (c * 1.8) + 32;
            return result;
        }
    }
}
