using AutoMapper;
using backend.Models.Entities;

namespace backend.Models.Map
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<BrandMap, Brand>().ReverseMap();
            CreateMap<UserMap, User>().ReverseMap();
            CreateMap<RefreshTokenMap, RefreshToken>().ReverseMap();

        }
    }
}
