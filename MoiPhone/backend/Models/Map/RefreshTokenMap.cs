namespace backend.Models.Map
{
    public partial class RefreshTokenMap
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Token { get; set; } = null!;

        public DateTime Expires { get; set; }

        public DateTime CreatedAt { get; set; }

        public bool IsRevoked { get; set; }
    }
}