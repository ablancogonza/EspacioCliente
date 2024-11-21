using EspacioCliente.Data.Models;
using EspacioCliente.Server.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace EspacioCliente.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MapaController : ControllerBase
    {
        private readonly EspacioClienteContext context;

        public MapaController(Data.Models.EspacioClienteContext context)
        {
            this.context = context;
        }

        [HttpGet("marcas/{id}/{inicio}/{fin}")]
        public string? Marcas(int id, int inicio, int fin)
        {
            var idUsuario = new SqlParameter("idUsuario", User.IdUsuario());
            return context.Database.SqlQuery<string>($"SELECT [dbo].[MapaEntradas]({idUsuario},{id},{inicio},{fin}) as value").FirstOrDefault();
        }

        [HttpGet("info/{id}/{inicio}/{fin}/{idValla}")]
        public string? Info(int id, int inicio, int fin, int idValla)
        {
            var idUsuario = new SqlParameter("idUsuario", User.IdUsuario());
            return context.Database.SqlQuery<string>($"SELECT [dbo].[MapaInfo]({idUsuario},{id},{inicio},{fin},{idValla}) as value").FirstOrDefault();
        }
    }
}
