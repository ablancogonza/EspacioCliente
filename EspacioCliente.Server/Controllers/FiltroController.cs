using EspacioCliente.Data.Models;
using EspacioCliente.Server.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EspacioCliente.Server.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[ElementosFiltro] ({idUsuario}) as value").FirstOrDefault();
        }

        [HttpGet("buscar")]
        public string? Buscar(int nivel, string texto)
        {
            int idUsuario = User.IdUsuario();
            if (string.IsNullOrEmpty(texto)) return "[]";
            return context.Database.SqlQuery<string>($"SELECT [dbo].[BuscarFiltro] ({idUsuario},{nivel},{texto}) as value").FirstOrDefault();
        }
    }
}
