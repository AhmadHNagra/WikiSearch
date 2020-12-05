using System;
using System.Collections.Generic;

#nullable disable

namespace WikiSearch.Models
{
    public partial class SearchHistory
    {
        public int Id { get; set; }
        public string SearchQuery { get; set; }
        public string SearchResult { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
