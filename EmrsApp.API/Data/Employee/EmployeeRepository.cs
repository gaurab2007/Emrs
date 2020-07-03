using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using EmrsApp.API.Helpers;
using EmrsApp.API.Models;
using Microsoft.Extensions.Configuration;


namespace EmrsApp.API.Data
{
    public class EmployeeRepository : IEmployee
    {
        private string connectionString;
        public EmployeeRepository(IConfiguration configuration)
        {
            connectionString = DbConnectionString.GetDbConnection(configuration);
        }

        public int AddEmployee(Employee employee)
        {
            try
            {
                byte[] passwordHash, passwordSalt;
                CryptographyHelper.createPasswordHash(employee.Password,out passwordHash,out passwordSalt);

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddEmployee", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Name", employee.Name);
                    cmd.Parameters.AddWithValue("@Gender", employee.Gender);
                    cmd.Parameters.AddWithValue("@Department", employee.Department);
                    cmd.Parameters.AddWithValue("@City", employee.City);
                    cmd.Parameters.AddWithValue("@Dob", employee.Dob);
                    cmd.Parameters.AddWithValue("@Username", employee.Username);
                    cmd.Parameters.AddWithValue("@PasswordHash", passwordHash);
                    cmd.Parameters.AddWithValue("@PasswordSalt", passwordSalt);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteEmployee(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteEmployee", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@EmpId", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            try
            {
                List<Employee> lstemployee = new List<Employee>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllEmployees", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Employee employee = new Employee();

                        employee.ID = Convert.ToInt32(rdr["EmployeeID"]);
                        employee.Name = rdr["Name"].ToString();
                        employee.Gender = rdr["Gender"].ToString();
                        employee.Department = rdr["Department"].ToString();
                        employee.City = rdr["City"].ToString();

                        lstemployee.Add(employee);
                    }
                    con.Close();
                }
                return lstemployee;
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync(EmployeeQueryParams queryParams)
        {
            try
            {
                List<Employee> lstemployee = new List<Employee>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllEmployees", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    if (!string.IsNullOrEmpty(queryParams.SearchText))
                    {
                        cmd.Parameters.AddWithValue("@SearchText", queryParams.SearchText);
                    }
                    cmd.Parameters.AddWithValue("@PageNumber", queryParams.PageNumber);
                    cmd.Parameters.AddWithValue("@PageSize", queryParams.PageSize);

                    con.Open();
                    SqlDataReader rdr = await cmd.ExecuteReaderAsync();

                    while (rdr.Read())
                    {
                        Employee employee = new Employee();

                        employee.ID = Convert.ToInt32(rdr["EmployeeID"]);
                        employee.Name = rdr["Name"].ToString();
                        employee.Gender = rdr["Gender"].ToString();
                        employee.Department = rdr["Department"].ToString();
                        employee.City = rdr["City"].ToString();
                        employee.TotalDataCount = DataHelper.SafeGetInt(rdr, "Total");  //rdr.IsDBNull(rdr["Total"]) rdr["Total"].ToString();
                        employee.CreatedDate = DataHelper.SafeGetDate(rdr, "CreatedDate");
                        lstemployee.Add(employee);
                    }
                    con.Close();
                }
                return lstemployee.OrderByDescending(x => x.CreatedDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<City> GetCities()
        {
            throw new System.NotImplementedException();
        }

        public Employee GetEmployeeData(int id)
        {
            try
            {
                Employee employee = new Employee();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Get_employee_ById", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        employee.ID = Convert.ToInt32(rdr["EmployeeID"]);
                        employee.Name = rdr["Name"].ToString();
                        employee.Gender = rdr["Gender"].ToString();
                        employee.Department = rdr["Department"].ToString();
                        employee.City = rdr["City"].ToString();
                        employee.Dob = DataHelper.SafeGetDate(rdr, "Dob");
                    }
                }
                return employee;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateEmployee(Employee employee)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateEmployee", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@EmpId", employee.ID);
                    cmd.Parameters.AddWithValue("@Name", employee.Name);
                    cmd.Parameters.AddWithValue("@Gender", employee.Gender);
                    cmd.Parameters.AddWithValue("@Department", employee.Department);
                    cmd.Parameters.AddWithValue("@City", employee.City);
                    cmd.Parameters.AddWithValue("@Dob", employee.Dob);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}