using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class DoFsangDoC
    {
        public static double chay()
        {
            /*
                chuyển đổi nhiệt độ từ độ F (°F)  sang độ C (°C), 
                Làm tròn 1 chữ số thập phân
                Công thức:  (°F - 32) × 5 / 9

                Nhập fahrenheit (fahrenheit là nhiệt độ theo độ F (°F))
            */
            Console.Write("Nhập fahrenheit: ");
            double f = double.Parse(Console.ReadLine());

            double result = (f - 32) * 5 / 9;
            return result;
        }
    }
}
