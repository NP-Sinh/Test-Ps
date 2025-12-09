using AutoMapper;
using backend.Models.Entities;
using backend.Models.Map;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public interface IBrandServices
    {
        Task<dynamic> getBrands();
        Task<dynamic> getBrandId(int id);
        Task<dynamic> modify(BrandMap brandMap, IFormFile? logoFile);
    }

    public class BrandServices : IBrandServices
    {
        private MoiPhoneDBContext _context;
        private IMapper _mapper;
        public BrandServices(MoiPhoneDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<dynamic> getBrandId(int id)
        {
            throw new NotImplementedException();
        }

        public Task<dynamic> getBrands()
        {
            throw new NotImplementedException();
        }

        public async Task<dynamic> modify(BrandMap brandMap, IFormFile? logoFile)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                Brand model = _mapper.Map<Brand>(brandMap);

                if (model.BrandId == 0)
                {
                    _context.Brands.Add(model);
                }
                else
                {
                    Brand update = await _context.Brands.FindAsync(model.BrandId);
                    update.Name = model.Name;
                    update.Country = model.Country;
                    update.FoundedYear = model.FoundedYear;
                    update.Description = model.Description;
                    update.LogoUrl = model.LogoUrl;
                    
                    _context.Brands.Update(update);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return new
                {
                    statusCode = 200,
                    message = "Thành công",
                    data = model
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return new
                {
                    statusCode = 500,
                    message = "Thất bại",
                    InnerError = ex.InnerException?.Message,
                };
            }
        }
    }
}
