using backend.Models.Entities;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly MoiPhoneDBContext _context;
        private ICategoryServices _services;
        public CategoryController (MoiPhoneDBContext context, ICategoryServices services)
        {
            _context = context;
            _services = services;
        }
        [HttpGet("getCategory")]
        public async Task<IActionResult> GetCategory()
        {
            var result = await _services.getCategory();
            return Ok(result);  
        }
        [HttpPost("modify")]
        public async Task<IActionResult> Modify([FromBody] Category model)
        {
            try
            {
                if (model.CategoryId == 0)
                {
                    _context.Categories.Add(model);
                }
                else
                {
                    Category update = await _context.Categories.FindAsync(model.CategoryId);
                    update.Name = model.Name;
                    _context.Categories.Update(update);
                }
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    statuscode = 200,
                    message = "Thành công",
                    data = model
                });
                
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    statuscode = 500,
                    message = "Thất bại",
                });
            }
        }
    }
}
