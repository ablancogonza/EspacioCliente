﻿using EspacioCliente.Data.Models;
using EspacioCliente.Server.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EspacioCliente.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InversionController : ControllerBase
    {
        private readonly EspacioClienteContext context;

        public InversionController(Data.Models.EspacioClienteContext context)
        {
            this.context = context;
        }

        [HttpGet("inversion")]
        public decimal Inversion(int id, int inicio, int fin)
        {
            int idUsuario = User.IdUsuario();
            return context.Database.SqlQuery<decimal>($"SELECT [dbo].[Inversion]({id},{inicio},{fin}) as value").FirstOrDefault();
        }
    }

    
}
