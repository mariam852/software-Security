using Microsoft.AspNetCore.Mvc;

namespace xsslabs.controllers
{
    [ApiController]
    [Route("")]
    public class DomXssController : ControllerBase
    {
        // GET /
        [HttpGet]
        public ContentResult Index()
        {
            var html = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DOM XSS Lab</title>
</head>
<body>
    <h1>Search Page</h1>

    <p>Try adding a search query to the URL.</p>
    <p>Example: <code>?q=test</code></p>

    <script>
        // 🚨 DOM XSS VULNERABILITY 🚨
        // Source: location.search
        // Sink: document.write
        // No server involvement

        var query = location.search;
        document.write('You searched for: ' + query);
    </script>

</body>
</html>
""";

            return new ContentResult
            {
                Content = html,
                ContentType = "text/html"
            };
        }
    }
}