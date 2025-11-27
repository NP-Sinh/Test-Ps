using Test.API.Services.AuthServices;

namespace Test.API.Services
{
    public class TokenCleanupBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<TokenCleanupBackgroundService> _logger;

        public TokenCleanupBackgroundService(IServiceProvider serviceProvider, ILogger<TokenCleanupBackgroundService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var tokenCleanupService = scope.ServiceProvider.GetRequiredService<ITokenCleanupService>();
                        await tokenCleanupService.CleanupExpiredTokensAsync();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Lỗi khi dọn dẹp token tự động");
                }

                // Chạy mỗi 24 giờ
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }
        }
    }
}