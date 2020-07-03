namespace EmrsApp.API.Models
{
    public class EmployeeQueryParams : IPagingQuery
    {
        public string SearchText { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}