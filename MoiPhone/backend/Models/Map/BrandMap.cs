namespace backend.Models.Map
{
    public class BrandMap
    {
        public int BrandId { get; set; }

        public string Name { get; set; } = null!;

        public string? LogoUrl { get; set; }

        public string? Country { get; set; }

        public int? FoundedYear { get; set; }

        public string? Description { get; set; }
    }
}
