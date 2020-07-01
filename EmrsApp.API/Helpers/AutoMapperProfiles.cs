using AutoMapper;
using EmrsApp.API.Dtos;
using EmrsApp.API.Models;

namespace EmrsApp.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, EmployeeForListDto>();
        }
        
    }
}