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
        public async Task<IActionResult> GetEmployeesAsync([FromQuery] EmployeeQueryParams queryParams)
        {
            var employees = await _objEmployee.GetAllEmployeesAsync(queryParams);
            var employeeToReturn = _mapper.Map<IEnumerable<EmployeeForListDto>>(employees);
            return Ok(employeeToReturn);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Details(int id)
        {
            var employee = _objEmployee.GetEmployeeData(id);
            var employeeToReturn = _mapper.Map<EmployeeForDetailDto>(employee);
            return Ok(employeeToReturn);
        }


        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] Employee employee)
        {
            return _objEmployee.AddEmployee(employee);
        }

        [HttpPut]
        [Route("Edit")]
        public int Edit([FromBody] Employee employee)
        {
            return _objEmployee.UpdateEmployee(employee);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return _objEmployee.DeleteEmployee(id);
        }

    }
}