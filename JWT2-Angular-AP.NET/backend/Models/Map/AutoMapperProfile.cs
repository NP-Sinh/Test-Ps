using AutoMapper;
using backend.Models.Entities;

namespace backend.Models.Map
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
