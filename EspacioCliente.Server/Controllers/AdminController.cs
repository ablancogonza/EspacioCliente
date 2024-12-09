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

        public AdminController(Data.Models.EspacioClienteContext context)
        {
            this.context = context;
        }

        [HttpGet("raicesArbol")]
        public string? RaicesArbol()
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[AdminArbolRaices]({idUsuario}) as value").FirstOrDefault();
        }

        [HttpGet("nodosArbol")]
        public string? NodosArbol(int id)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[AdminArbolNodos]({idUsuario}, {id}) as value").FirstOrDefault();
        }
    }
}
