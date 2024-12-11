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
    [Authorize(Roles = "0")]
    public class AdminController : ControllerBase
    {
        private readonly EspacioClienteContext context;

        public AdminController(EspacioClienteContext context)
        {
            this.context = context;
        }

        [HttpGet("raicesArbol")]
        public string? RaicesArbol()
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[AdminArbolRaices]({idUsuario}) as value").FirstOrDefault();
        }

        [HttpGet("nodosArbol/{id}")]
        public string? NodosArbol(int id)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[AdminArbolNodos]({idUsuario}, {id}) as value").FirstOrDefault();
        }

        [HttpPost("nuevoNodo")]
        public async Task<bool> NuevoNodo([FromBody] PeticionNuevoNodo req)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<bool?> salida = new OutputParameter<bool?>();
            await this.context.Procedures.AdminNuevoNodoAsync(idUsuario, req.IdNodo, req.Descripcion, salida);
            return salida.Value??false;
            
        }

        [HttpPost("editarNodo")]
        public async Task<bool> EditarNodo([FromBody] PeticionNuevoNodo req)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<bool?> salida = new OutputParameter<bool?>();
            await this.context.Procedures.AdminEditarNodoAsync(idUsuario, req.IdNodo, req.Descripcion, salida);
            return salida.Value ?? false;
        }

        [HttpDelete("borrarNodos/{id}")]
        public async Task<bool> BorrarNodos(int id)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<bool?> salida = new OutputParameter<bool?>();
            await this.context.Procedures.AdminBorrarNodosAsync(idUsuario, id, salida);
            return salida.Value ?? false;
        }

        [HttpGet("usuarios")]
        public string? Usuarios()
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[AdminUsuarios]({idUsuario}) as value").FirstOrDefault();
        }

        [HttpGet("usuarioNodos/{id}")]
        public string? UsuarioNodos(int id)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[AdminUsuariosNodos]({idUsuario},{id}) as value").FirstOrDefault();
        }

        [HttpPost("guardarUsuario")]
        public async Task<bool> GuardarUsuario([FromBody] PeticionGuardarUsuario req)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<bool?> salida = new OutputParameter<bool?>();
            await this.context.Procedures.AdminGuardarUsuarioAsync(idUsuario, req.IdUsuario, req.Nombre, req.Login, req.IdRol, salida);
            return salida.Value ?? false;
        }

        [HttpDelete("borrarUsuario/{id}")]
        public async Task<bool> BorrarUsuario(int id)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<bool?> salida = new OutputParameter<bool?>();
            await this.context.Procedures.AdminBorrarUsuarioAsync(idUsuario, id, salida);
            return salida.Value ?? false;
        }

        [HttpPost("usuarioAddNodo")]
        public async Task<bool> UsuarioAddNodo([FromBody] PeticionUsuarioNodo req)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<bool?> salida = new OutputParameter<bool?>();
            await this.context.Procedures.AdminUsuarioAddNodoAsync(idUsuario, req.IdUsuario, req.IdNodo, salida);
            return salida.Value ?? false;
        }

        [HttpDelete("usuarioEliminarNodo/{id}/{idNodo}")]
        public async Task<bool> UsuarioEliminarNodo(int id, int idNodo)
        {
            int idUsuario = User.IdUsuario();
            OutputParameter<bool?> salida = new OutputParameter<bool?>();
            await this.context.Procedures.AdminUsuarioEliminarNodoAsync(idUsuario, id, idNodo, salida);
            return salida.Value ?? false;
        }

    }

    public record PeticionNuevoNodo(int? IdNodo, string Descripcion);   
    public record PeticionGuardarUsuario(int? IdUsuario, string Login, string Nombre, int IdRol);
    public record PeticionUsuarioNodo(int IdUsuario, int IdNodo);
}
