using Microsoft.Extensions.Configuration;

namespace EmrsApp.API.Helpers
{
    public static class DbConnectionString
    {
        public static string GetDbConnection(IConfiguration configuration)
        { 
            string connectionString = configuration["ConnectionStrings:DefaultConnection"];
            return connectionString;
        }
    }
}