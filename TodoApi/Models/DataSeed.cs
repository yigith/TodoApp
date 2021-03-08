using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public static class DataSeed
    {
        public async static Task<IHost> SeedUsersAsync(this IHost host)
        {
            var scope = host.Services.CreateScope();
            var todoContext = scope.ServiceProvider.GetRequiredService<TodoContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            if (!await todoContext.Users.AnyAsync())
            {
                var user = new ApplicationUser()
                {
                    Email = "user@example.com",
                    UserName = "user@example.com"
                };
                await userManager.CreateAsync(user, "Password1.");
            }

            return host;
        }

        private static int UserManager<T>()
        {
            throw new NotImplementedException();
        }
    }
}
