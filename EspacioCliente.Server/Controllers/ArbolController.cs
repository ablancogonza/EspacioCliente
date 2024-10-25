using EspacioCliente.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EspacioCliente.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArbolController : ControllerBase
    {
        private readonly EspacioClienteContext context;

        public ArbolController(Data.Models.EspacioClienteContext context)
        {
            this.context = context;
        }

        [HttpGet("raizArbol")]
        public string? RaizArbol()
        {
            // Recuperar usuario del contexto
            return context.Database.SqlQuery<string>($"SELECT [dbo].[ArbolRaiz](1) as value").FirstOrDefault();            
        }

        [HttpGet("nodosArbol")]
        public string? NodosArbol(int id)
        {
            // Recuperar usuario del contexto
            return context.Database.SqlQuery<string>($"SELECT [dbo].[ArbolNodos](1, {id}) as value").FirstOrDefault();
        }
    }
}
