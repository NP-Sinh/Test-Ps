using SixLabors.ImageSharp;

namespace Watermark.Services.Interfaces
{
    public interface ISpatialWatermark
    {
        Image Embed(Image hostImage, Image watermarkImage, Dictionary<string, object> parameters);
        Image Extract(Image watermarkedImage, Dictionary<string, object> parameters);
    }
}
