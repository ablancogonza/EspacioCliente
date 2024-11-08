using EspacioCliente.Data.Models;
using EspacioCliente.Server.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EspacioCliente.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncidenciaController : ControllerBase
    {
        private readonly EspacioClienteContext context;

        public IncidenciaController(Data.Models.EspacioClienteContext context)
        {
            this.context = context;
        }

        [HttpGet("lista")]
        public string? Lista()
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[IncidenciasLista]({idUsuario}) as value").FirstOrDefault();
        }

        [HttpPost("crear")]
        public async Task<string?> Crear([FromBody] PeticionCrearIncidencia nueva)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<string> salida = new OutputParameter<string>();
            await this.context.Procedures.IncidenciasCrearAsync(idUsuario, nueva.IdNodo, nueva.Titulo, salida);
            return salida.Value;
        }

    }

    public record PeticionCrearIncidencia(int IdNodo, string Titulo);
}
