using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace xsslabs.controllers
{
    [ApiController]
    [Route("reflected")]
    public class ReflectedXssController : ControllerBase
    {
        [HttpGet]
        public ContentResult Reflected([FromQuery] string? q)
        {
            // INTENTIONALLY VULNERABLE
            // High-fidelity reflected XSS
            // No encoding, no filtering, no helpers

            var html = new StringBuilder();

            html.Append("""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8" />
                    <title>Reflected XSS Lab</title>
                </head>
                <body>
                    <h1>Search</h1>

                    <form method="get" action="/reflected">
                        <input type="text" name="q" />
                        <button type="submit">Search</button>
                    </form>
            """);

            if (!string.IsNullOrEmpty(q))
            {
                // 🔥 REAL VULNERABILITY 🔥
                // User input is reflected directly into HTML context
                html.Append($"""
                    <p>Search results for: {q}</p>
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