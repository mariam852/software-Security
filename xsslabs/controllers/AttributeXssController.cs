using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace xsslabs.controllers
{
    [ApiController]
    [Route("attribute")]
    public class AttributeXssController : ControllerBase
    {
        [HttpGet]
        public ContentResult Index([FromQuery] string? search)
        {
            // Simulate partial encoding:
            // ONLY < and > are encoded (like many bad filters)
            string encodedInput = EncodeAngleBrackets(search ?? "");

            var html = new StringBuilder();

            html.Append("""
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Reflected XSS Lab</title>
                </head>
                <body>
                    <h1>Search</h1>

                    <form method="get" action="/attribute">
                        <input type="text" name="search" value="
            """);

            // 🔥 VULNERABILITY: attribute context + incomplete encoding
            html.Append(encodedInput);

            html.Append("""
                        ">
                        <button type="submit">Search</button>
                    </form>
                </body>
                </html>
            """);

            return new ContentResult
            {
                Content = html.ToString(),
                ContentType = "text/html"
            };
        }

        private string EncodeAngleBrackets(string input)
        {
            return input
                .Replace("<", "&lt;")
                .Replace(">", "&gt;");
        }
    }
}
