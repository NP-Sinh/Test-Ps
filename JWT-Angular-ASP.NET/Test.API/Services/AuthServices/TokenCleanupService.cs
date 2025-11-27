using Microsoft.EntityFrameworkCore;
using Test.API.Models.Entities;

namespace Test.API.Services.AuthServices
{
    public interface ITokenCleanupService
    {
        Task CleanupExpiredTokensAsync();
    }

    public class TokenCleanupService : ITokenCleanupService
    {
        private readonly JwtTestDBContext _context;

        public TokenCleanupService(JwtTestDBContext context)
        {
            _context = context;
        }

        public async Task CleanupExpiredTokensAsync()
        {
            try
            {
                // XÓA tất cả token đã hết hạn hoặc bị thu hồi
                var expiredTokens = await _context.RefreshTokens
                    .Where(rt => rt.Expires < DateTime.Now || rt.IsRevoked)
                    .ToListAsync();

                if (expiredTokens.Any())
                {
                    _context.RefreshTokens.RemoveRange(expiredTokens);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi dọn dẹp token: {ex.Message}");
            }
        }
    }
}