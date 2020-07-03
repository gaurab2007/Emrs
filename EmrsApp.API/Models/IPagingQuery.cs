namespace EmrsApp.API.Models
{
    public interface IPagingQuery 
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}