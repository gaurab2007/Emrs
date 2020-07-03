using System;

namespace EmrsApp.API.Models
{
    public interface IAuditInfo
    {
         public DateTime CreatedDate { get; set; }
         public DateTime ModifiedDate { get; set; }
    }
}