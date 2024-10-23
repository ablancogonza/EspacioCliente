using EspacioCliente.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EspacioCliente.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FiltroController : ControllerBase
    {
        private readonly EspacioClienteContext context;

        public FiltroController(EspacioClienteContext context)
        {
            this.context = context;
        }

        [HttpGet("elementosFiltro")]
        public string? ElementosFiltro()
        {
            // Recuperar usuario del contexto
            return context.Database.SqlQuery<string>($"SELECT [dbo].[ElementosFiltro] (1) as value").FirstOrDefault();
        }
    }
}
