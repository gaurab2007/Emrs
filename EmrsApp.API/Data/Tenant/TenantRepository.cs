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
    public class TenantRepository: ITenant
    {
        private string connectionString;
        public TenantRepository(IConfiguration configuration)
        {
            connectionString = DbConnectionString.GetDbConnection(configuration);
        }

        public async Task<IEnumerable<Tenant>> GetAllTenantAsync(TenantQueryParams queryParams)
        {
            try
            {
                List<Tenant> lstTenant = new List<Tenant>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllTenants", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    if (!string.IsNullOrEmpty(queryParams.SearchText))
                    {
                        cmd.Parameters.AddWithValue("@SearchText", queryParams.SearchText);
                    }
                    cmd.Parameters.AddWithValue("@PageNumber", queryParams.PageNumber);
                    cmd.Parameters.AddWithValue("@PageSize", queryParams.PageSize);

                    con.Open();
                    SqlDataReader reader = await cmd.ExecuteReaderAsync();

                    while (reader.Read())
                    {
                        Tenant tenant = new Tenant();

                        tenant.TenantId = Convert.ToInt32(reader["TenantId"]);
                        tenant.TenantName = reader["TenantName"].ToString();
                        tenant.WorkspaceName = reader["WorkspaceName"].ToString();
                        tenant.CreatedDate = reader.SafeGetDate("CreatedDate");
                        tenant.ModifiedDate = reader.SafeGetDate("ModifyDate");
                        tenant.TotalDataCount = reader.SafeGetInt("Total");
                        lstTenant.Add(tenant);
                    }
                    con.Close();
                }
                return lstTenant.OrderByDescending(x => x.CreatedDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Tenant> GetTenantbyId(int id)
        {
            try
            {
                Tenant tenant = new Tenant();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Get_tenant_ById", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    con.Open();
                    SqlDataReader reader = await cmd.ExecuteReaderAsync();
                    while (reader.Read())
                    {
                        tenant.TenantId = Convert.ToInt32(reader["TenantId"]);
                        tenant.TenantName = reader["TenantName"].ToString();
                        tenant.WorkspaceName = reader["WorkspaceName"].ToString();
                        tenant.CreatedDate = reader.SafeGetDate("CreatedDate");
                        tenant.ModifiedDate = reader.SafeGetDate("ModifyDate");
                    }
                }
                return tenant;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddTenant(Tenant tenant)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddTenant", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TenantName", tenant.TenantName);
                    cmd.Parameters.AddWithValue("@WorkspaceName", tenant.WorkspaceName);
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

        public int UpdateTenant(Tenant tenant)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateTenant", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@TenantId", tenant.TenantId);
                    cmd.Parameters.AddWithValue("@TenantName", tenant.TenantName);
                    cmd.Parameters.AddWithValue("@WorkspaceName", tenant.WorkspaceName);
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