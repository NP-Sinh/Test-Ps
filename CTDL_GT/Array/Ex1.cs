using System;
using System.Collections.Generic;
using System.Text;

namespace CTDL_GT.Array
{
    internal class Ex1
    {
        public static void TimMaxArray()
        {
            int[] array = { 4, 90, 32, 432, 636, 6346, -1235, 875 };
            int max = array[0];
            for (int i = 1; i < array.Length; i++)
            {
                if (array[i] > max)
                {
                    max = array[i];
                }
            }
            Console.WriteLine("Phần tử lớn nhất trong mảng là: " + max);
        }
    }
}
