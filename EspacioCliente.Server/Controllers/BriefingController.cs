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

        [HttpGet("descargar/{id}")]
        public IActionResult Descargar(int id)
        {
            int idUsuario = User.IdUsuario();
            var reg = context.BriefingDescargaFichero(idUsuario, id).FirstOrDefault();
            if (reg != null)
            {
                var fileName = $"{reg?.Descripcion}.{reg?.Extension}";
                
                Response.Headers.Add("Content-Disposition", $"attachment; filename={fileName}");
                Response.Headers.Add("Content-Length", reg.Contenido.Length.ToString());
                Response.Headers.Add("Content-Type", "application/octet-stream");

                return File(reg.Contenido, "application/octet-stream");
            }
            return BadRequest();
        }

        [HttpGet("adjuntos/{id}")]
        public string? Adjuntos(int id)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[BriefingListaAdjuntos]({idUsuario},{id}) as value").FirstOrDefault();
        }


        [HttpPost("upload/{id}/{descrip}")]
        public async Task Upload(int id, IFormFile fichero, string descrip)
        {
            int idUsuario = User.IdUsuario();

            byte[] ficheroBytes;
            using (MemoryStream ms = new MemoryStream())
            {
                fichero.OpenReadStream().CopyTo(ms);
                ficheroBytes = ms.ToArray();
            }            
            string ext = Path.GetExtension(fichero.FileName);
            await this.context.Procedures.BriefingSubirAdjuntoAsync(idUsuario, id, descrip, ficheroBytes, ext);            
        }
    }

    public record PeticionCrearBriefing(int IdNodo, string Descripcion, decimal Presupuesto, DateTime Inicio, DateTime Fin, int Medio);
}
