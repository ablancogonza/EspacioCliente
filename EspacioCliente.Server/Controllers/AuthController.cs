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
        private readonly EspacioClienteContext context;
        private readonly JwtHandler jwtHandler;
        private readonly ILogger<AuthController> logger;
        private readonly IConfiguration configuration;

        public AuthController(ILogger<AuthController> logger,
            IConfiguration configuration,            
            AuthService authService,
            EspacioClienteContext context,
            JwtHandler jwtHandler)
        {
            this.authService = authService;
            this.context = context;
            this.jwtHandler = jwtHandler;
            this.logger = logger;
            this.configuration = configuration;
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

        [HttpGet("test")]
        public IActionResult Test()
        {
            string? cad = string.Empty;
            try
            {
                cad = Environment.GetEnvironmentVariable("prueba")??"nada";
            }
            catch (Exception ex)
            {
                cad = ex.Message;
            }            
            return Ok(cad);
        }
    }

    public record PeticionAutenticacion(string Email, string Password);
}
