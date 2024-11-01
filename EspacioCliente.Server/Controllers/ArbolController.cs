﻿using EspacioCliente.Data.Models;
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
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[ArbolRaiz]({idUsuario}) as value").FirstOrDefault();            
        }

        [HttpGet("nodosArbol")]
        public string? NodosArbol(int id)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[ArbolNodos]({idUsuario}, {id}) as value").FirstOrDefault();
        }

        [HttpGet("nodoFiltrado")]
        public string? NodoFiltrado(int id)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<string>($"SELECT [dbo].[ArbolFiltrado]({id}) as value").FirstOrDefault();
        }

        [HttpGet("eliminar")]
        public void Eliminar(int id)
        {
            int idUsuario = User.IdUsuario();
            try
            {
                string cmd = $"EXEC [dbo].[EliminarNodo] @idNodo = {id}";
                context.Database.ExecuteSql($"EXEC [dbo].[EliminarNodo] @idNodo = {id}"); // .SqlQuery<string>($"SELECT [dbo].[EliminarNodos]({id}) as value").FirstOrDefault();
            }
            catch (Exception e)
            {
                string ee = e.Message;
            }
        }

    }
}
