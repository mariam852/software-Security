using xsslabs.models;
using System.Collections.Generic;

namespace xsslabs.data
{
    public static class InMemoryStore
    {
        static InMemoryStore()
        {
            Messages = new List<StoredMessage>();
            CurrentId = 1;
        }

        public static List<StoredMessage> Messages { get; }
        public static int CurrentId { get; set; }
    }
}
