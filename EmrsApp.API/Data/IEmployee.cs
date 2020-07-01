using System.Collections.Generic;
using System.Threading.Tasks;
using EmrsApp.API.Models;

namespace EmrsApp.API.Data
{
    public interface IEmployee
    {
        IEnumerable<Employee> GetAllEmployees();
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        int AddEmployee(Employee employee);
        int UpdateEmployee(Employee employee);
        Employee GetEmployeeData(int id);
        int DeleteEmployee(int id);
        List<City> GetCities();
    }
}