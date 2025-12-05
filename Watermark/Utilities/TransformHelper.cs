namespace Watermark.Utilities
{
    public static class TransformHelper
    {
        // Discrete Cosine Transform (DCT)
        public static double[,] DCT2D(double[,] input)
        {
            int N = input.GetLength(0);
            int M = input.GetLength(1);
            double[,] output = new double[N, M];

            double alphaN = Math.Sqrt(2.0 / N);
            double alphaM = Math.Sqrt(2.0 / M);

            for (int u = 0; u < N; u++)
            {
                for (int v = 0; v < M; v++)
                {
                    double sum = 0.0;

                    for (int x = 0; x < N; x++)
                    {
                        for (int y = 0; y < M; y++)
                        {
                            double cu = (u == 0) ? 1 / Math.Sqrt(2) : 1;
                            double cv = (v == 0) ? 1 / Math.Sqrt(2) : 1;

                            sum += input[x, y] *
                                   Math.Cos((2 * x + 1) * u * Math.PI / (2 * N)) *
                                   Math.Cos((2 * y + 1) * v * Math.PI / (2 * M)) *
                                   cu * cv;
                        }
                    }

                    output[u, v] = alphaN * alphaM * sum;
                }
            }

            return output;
        }
    }
}
