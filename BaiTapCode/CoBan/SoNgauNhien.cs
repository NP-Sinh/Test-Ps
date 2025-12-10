using System;
using System.Collections.Generic;
using System.Text;

namespace BaiTapCode.CoBan
{
    internal class SoNgauNhien
    {
        public static int Dang1()
        {
            Console.Write("Nhập start: ");
            int s = int.Parse(Console.ReadLine());
            Console.Write("Nhập end: ");
            int e = int.Parse(Console.ReadLine());
            
            Random rd = new Random();
            int soNgauNhien = rd.Next(s, e + 1);
            return soNgauNhien;
        }
    }
}
