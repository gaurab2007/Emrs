using System;

namespace EmrsApp.API.Dtos
{
    public class EmployeeAfterSuccessfulLoginDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public DateTime Dob { get; set; }
        public string Username { get; set; }
    }
}