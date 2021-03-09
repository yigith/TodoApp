using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class ApplicationUser : IdentityUser
    {

        public List<TodoItem> TodoItems { get; set; }
    }
}
