﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using EspacioCliente.Data.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace EspacioCliente.Data.Models
{
    public partial class EspacioClienteContext
    {
        private IEspacioClienteContextProcedures _procedures;

        public virtual IEspacioClienteContextProcedures Procedures
        {
            get
            {
                if (_procedures is null) _procedures = new EspacioClienteContextProcedures(this);
                return _procedures;
            }
            set
            {
                _procedures = value;
            }
        }

        public IEspacioClienteContextProcedures GetProcedures()
        {
            return Procedures;
        }
    }

    public partial class EspacioClienteContextProcedures : IEspacioClienteContextProcedures
    {
        private readonly EspacioClienteContext _context;

        public EspacioClienteContextProcedures(EspacioClienteContext context)
        {
            _context = context;
        }

        public virtual async Task<int> IncidenciasConversacionCrearEntradaAsync(int? idUsuario, int? idIncidencia, string texto, byte[] imagen, OutputParameter<string> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default)
        {
            var parametersalida = new SqlParameter
            {
                ParameterName = "salida",
                Size = -1,
                Direction = System.Data.ParameterDirection.InputOutput,
                Value = salida?._value ?? Convert.DBNull,
                SqlDbType = System.Data.SqlDbType.NVarChar,
            };
            var parameterreturnValue = new SqlParameter
            {
                ParameterName = "returnValue",
                Direction = System.Data.ParameterDirection.Output,
                SqlDbType = System.Data.SqlDbType.Int,
            };

            var sqlParameters = new []
            {
                new SqlParameter
                {
                    ParameterName = "idUsuario",
                    Value = idUsuario ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.Int,
                },
                new SqlParameter
                {
                    ParameterName = "idIncidencia",
                    Value = idIncidencia ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.Int,
                },
                new SqlParameter
                {
                    ParameterName = "texto",
                    Size = 160,
                    Value = texto ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.NVarChar,
                },
                new SqlParameter
                {
                    ParameterName = "imagen",
                    Size = -1,
                    Value = imagen ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.VarBinary,
                },
                parametersalida,
                parameterreturnValue,
            };
            var _ = await _context.Database.ExecuteSqlRawAsync("EXEC @returnValue = [dbo].[IncidenciasConversacionCrearEntrada] @idUsuario = @idUsuario, @idIncidencia = @idIncidencia, @texto = @texto, @imagen = @imagen, @salida = @salida OUTPUT", sqlParameters, cancellationToken);

            salida.SetValue(parametersalida.Value);
            returnValue?.SetValue(parameterreturnValue.Value);

            return _;
        }

        public virtual async Task<int> IncidenciasCrearAsync(int? idUsuario, int? idNodo, string titulo, OutputParameter<string> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default)
        {
            var parametersalida = new SqlParameter
            {
                ParameterName = "salida",
                Size = -1,
                Direction = System.Data.ParameterDirection.InputOutput,
                Value = salida?._value ?? Convert.DBNull,
                SqlDbType = System.Data.SqlDbType.NVarChar,
            };
            var parameterreturnValue = new SqlParameter
            {
                ParameterName = "returnValue",
                Direction = System.Data.ParameterDirection.Output,
                SqlDbType = System.Data.SqlDbType.Int,
            };

            var sqlParameters = new []
            {
                new SqlParameter
                {
                    ParameterName = "idUsuario",
                    Value = idUsuario ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.Int,
                },
                new SqlParameter
                {
                    ParameterName = "idNodo",
                    Value = idNodo ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.Int,
                },
                new SqlParameter
                {
                    ParameterName = "titulo",
                    Size = 160,
                    Value = titulo ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.NVarChar,
                },
                parametersalida,
                parameterreturnValue,
            };
            var _ = await _context.Database.ExecuteSqlRawAsync("EXEC @returnValue = [dbo].[IncidenciasCrear] @idUsuario = @idUsuario, @idNodo = @idNodo, @titulo = @titulo, @salida = @salida OUTPUT", sqlParameters, cancellationToken);

            salida.SetValue(parametersalida.Value);
            returnValue?.SetValue(parameterreturnValue.Value);

            return _;
        }

        public virtual async Task<int> IncidenciasFinalizarAsync(int? idUsuario, int? idIncidencia, int? idNodo, OutputParameter<string> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default)
        {
            var parametersalida = new SqlParameter
            {
                ParameterName = "salida",
                Size = -1,
                Direction = System.Data.ParameterDirection.InputOutput,
                Value = salida?._value ?? Convert.DBNull,
                SqlDbType = System.Data.SqlDbType.NVarChar,
            };
            var parameterreturnValue = new SqlParameter
            {
                ParameterName = "returnValue",
                Direction = System.Data.ParameterDirection.Output,
                SqlDbType = System.Data.SqlDbType.Int,
            };

            var sqlParameters = new []
            {
                new SqlParameter
                {
                    ParameterName = "idUsuario",
                    Value = idUsuario ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.Int,
                },
                new SqlParameter
                {
                    ParameterName = "idIncidencia",
                    Value = idIncidencia ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.Int,
                },
                new SqlParameter
                {
                    ParameterName = "idNodo",
                    Value = idNodo ?? Convert.DBNull,
                    SqlDbType = System.Data.SqlDbType.Int,
                },
                parametersalida,
                parameterreturnValue,
            };
            var _ = await _context.Database.ExecuteSqlRawAsync("EXEC @returnValue = [dbo].[IncidenciasFinalizar] @idUsuario = @idUsuario, @idIncidencia = @idIncidencia, @idNodo = @idNodo, @salida = @salida OUTPUT", sqlParameters, cancellationToken);

            salida.SetValue(parametersalida.Value);
            returnValue?.SetValue(parameterreturnValue.Value);

            return _;
        }
    }
}
