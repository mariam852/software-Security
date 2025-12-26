using xsslabs.data;
using xsslabs.models;

namespace xsslabs.services
{
    public class XssService
    {
        // Stored XSS
        public StoredMessage AddMessage(string message)
        {
            var msg = new StoredMessage
            {
                Id = InMemoryStore.CurrentId++,
                Message = message
            };

            InMemoryStore.Messages.Add(msg);
            return msg;
        }

        public List<StoredMessage> GetMessages()
        {
            return InMemoryStore.Messages;
        }

        // Reflected XSS
        public string Reflect(string input)
        {
            // INTENTIONALLY UNSAFE
            return $"<p>You searched for: {input}</p>";
        }
    }
}
