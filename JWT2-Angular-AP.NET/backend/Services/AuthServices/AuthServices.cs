using AutoMapper;
using backend.Models.Entities;
using backend.Models.Map;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace backend.Services.AuthServices
{
    public interface IAuthServices
    {
        Task<dynamic> SignUp(UserMap userMap);
        Task<dynamic> SignIn(string userName, string password, HttpContext httpContext);
        Task<dynamic> RefreshToken(HttpContext httpContext);
        Task<dynamic> RevokeToken(HttpContext httpContext);
        Task<dynamic> Logout(HttpContext httpContext);
    }

    public class AuthServices : IAuthServices
    {
        private readonly JwtTestDBContext _context;
        private readonly IMapper _mapper;
        private readonly IJwtServices _jwtServices;
        private readonly IConfiguration _configuration;

        public AuthServices(
            JwtTestDBContext context,
            IMapper mapper,
            IJwtServices jwtServices,
            IConfiguration configuration)
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
                // Validate input
                if (string.IsNullOrWhiteSpace(userMap.Username) ||
                    string.IsNullOrWhiteSpace(userMap.PasswordHash) ||
                    string.IsNullOrWhiteSpace(userMap.Email))
                {
                    return new { statuscodes = 400, message = "Thông tin không hợp lệ" };
                }

                // Check user exists
                if (await _context.Users.AnyAsync(u => u.Username == userMap.Username))
                {
                    return new { statuscodes = 409, message = "Tài khoản đã tồn tại" };
                }

                if (await _context.Users.AnyAsync(u => u.Email == userMap.Email))
                {
                    return new { statuscodes = 409, message = "Email đã được sử dụng" };
                }

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
                return new
                {
                    statuscodes = 500,
                    message = "Đã xảy ra lỗi, vui lòng thử lại sau"
                };
            }
        }

        public async Task<dynamic> SignIn(string userName, string password, HttpContext httpContext)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == userName);

                if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                {
                    return new { statuscodes = 401, message = "Tài khoản hoặc mật khẩu không đúng" };
                }

                if (!user.IsActive)
                {
                    return new { statuscodes = 403, message = "Tài khoản đã bị khóa" };
                }

                // Giới hạn số lượng active tokens (cho phép tối đa 5 thiết bị đồng thời)
                var activeTokens = await _context.RefreshTokens
                    .Where(rt => rt.UserId == user.Id && !rt.IsRevoked && rt.Expires > DateTime.Now)
                    .OrderByDescending(rt => rt.CreatedAt)
                    .ToListAsync();

                // Nếu có quá 4 tokens, xóa các token cũ nhất
                if (activeTokens.Count >= 5)
                {
                    var tokensToRemove = activeTokens.Skip(4).ToList();
                    _context.RefreshTokens.RemoveRange(tokensToRemove);
                }

                // Tạo tokens mới
                var jwtToken = _jwtServices.GenerateJwtToken(user);
                var refreshToken = GenerateSecureRefreshToken();

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

                // CHỈ set refresh token vào HttpOnly cookie
                SetRefreshTokenCookie(httpContext, refreshToken);

                // TRẢ VỀ access token qua JSON
                return new
                {
                    statuscodes = 200,
                    message = "Đăng nhập thành công",
                    data = new
                    {
                        accessToken = jwtToken,
                        accessTokenExpiry = DateTime.Now.AddMinutes(
                            Convert.ToDouble(_configuration["Jwt:AccessTokenDuration"])),
                        user = new
                        {
                            user.Id,
                            user.Username,
                            user.Email,
                            user.FullName,
                            user.Role
                        }
                    }
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    statuscodes = 500,
                    message = "Đã xảy ra lỗi, vui lòng thử lại sau"
                };
            }
        }

        public async Task<dynamic> RefreshToken(HttpContext httpContext)
        {
            try
            {
                var refreshToken = httpContext.Request.Cookies["refreshToken"];

                if (string.IsNullOrEmpty(refreshToken))
                {
                    return new { statuscodes = 401, message = "Refresh token không tồn tại" };
                }

                var tokenEntity = await _context.RefreshTokens
                    .Include(rt => rt.User)
                    .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

                if (tokenEntity == null)
                {
                    return new { statuscodes = 401, message = "Refresh token không hợp lệ" };
                }

                if (tokenEntity.IsRevoked)
                {
                    return new { statuscodes = 401, message = "Refresh token đã bị thu hồi" };
                }

                if (tokenEntity.Expires < DateTime.Now)
                {
                    return new { statuscodes = 401, message = "Refresh token đã hết hạn" };
                }

                if (!tokenEntity.User.IsActive)
                {
                    return new { statuscodes = 403, message = "Tài khoản đã bị khóa" };
                }

                // Tạo tokens mới
                var newJwtToken = _jwtServices.GenerateJwtToken(tokenEntity.User);
                var newRefreshToken = GenerateSecureRefreshToken();

                // XÓA token cũ (Token Rotation - bảo mật cao)
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

                // Set refresh token mới vào cookie
                SetRefreshTokenCookie(httpContext, newRefreshToken);

                // TRẢ VỀ access token mới qua JSON
                return new
                {
                    statuscodes = 200,
                    message = "Làm mới token thành công",
                    data = new
                    {
                        accessToken = newJwtToken,
                        accessTokenExpiry = DateTime.Now.AddMinutes(
                            Convert.ToDouble(_configuration["Jwt:AccessTokenDuration"]))
                    }
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    statuscodes = 500,
                    message = "Đã xảy ra lỗi, vui lòng thử lại sau"
                };
            }
        }

        public async Task<dynamic> RevokeToken(HttpContext httpContext)
        {
            try
            {
                var refreshToken = httpContext.Request.Cookies["refreshToken"];

                if (string.IsNullOrEmpty(refreshToken))
                {
                    return new { statuscodes = 404, message = "Token không tồn tại" };
                }

                var tokenEntity = await _context.RefreshTokens
                    .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

                if (tokenEntity == null || tokenEntity.IsRevoked)
                {
                    return new { statuscodes = 404, message = "Token không tồn tại hoặc đã bị thu hồi" };
                }

                // Đánh dấu revoked thay vì xóa (để audit trail)
                tokenEntity.IsRevoked = true;
                await _context.SaveChangesAsync();

                // Xóa cookie
                httpContext.Response.Cookies.Delete("refreshToken");

                return new { statuscodes = 200, message = "Thu hồi token thành công" };
            }
            catch (Exception ex)
            {
                return new
                {
                    statuscodes = 500,
                    message = "Đã xảy ra lỗi, vui lòng thử lại sau"
                };
            }
        }

        public async Task<dynamic> Logout(HttpContext httpContext)
        {
            try
            {
                var refreshToken = httpContext.Request.Cookies["refreshToken"];

                // XÓA COOKIE TRƯỚC để đảm bảo user logout được dù có lỗi DB
                httpContext.Response.Cookies.Delete("refreshToken");

                // SAU ĐÓ revoke token trong database
                if (!string.IsNullOrEmpty(refreshToken))
                {
                    var tokenEntity = await _context.RefreshTokens
                        .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

                    if (tokenEntity != null && !tokenEntity.IsRevoked)
                    {
                        tokenEntity.IsRevoked = true;
                        await _context.SaveChangesAsync();
                    }
                }

                return new { statuscodes = 200, message = "Đăng xuất thành công" };
            }
            catch (Exception ex)
            {
                // Vẫn trả về success vì cookie đã xóa
                return new { statuscodes = 200, message = "Đăng xuất thành công" };
            }
        }

        // PRIVATE HELPER 
        private string GenerateSecureRefreshToken()
        {
            var randomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        private void SetRefreshTokenCookie(HttpContext httpContext, string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,        // Không thể truy cập từ JavaScript (bảo vệ XSS)
                Secure = true,          // Chỉ gửi qua HTTPS
                SameSite = SameSiteMode.Strict, // Bảo vệ CSRF
                Expires = DateTime.Now.AddDays(
                    Convert.ToDouble(_configuration["Jwt:RefreshTokenDuration"]))
            };

            httpContext.Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
    }
}
