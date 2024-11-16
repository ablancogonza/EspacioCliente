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
    public class IncidenciaController : ControllerBase
    {
        private readonly EspacioClienteContext context;

        public IncidenciaController(Data.Models.EspacioClienteContext context)
        {
            this.context = context;
        }

        [HttpGet("lista/{id}")]
        public string? Lista(int id)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[IncidenciasLista]({idUsuario},{id}) as value").FirstOrDefault();
        }

        [HttpPost("crear")]
        public async Task<string?> Crear([FromBody] PeticionCrearIncidencia nueva)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<string> salida = new OutputParameter<string>();
            await this.context.Procedures.IncidenciasCrearAsync(idUsuario, nueva.IdNodo, nueva.Titulo, salida);
            return salida.Value;
        }

        [HttpPost("mensaje")]
        public async Task<string?> CrearMensaje([FromBody] PeticionCrearMensaje nueva)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<string> salida = new OutputParameter<string>();
            await this.context.Procedures.IncidenciasConversacionCrearEntradaAsync(idUsuario, nueva.IdIncidencia, nueva.Texto, null, salida);
            return salida.Value;
        }

        [HttpGet("mensajes/{id}")]
        public string? ListaMensajes(int id)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[IncidenciasListaMensajes]({idUsuario},{id}) as value").FirstOrDefault();
        }

        [HttpPost("finalizar")]
        public async Task<string?> FinalizarIncidencia([FromBody] PeticionFinalizarIncidencia incidencia)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<string> salida = new OutputParameter<string>();
            await this.context.Procedures.IncidenciasFinalizarAsync(idUsuario, incidencia.IdIncidencia, incidencia.IdNodo, salida);
            return salida.Value;
        }

        [HttpPost("upload/{id}/{texto}")]
        public async Task<string?> Upload(int id, IFormFile fichero, string? texto = "")
        {
            int idUsuario = User.IdUsuario();
            if (texto == "SINTEXTO") texto = string.Empty;

            byte[] ficheroBytes;
            using (MemoryStream ms = new MemoryStream())
            {
                fichero.OpenReadStream().CopyTo(ms);
                ficheroBytes = ms.ToArray();
            }            
            OutputParameter<string> salida = new OutputParameter<string>();
            await this.context.Procedures.IncidenciasConversacionCrearEntradaAsync(idUsuario, id, texto, ficheroBytes, salida);
            return salida.Value;
        }       
    }

    public record PeticionCrearIncidencia(int IdNodo, string Titulo);
    public record PeticionCrearMensaje(int IdIncidencia, string Texto);
    public record PeticionFinalizarIncidencia(int IdIncidencia, int IdNodo);    
}
