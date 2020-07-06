using System.Threading.Tasks;
using AutoMapper;
using EmrsApp.API.Data;
using EmrsApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmrsApp.API.Controllers
{
    [Route("api/[controller]")] 
    [Authorize]
    [ApiController]
    public class TenantController : ControllerBase
    {
        private readonly ITenant _objTenant;
        private readonly IMapper _mapper;
        public TenantController(ITenant objTenant, IMapper mapper)
        {
            _mapper = mapper;
            _objTenant = objTenant;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetTenantsAsync([FromQuery] TenantQueryParams queryParams)
        {
            var tenants = await _objTenant.GetAllTenantAsync(queryParams);
            return Ok(tenants);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var tenant = await _objTenant.GetTenantbyId(id);
            return Ok(tenant);
        }

        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] Tenant tenant)
        {
            return _objTenant.AddTenant(tenant);
        }

        [HttpPut]
        [Route("Edit")]
        public int Edit([FromBody] Tenant tenant)
        {
            return _objTenant.UpdateTenant(tenant);
        }
    }
}