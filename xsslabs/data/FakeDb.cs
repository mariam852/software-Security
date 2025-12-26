using xsslabs.models;
using System.Collections.Generic;

namespace xsslabs.data
{
    // Very small in-memory comments store used by the sample app
    public static class FakeDb
    {
        static FakeDb()
        {
            Comments = new List<Comment>();
        }

        public static List<Comment> Comments { get; }
    }
}
