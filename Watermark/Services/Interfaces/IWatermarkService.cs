using Watermark.Models.DTOs;
using Watermark.Models.Enums;

namespace Watermark.Services.Interfaces
{
    public interface IWatermarkService
    {
        Task<byte[]> EmbedWatermarkAsync(WatermarkRequest request);
        Task<byte[]> ExtractWatermarkAsync(WatermarkRequest request);
        List<AlgorithmType> GetSupportedAlgorithms();
    }
}
