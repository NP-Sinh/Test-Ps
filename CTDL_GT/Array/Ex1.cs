using System;
using System.Collections.Generic;
using System.Text;

namespace CTDL_GT.Array
{
    internal class Ex1
    {
        static int[] array = { 4, 90, 32, 432, 636, 6346, -1235, 90 };
        public static void TimMaxArray()
        { 
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
        public static void TimMinArray()
        {
            int min = array[0];
            for (int i = 1; i < array.Length; i++)
            {
                min = Math.Min(min, array[i]);
            }
            Console.WriteLine("Phần tử nhỏ nhất trong mảng là: " + min);
        }
        public static void XoaPhanTu()
        {
            int n = 3;
            int al = array.Length;
            for (int i = n; i < al -1; i++)
            {
                array[i] = array[i + 1];
            }
            --al;
            for (int i = 0; i < al; i++)
            {
                Console.Write(array[i] + " ");
            }
        }
        public static void TimPhanTuTrungLap()
        {
            for(int i = 0; i < array.Length; i++)
            {
                for (int j = i + 1; j < array.Length; j++)
                {
                    if (array[i] == array[j])
                    {
                        Console.WriteLine("Phần tử trùng lặp là: " + array[i]);
                    }
                }
            }
        }
    }
}
