using System;
using EmrsApp.API.Helpers;
using EmrsApp.API.Models;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace EmrsApp.API.Data.Login
{
    internal class DataLogin
    {
        private string connectionString;
        public DataLogin(IConfiguration configuration)
        {
            connectionString = DbConnectionString.GetDbConnection(configuration);
        }

        internal Employee GetEmployeeByUsername(string username)
        {

            try
            {
                Employee employee = new Employee();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Get_employee_UserName", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Username", username);
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
                        employee.Username = DataHelper.SafeGetString(rdr, "Username");
                        employee.PasswordHash = (byte[])rdr["PasswordHash"];
                        employee.PasswordSalt = (byte[])rdr["PasswordSalt"];
                    }
                }
                return employee;
            }
            catch (Exception ex)
            {
                throw ex;
            } 
        }
    }
}