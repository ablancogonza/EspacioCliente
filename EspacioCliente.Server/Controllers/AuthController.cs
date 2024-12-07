using EspacioCliente.Data.Models;
using EspacioCliente.Server.Servicios;
using EspacioCliente.Server.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;

namespace EspacioCliente.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
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
        public IActionResult AutenticarAsync([FromBody] PeticionAutenticacion request)
        {
            this.logger.LogInformation($"login: {request.Email}");
            Servicios.Usuario? usr = this.authService.Autenticar(request.Email, request.Password);
            if (usr is not null)
            {                
                JwtSecurityToken token = jwtHandler.GetToken(usr);
                string jwt = new JwtSecurityTokenHandler().WriteToken(token);
                Logging.Registrar(context, $"Login exitoso: {request.Email}");
                return Ok(new { token = jwt, rol = usr.Rol });
            }
            Logging.Registrar(context, $"Intento de login fallido: {request.Email}, {request.Password}");
            return Unauthorized();
        }

        [HttpGet("tokenvalid")]
        [Authorize]
        public IActionResult TokenValid()
        {                 
            return Ok();
        }
    }

    public record PeticionAutenticacion(string Email, string Password);
}
