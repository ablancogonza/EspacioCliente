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
    public class BriefingController : ControllerBase
    {
        private readonly EspacioClienteContext context;

        public BriefingController(EspacioClienteContext context)
        {
            this.context = context;
        }

        [HttpPost("crear")]
        public async Task<string> Crear([FromBody] PeticionCrearBriefing nueva)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<string> salida = new OutputParameter<string>();
            await this.context.Procedures.BriefingCrearAsync(nueva.IdNodo, nueva.Descripcion, nueva.Presupuesto, DateOnly.FromDateTime(nueva.Inicio.ToLocalTime()), DateOnly.FromDateTime(nueva.Fin.ToLocalTime()), nueva.Medio, idUsuario, salida);
            return salida.Value;
        }

        [HttpGet("lista/{id}")]
        public string? Lista(int id)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[BriefingLista]({idUsuario},{id}) as value").FirstOrDefault();
        }
    }

    public record PeticionCrearBriefing(int IdNodo, string Descripcion, decimal Presupuesto, DateTime Inicio, DateTime Fin, int Medio);
}
