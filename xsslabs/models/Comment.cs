namespace xsslabs.models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty; // XSS payload lives here 😈
    }
}
