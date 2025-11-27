using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Test.API.Models.Entities;
using Test.API.Models.Map;

namespace Test.API.Services.AuthServices
{
    public interface IAuthServices
    {
        Task<dynamic> SignUp(UserMap userMap);
        Task<dynamic> SignIn(string userName, string password);
        Task<dynamic> RefreshToken(string refreshToken);
        Task<dynamic> RevokeToken(string refreshToken);
        Task<dynamic> Logout(int userId);
    }

    public class AuthServices : IAuthServices
    {
        private readonly JwtTestDBContext _context;
        private readonly IMapper _mapper;
        private readonly IJwtServices _jwtServices;
        private readonly IConfiguration _configuration;

        public AuthServices(JwtTestDBContext context, IMapper mapper, IJwtServices jwtServices, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _jwtServices = jwtServices;
            _configuration = configuration;
        }

        public async Task<dynamic> SignUp(UserMap userMap)
        {
            try
            {
                // Check user 
                if (await _context.Users.AnyAsync(u => u.Username == userMap.Username))
                    return new { statuscodes = 409, message = "Tài khoản đã tồn tại" };

                // Hash password
                userMap.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userMap.PasswordHash);

                var user = _mapper.Map<User>(userMap);
                user.IsActive = true;
                user.Role = "User";
                user.CreatedAt = DateTime.Now;

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return new { statuscodes = 200, message = "Đăng ký thành công" };
            }
            catch (Exception ex)
            {
                return new { statuscodes = 500, message = $"Lỗi: {ex.Message}" };
            }
        }
        public async Task<dynamic> SignIn(string userName, string password)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == userName);

                if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                    return new { statuscodes = 401, message = "Tài khoản hoặc mật khẩu không đúng" };

                if (!user.IsActive)
                    return new { statuscodes = 403, message = "Tài khoản đã bị khóa" };

                // XÓA tất cả token của user
                var oldTokens = await _context.RefreshTokens
                    .Where(rt => rt.UserId == user.Id)
                    .ToListAsync();

                if (oldTokens.Any())
                {
                    _context.RefreshTokens.RemoveRange(oldTokens);
                }

                // Tạo tokens mới
                var jwtToken = _jwtServices.GenerateJwtToken(user);
                var refreshToken = _jwtServices.GenerateRefreshToken();

                // Lưu refresh token vào database
                var refreshTokenEntity = new RefreshToken
                {
                    UserId = user.Id,
                    Token = refreshToken,
                    Expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["Jwt:RefreshTokenDuration"])),
                    CreatedAt = DateTime.Now,
                    IsRevoked = false
                };

                _context.RefreshTokens.Add(refreshTokenEntity);
                await _context.SaveChangesAsync();

                return new
                {
                    statuscodes = 200,
                    message = "Đăng nhập thành công",
                    data = new
                    {
                        user.Id,
                        user.Username,
                        user.Email,
                        user.FullName,
                        user.Role,
                        AccessToken = jwtToken,
                        RefreshToken = refreshToken,
                        ExpiresIn = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:AccessTokenDuration"]))
                    }
                };
            }
            catch (Exception ex)
            {
                return new { statuscodes = 500, message = $"Lỗi: {ex.Message}" };
            }
        }
        public async Task<dynamic> RefreshToken(string refreshToken)
        {
            try
            {
                var tokenEntity = await _context.RefreshTokens
                    .Include(rt => rt.User)
                    .FirstOrDefaultAsync(rt => rt.Token == refreshToken && !rt.IsRevoked);

                if (tokenEntity == null || tokenEntity.Expires < DateTime.UtcNow)
                    return new { statuscodes = 401, message = "Refresh token không hợp lệ hoặc đã hết hạn" };

                if (!tokenEntity.User.IsActive)
                    return new { statuscodes = 403, message = "Tài khoản đã bị khóa" };

                // Tạo tokens mới
                var newJwtToken = _jwtServices.GenerateJwtToken(tokenEntity.User);
                var newRefreshToken = _jwtServices.GenerateRefreshToken();

                // XÓA token cũ 
                _context.RefreshTokens.Remove(tokenEntity);

                // Lưu refresh token mới
                var newRefreshTokenEntity = new RefreshToken
                {
                    UserId = tokenEntity.UserId,
                    Token = newRefreshToken,
                    Expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["Jwt:RefreshTokenDuration"])),
                    CreatedAt = DateTime.Now,
                    IsRevoked = false
                };

                _context.RefreshTokens.Add(newRefreshTokenEntity);
                await _context.SaveChangesAsync();

                return new
                {
                    statuscodes = 200,
                    message = "Làm mới token thành công",
                    data = new
                    {
                        AccessToken = newJwtToken,
                        RefreshToken = newRefreshToken,
                        ExpiresIn = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:AccessTokenDuration"]))
                    }
                };
            }
            catch (Exception ex)
            {
                return new { statuscodes = 500, message = $"Lỗi: {ex.Message}" };
            }
        }

        public async Task<dynamic> RevokeToken(string refreshToken)
        {
            try
            {
                var tokenEntity = await _context.RefreshTokens
                    .FirstOrDefaultAsync(rt => rt.Token == refreshToken && !rt.IsRevoked);

                if (tokenEntity == null)
                    return new { statuscodes = 404, message = "Token không tồn tại" };

                // XÓA token
                _context.RefreshTokens.Remove(tokenEntity);
                await _context.SaveChangesAsync();

                return new { statuscodes = 200, message = "Thu hồi token thành công" };
            }
            catch (Exception ex)
            {
                return new { statuscodes = 500, message = $"Lỗi: {ex.Message}" };
            }
        }

        public async Task<dynamic> Logout(int userId)
        {
            try
            {
                // XÓA tất cả refresh tokens của user
                var userTokens = await _context.RefreshTokens
                    .Where(rt => rt.UserId == userId)
                    .ToListAsync();

                _context.RefreshTokens.RemoveRange(userTokens);
                await _context.SaveChangesAsync();

                return new { statuscodes = 200, message = "Đăng xuất thành công" };
            }
            catch (Exception ex)
            {
                return new { statuscodes = 500, message = $"Lỗi: {ex.Message}" };
            }
        }
    }
}