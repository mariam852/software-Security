using Microsoft.AspNetCore.Mvc;
using xsslabs.models;
using xsslabs.services;
using System.Text;

namespace xsslabs.controllers
{
    [ApiController]
    [Route("comments")]
    public class CommentsController : ControllerBase
    {
        private readonly CommentService _service;

        public CommentsController(CommentService service)
        {
            _service = service;
        }

        // POST /comments
        [HttpPost]
        public IActionResult PostComment(
            [FromForm] string username,
            [FromForm] string content)
        {
            // INTENTIONALLY VULNERABLE
            // Store raw user input with no validation or encoding

            _service.AddComment(new Comment
            {
                Username = username,
                Content = content
            });

            return Redirect("/comments");
        }

        // GET /comments
        [HttpGet]
        public ContentResult ViewComments()
        {
            var comments = _service.GetAllComments();
            var html = new StringBuilder();

            html.Append("""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8" />
                    <title>Stored XSS Lab</title>
                </head>
                <body>
                    <h1>Comments</h1>

                    <form method="post" action="/comments">
                        <input name="username" placeholder="username" />
                        <input name="content" placeholder="comment" />
                        <button type="submit">Post</button>
                    </form>

                    <hr>
            """);

            foreach (var c in comments)
            {
                // 🔥 REAL STORED XSS 🔥
                // Content is injected directly into HTML
                html.Append($"""
                    <p><b>{c.Username}</b>: {c.Content}</p>
                """);
            }

            html.Append("""
                </body>
                </html>
            """);

            return new ContentResult
            {
                Content = html.ToString(),
                ContentType = "text/html"
            };
        }
    }
}