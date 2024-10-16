using EspacioCliente.Data.Models;
using EspacioCliente.Server.Servicios;
using EspacioCliente.Server.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;

namespace EspacioCliente.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService authService;
        private readonly JwtHandler jwtHandler;
        private readonly ILogger<AuthController> logger;        

        public AuthController(ILogger<AuthController> logger,
            IConfiguration configuration,            
            AuthService authService,
            JwtHandler jwtHandler)
        {
            this.authService = authService;
            this.jwtHandler = jwtHandler;
            this.logger = logger;
            
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> AutenticarAsync([FromBody] PeticionAutenticacion request)
        {
            this.logger.LogInformation($"login: {request.Email}");
            Servicios.Usuario? usr = await this.authService.Autenticar(request.Email, request.Password);
            if (usr is not null)
            {                
                JwtSecurityToken token = jwtHandler.GetToken(usr);
                string jwt = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new { token = jwt });
            }
            return Unauthorized();
        }
    }

    public record PeticionAutenticacion(string Email, string Password);
}
