using System;

namespace EmrsApp.API.Models
{
    public class Tenant : IAuditInfo
    {
        public int TenantId { get; set; }
        public string TenantName { get; set; }
        public string WorkspaceName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int TotalDataCount { get; set; }
    }
}