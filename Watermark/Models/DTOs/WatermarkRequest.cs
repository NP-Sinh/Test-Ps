using Microsoft.AspNetCore.Mvc;
using Watermark.Models.Enums;

namespace Watermark.Models.DTOs
{
    public class WatermarkRequest
    {
        [FromForm]
        public IFormFile HostImage { get; set; }

        [FromForm]
        public IFormFile WatermarkImage { get; set; }

        [FromForm]
        public AlgorithmType Algorithm { get; set; }

        [FromForm]
        public int? BitPlane { get; set; } = 1; // For LSB

        [FromForm]
        public double? Alpha { get; set; } = 0.1; // For DCT/DWT

        [FromForm]
        public string? Key { get; set; } // For encryption
    }
}
