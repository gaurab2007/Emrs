using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EmrsApp.API.Data;
using EmrsApp.API.Dtos;
using EmrsApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmrsApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployee _objEmployee;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployee objEmployee, IMapper mapper)
        {
            _mapper = mapper;
            _objEmployee = objEmployee;

        }

        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            return _objEmployee.GetAllEmployees();
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetEmployeesAsync()
        {
            var employees = await _objEmployee.GetAllEmployeesAsync();
            var employeeToReturn = _mapper.Map<IEnumerable<EmployeeForListDto>>(employees).OrderBy(e=>e.Name);
            return Ok(employeeToReturn);
        }

    }
}