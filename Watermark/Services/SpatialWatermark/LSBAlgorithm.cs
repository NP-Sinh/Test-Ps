using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using Watermark.Services.Interfaces;
using Watermark.Utilities;

namespace Watermark.Services.SpatialWatermark
{
    public class LSBAlgorithm : ISpatialWatermark
    {
        public Image Embed(Image hostImage, Image watermarkImage, Dictionary<string, object> parameters)
        {
            // Thay đổi kích thước hình mờ để phù hợp với kích thước hình ảnh lưu trữ
            watermarkImage.Mutate(x => x.Resize(hostImage.Width, hostImage.Height));

            var bitPlane = parameters.ContainsKey("BitPlane") ? (int)parameters["BitPlane"] : 1;

            using (var host = hostImage.CloneAs<Rgba32>())
            using (var watermark = watermarkImage.CloneAs<Rgba32>())
            {
                for (int y = 0; y < host.Height; y++)
                {
                    for (int x = 0; x < host.Width; x++)
                    {
                        var hostPixel = host[x, y];
                        var watermarkPixel = watermark[x, y];

                        // Get grayscale value from watermark
                        byte watermarkValue = (byte)((watermarkPixel.R * 0.3 +
                                                     watermarkPixel.G * 0.59 +
                                                     watermarkPixel.B * 0.11) > 128 ? 1 : 0);

                        // Embed in LSB
                        host[x, y] = new Rgba32(
                            BitManipulation.SetBit(hostPixel.R, bitPlane - 1, watermarkValue),
                            BitManipulation.SetBit(hostPixel.G, bitPlane - 1, watermarkValue),
                            BitManipulation.SetBit(hostPixel.B, bitPlane - 1, watermarkValue),
                            hostPixel.A
                        );
                    }
                }

                return hostImage;
            }
        }

        public Image Extract(Image watermarkedImage, Dictionary<string, object> parameters)
        {
            var bitPlane = parameters.ContainsKey("BitPlane") ? (int)parameters["BitPlane"] : 1;

            using (var image = watermarkedImage.CloneAs<Rgba32>())
            {
                var extracted = new Image<Rgba32>(image.Width, image.Height);

                for (int y = 0; y < image.Height; y++)
                {
                    for (int x = 0; x < image.Width; x++)
                    {
                        var pixel = image[x, y];

                        // Extract from LSB
                        byte bit = BitManipulation.GetBit(pixel.R, bitPlane - 1);
                        byte value = (byte)(bit * 255);

                        extracted[x, y] = new Rgba32(value, value, value, 255);
                    }
                }

                return extracted;
            }
        }
    }
}
