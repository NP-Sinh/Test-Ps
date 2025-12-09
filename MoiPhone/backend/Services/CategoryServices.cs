using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface ICategoryServices
    {
        Task<dynamic> getCategory();
        Task<dynamic> getCategoryId(int id);
        Task<dynamic> modify(Category model);
    }
    public class CategoryServices : ICategoryServices
    {
        private readonly MoiPhoneDBContext _context;
        public CategoryServices(MoiPhoneDBContext context) 
        {
            _context = context;
        }
        public async Task<dynamic> getCategory()
        {
            var query = await _context.Categories
                .Select(x => new
                {
                    id = x.CategoryId,
                    name = x.Name,
                })
                .ToListAsync();
            return query;
        }

        public Task<dynamic> getCategoryId(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<dynamic> modify(Category model)
        {
            throw new NotImplementedException();
        }
    }
}
