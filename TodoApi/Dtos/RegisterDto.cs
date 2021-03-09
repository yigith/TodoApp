using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
