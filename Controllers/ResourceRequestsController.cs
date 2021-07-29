using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using html2approvalsflow.Models;
using restapidemo;

namespace html2approvalsflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceRequestsController : ControllerBase
    {
        private readonly ApprovalsDBContext _context;

        public ResourceRequestsController(ApprovalsDBContext context)
        {
            _context = context;
        }

        // GET: api/ResourceRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResourceRequest>>> GetResourceRequests()
        {
            return await _context.ResourceRequests.ToListAsync();
        }

        // GET: api/ResourceRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ResourceRequest>> GetResourceRequest(int id)
        {
            var resourceRequest = await _context.ResourceRequests.FindAsync(id);

            if (resourceRequest == null)
            {
                return NotFound();
            }

            return resourceRequest;
        }

        // PUT: api/ResourceRequests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResourceRequest(int id, ResourceRequest resourceRequest)
        {
            if (id != resourceRequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(resourceRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceRequestExists(id))
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

        // POST: api/ResourceRequests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ResourceRequest>> PostResourceRequest(ResourceRequest resourceRequest)
        {
            _context.ResourceRequests.Add(resourceRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResourceRequest", new { id = resourceRequest.Id }, resourceRequest);
        }

        // DELETE: api/ResourceRequests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResourceRequest(int id)
        {
            var resourceRequest = await _context.ResourceRequests.FindAsync(id);
            if (resourceRequest == null)
            {
                return NotFound();
            }

            _context.ResourceRequests.Remove(resourceRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResourceRequestExists(int id)
        {
            return _context.ResourceRequests.Any(e => e.Id == id);
        }
    }
}
