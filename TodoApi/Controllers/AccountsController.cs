using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TodoApi.Dtos;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IOptions<ApiBehaviorOptions> _apiBehaviorOptions;
        private readonly AppSettings _appSettings;

        public AccountsController(UserManager<ApplicationUser> userManager, IOptions<AppSettings> appSettings, IOptions<ApiBehaviorOptions> apiBehaviorOptions)
        {
            _userManager = userManager;
            _apiBehaviorOptions = apiBehaviorOptions;
            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-5.0
            _appSettings = appSettings.Value;
        }

        // api/Accounts/Login
        // https://dotnetdetail.net/asp-net-core-5-web-api-token-based-authentication-example-using-jwt/
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            // gelen veriler geçerli mi?
            if (!ModelState.IsValid)
            {
                return ModelStateErrors();
            }

            // parola doğrulama
            var user = await _userManager.FindByNameAsync(dto.UserName);

            if (user != null && await _userManager.CheckPasswordAsync(user, dto.Password))
            {
                // token (jwt) oluşturma
                var authClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, dto.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var authSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_appSettings.JwtSecret));

                var token = new JwtSecurityToken(
                    issuer: _appSettings.JwtIssuer,
                    audience: _appSettings.JwtIssuer,
                    expires: DateTime.Now.AddDays(14),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }

            ModelState.AddModelError("InvalidCredentials", "Invalid username or password!");
            return ModelStateErrors();
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDto dto, 
            [FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions)
        {
            // gelen veriler geçerli mi?
            if (!ModelState.IsValid)
            {
                return ModelStateErrors();
            }

            var user = new ApplicationUser()
            {
                UserName = dto.Email,
                Email = dto.Email
            };
            IdentityResult result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ModelStateErrors();
        }

        // https://kevsoft.net/2020/02/09/adding-errors-to-model-state-and-returning-bad-request-within-asp-net-core-3-1.html
        private IActionResult ModelStateErrors()
        {
            return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
        }

    }
}
