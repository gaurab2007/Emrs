
 
using EmrsApp.API.Helpers;
using EmrsApp.API.Models;
using Microsoft.Extensions.Configuration; 

namespace EmrsApp.API.Data.Login
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataLogin _data;
        public AuthRepository(IConfiguration configuration)
        {
            _data = new DataLogin(configuration);
        }

        public Employee Login(string username, string password)
        {
            var employee = _data.GetEmployeeByUsername(username);
            if (employee != null)
            {
                if (!CryptographyHelper.VerifyPasswordHash(password, employee.PasswordHash, employee.PasswordSalt))
                    return null;
            }
            return employee;
        }
    }
}