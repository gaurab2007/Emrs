using System.Collections.Generic;
using System.Threading.Tasks;
using EmrsApp.API.Models;

namespace EmrsApp.API.Data
{
    public interface ITenant
    {
        Task<IEnumerable<Tenant>> GetAllTenantAsync(TenantQueryParams queryParams);
        Task<Tenant> GetTenantbyId(int id);
        int AddTenant(Tenant tenant);
        int UpdateTenant(Tenant tenant);
    }
}