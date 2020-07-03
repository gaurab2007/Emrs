using System;
using System.Data.SqlClient;

namespace EmrsApp.API.Helpers
{
    public static class DataHelper
    {
        public static int SafeGetInt(this SqlDataReader reader, string colName)
        {
            if (reader[colName] != DBNull.Value)
            {
                return Convert.ToInt32(reader[colName]);
            }
            else
            {
                return 0;
            }
        }

        public static DateTime SafeGetDate(this SqlDataReader reader, string colName)
        {
            if (reader[colName] != DBNull.Value)
            {
                return Convert.ToDateTime(reader[colName]);
            }
            else
            {
                return DateTime.MinValue;
            }
        }

        public static string SafeGetString(this SqlDataReader reader, string colName)
        {
            if (reader[colName] != DBNull.Value)
            {
                return Convert.ToString(reader[colName]);
            }
            else
            {
                return string.Empty;
            }
        }
    }
}