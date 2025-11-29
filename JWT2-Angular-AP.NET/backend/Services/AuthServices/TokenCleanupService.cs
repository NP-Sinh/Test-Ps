using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.AuthServices
{
    public interface ITokenCleanupService
    {
        Task<int> CleanupExpiredTokensAsync();
    }

    public class TokenCleanupService : ITokenCleanupService
    {
        private readonly JwtTestDBContext _context;
        private readonly ILogger<TokenCleanupService> _logger;

        public TokenCleanupService(JwtTestDBContext context, ILogger<TokenCleanupService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<int> CleanupExpiredTokensAsync()
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

                    _logger.LogInformation($"Cleaned up {expiredTokens.Count} expired/revoked tokens");
                    return expiredTokens.Count;
                }

                return 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during token cleanup");
                throw;
            }
        }
    }
}
