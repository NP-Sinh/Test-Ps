namespace backend.Services.AuthServices
{
    public class TokenCleanupBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<TokenCleanupBackgroundService> _logger;

        public TokenCleanupBackgroundService(
            IServiceProvider serviceProvider,
            ILogger<TokenCleanupBackgroundService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Token Cleanup Background Service started");

            // Đợi 1 phút để app khởi động xong
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var tokenCleanupService = scope.ServiceProvider
                            .GetRequiredService<ITokenCleanupService>();

                        var deletedCount = await tokenCleanupService.CleanupExpiredTokensAsync();

                        if (deletedCount > 0)
                        {
                            _logger.LogInformation($"Token cleanup completed. Deleted {deletedCount} tokens");
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in token cleanup background service");
                }

                // Chạy mỗi 24 giờ
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }

            _logger.LogInformation("Token Cleanup Background Service stopped");
        }
    }
}
