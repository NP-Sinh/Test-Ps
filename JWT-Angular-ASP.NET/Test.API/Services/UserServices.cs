using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Test.API.Models.Entities;

namespace Test.API.Services
{
    public interface IUserServices
    {
        Task<dynamic> GetUserProfile(int userId);
        Task<dynamic> GetAllUsers(int userId);

    }
    public class UserServices : IUserServices
    {
        private readonly JwtTestDBContext _context;
        private readonly IMapper _mapper;
        public UserServices(JwtTestDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<dynamic> GetUserProfile(int userId)
        {
            try
            {
                var user = await _context.Users
                    .Where(u => u.Id == userId && u.IsActive)
                    .Select(u => new
                    {
                        u.Id,
                        u.Username,
                        u.Email,
                        u.FullName,
                        u.Role,
                        u.CreatedAt,
                        u.IsActive
                    })
                    .FirstOrDefaultAsync();

                return new { statuscodes = 200, message = "Lấy thông tin user thành công", data = user };
            }
            catch (Exception ex)
            {
                return new { statuscodes = 500, message = $"Lỗi: {ex.Message}" };
            }
        }
        public async Task<dynamic> GetAllUsers(int userId)
        {
            try
            {
                var currentUser = await _context.Users.FindAsync(userId);
                if (currentUser?.Role != "Admin")
                    return new { statuscodes = 403, message = "Không có quyền truy cập" };

                var users = await _context.Users
                    .Where(u => u.Id != userId)
                    .Select(u => new
                    {
                        u.Id,
                        u.Username,
                        u.Email,
                        u.FullName,
                        u.Role,
                        u.IsActive,
                        u.CreatedAt,
                        RefreshTokensCount = u.RefreshTokens.Count(rt => !rt.IsRevoked)
                    })
                    .OrderByDescending(u => u.CreatedAt)
                    .ToListAsync();

                return new { statuscodes = 200, message = "Lấy danh sách users thành công", data = users };
            }
            catch (Exception ex)
            {
                return new { statuscodes = 500, message = $"Lỗi: {ex.Message}" };
            }
        }
    }
}
