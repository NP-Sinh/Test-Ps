
using AutoMapper;
using Test.API.Models.Entities;

namespace Test.API.Models.Map
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserMap>().ReverseMap();
            CreateMap<RefreshToken, RefreshTokenMap>().ReverseMap();
        }
    }
}
