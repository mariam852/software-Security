using xsslabs.data;
using xsslabs.models;

namespace xsslabs.services
{
    public class CommentService
    {

        private readonly AppDbContext _context;

        // This is the dependency the DI container MUST fulfill:
        public CommentService(AppDbContext context) 
        {
            _context = context;
        }
        
        public void AddComment(Comment comment)
        {
            comment.Id = FakeDb.Comments.Count + 1;
            FakeDb.Comments.Add(comment);
        }

        public List<Comment> GetAllComments()
        {
            return FakeDb.Comments;
        }
    }
}
