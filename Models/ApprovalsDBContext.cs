using System;
using html2approvalsflow;
using html2approvalsflow.Models;
using Microsoft.EntityFrameworkCore;

namespace restapidemo
{
    public class ApprovalsDBContext : DbContext
    {
        public ApprovalsDBContext(DbContextOptions<ApprovalsDBContext> options)
            : base(options)
        {
        }
        public DbSet<Company> companies { get; set; }
        public DbSet<Approval> approvals { get; set; }

    }
}