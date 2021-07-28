using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using html2approvalsflow.Models;
using restapidemo;
using Newtonsoft.Json;

namespace html2approvalsflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApprovalController : ControllerBase
    {
        private readonly ApprovalsDBContext _context;

        public ApprovalController(ApprovalsDBContext context)
        {
            _context = context;
        }

        // GET: api/Approval
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Approval>>> Getapprovals()
        {
            return await _context.approvals.ToListAsync();
        }

        // GET: api/Approval/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Approval>> GetApproval(int id)
        {
            var approval = await _context.approvals.FindAsync(id);

            if (approval == null)
            {
                return NotFound();
            }

            return approval;
        }

        // PUT: api/Approval/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApproval(int id, Approval approval)
        {
            if (id != approval.Id)
            {
                return BadRequest();
            }

            _context.Entry(approval).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApprovalExists(id))
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

        // POST: api/Approval
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Approval>> PostApproval(Approval approval)
        {
            _context.approvals.Add(approval);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApproval", new { id = approval.Id }, approval);
        }
        // [HttpGet("GetByReqid/{reqid}")]
        [HttpPost("PostApprovals")]
        public async Task<ActionResult<Approval>> PostApprovals([FromBody]List<Approval> approvals)
        {
            Console.WriteLine(approvals.Count.ToString());
            
            foreach (var item in approvals)
            {
                Console.WriteLine(item.emailto);
            }
            _context.approvals.AddRange(approvals);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApprovals",  approvals);
        }

        // DELETE: api/Approval/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApproval(int id)
        {
            var approval = await _context.approvals.FindAsync(id);
            if (approval == null)
            {
                return NotFound();
            }

            _context.approvals.Remove(approval);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ApprovalExists(int id)
        {
            return _context.approvals.Any(e => e.Id == id);
        }

        // GET: api/Approval/GetByreqid/5
        // [HttpGet("GetByName/{name}")]
        [HttpGet("GetByReqid/{reqid}")]
        // Task<ActionResult<IEnumerable<Approval>>>
        public async Task<ActionResult<IEnumerable<Approval>>> GetByReqid(string reqid)
        {
            // var approval = await _context.approvals.FindAsync(reqid);
            var approval = await _context.approvals.Where(x => x.reqid == reqid).ToListAsync();


            if (approval == null)
            {
                return NotFound();
            }

            return approval;
        }
    }
}
