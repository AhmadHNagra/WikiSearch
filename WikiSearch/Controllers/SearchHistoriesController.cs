using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WikiSearch.Models;

namespace WikiSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchHistoriesController : ControllerBase
    {
        private readonly WikiSearchContext _context;

        public SearchHistoriesController(WikiSearchContext context)
        {
            _context = context;
        }

        // GET: api/SearchHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SearchHistory>>> GetSearchHistories()
        {
            return await _context.SearchHistories.ToListAsync();
        }

        // GET: api/SearchHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SearchHistory>> GetSearchHistory(int id)
        {
            var searchHistory = await _context.SearchHistories.FindAsync(id);

            if (searchHistory == null)
            {
                return NotFound();
            }

            return searchHistory;
        }

        // PUT: api/SearchHistories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSearchHistory(int id, SearchHistory searchHistory)
        {
            if (id != searchHistory.Id)
            {
                return BadRequest();
            }

            _context.Entry(searchHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SearchHistoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SearchHistories
        [HttpPost]
        public async Task<ActionResult<SearchHistory>> PostSearchHistory(SearchHistory searchHistory)
        {
            searchHistory.DateCreated = DateTime.Now;
            _context.SearchHistories.Add(searchHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSearchHistory", new { id = searchHistory.Id }, searchHistory);
        }

        // DELETE: api/SearchHistories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SearchHistory>> DeleteSearchHistory(int id)
        {
            var searchHistory = await _context.SearchHistories.FindAsync(id);
            if (searchHistory == null)
            {
                return NotFound();
            }

            _context.SearchHistories.Remove(searchHistory);
            await _context.SaveChangesAsync();

            return searchHistory;
        }

        private bool SearchHistoryExists(int id)
        {
            return _context.SearchHistories.Any(e => e.Id == id);
        }
    }
}
