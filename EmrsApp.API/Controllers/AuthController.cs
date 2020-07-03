using AutoMapper;
using EmrsApp.API.Data.Login;
using EmrsApp.API.Dtos;
using EmrsApp.API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens; 
using System.IdentityModel.Tokens.Jwt; 
using System.Text;

namespace EmrsApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;
            _configuration = configuration;
            _repo = repo;
        }


        [HttpPost]
        [Route("login")]
        public IActionResult Login(UserForLoginDto userForRegisterDto)
        {
            var userFromRepo = _repo.Login(userForRegisterDto.Username, userForRegisterDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var tokenHandeler = new JwtSecurityTokenHandler();
            var token = JwtTokenHelper.CreateJwtToken(key, userFromRepo.ID, userFromRepo.Username);
            var user = _mapper.Map<EmployeeAfterSuccessfulLoginDto>(userFromRepo);
            return Ok(new
            {
                token = tokenHandeler.WriteToken(token),
                user
            });
        }
    }
}