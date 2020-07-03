using System;

namespace EmrsApp.API.Models
{
    public class Employee:IAuditInfo
    {
        public int ID { get; set; }  
        public string Name { get; set; }  
        public string Gender { get; set; }  
        public DateTime Dob { get; set; }
        public string Department { get; set; }  
        public string City { get; set; }
        public int TotalDataCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}