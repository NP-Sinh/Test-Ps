namespace Watermark.Utilities
{
    public static class BitManipulation
    {
        public static byte SetBit(byte value, int position, byte bitValue)
        {
            if (bitValue == 1)
                return (byte)(value | (1 << position));
            else
                return (byte)(value & ~(1 << position));
        }

        public static byte GetBit(byte value, int position)
        {
            return (byte)((value >> position) & 1);
        }

        public static byte[] ConvertImageToBits(byte[] imageData)
        {
            var bits = new byte[imageData.Length * 8];

            for (int i = 0; i < imageData.Length; i++)
            {
                for (int j = 0; j < 8; j++)
                {
                    bits[i * 8 + j] = GetBit(imageData[i], j);
                }
            }

            return bits;
        }

        public static byte[] ConvertBitsToImage(byte[] bits)
        {
            var bytes = new byte[bits.Length / 8];

            for (int i = 0; i < bytes.Length; i++)
            {
                byte value = 0;
                for (int j = 0; j < 8; j++)
                {
                    if (bits[i * 8 + j] == 1)
                    {
                        value = SetBit(value, j, 1);
                    }
                }
                bytes[i] = value;
            }

            return bytes;
        }
    }
}
