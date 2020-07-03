using EmrsApp.API.Models;

namespace EmrsApp.API.Data.Login
{
    public interface IAuthRepository
    {
         Employee Login(string username, string password);
    }
}