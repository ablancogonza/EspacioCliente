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
    public partial interface IEspacioClienteContextProcedures
    {
        Task<int> AdminBorrarNodosAsync(int? idUsuario, int? idNodo, OutputParameter<bool?> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> AdminBorrarUsuarioAsync(int? idUsuario, int? id, OutputParameter<bool?> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> AdminEditarNodoAsync(int? idUsuario, int? idNodo, string descripcion, OutputParameter<bool?> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> AdminGuardarUsuarioAsync(int? idUsuario, int? id, string nombre, string login, int? idRol, OutputParameter<bool?> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> AdminNuevoNodoAsync(int? idUsuario, int? idNodo, string descripcion, OutputParameter<bool?> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> AdminUsuarioAddNodoAsync(int? idUsuario, int? id, int? idNodo, OutputParameter<bool?> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> AdminUsuarioEliminarNodoAsync(int? idUsuario, int? id, int? idNodo, OutputParameter<bool?> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> BriefingCrearAsync(int? idNodo, string descrip, decimal? presupuesto, DateOnly? inicio, DateOnly? fin, int? medio, int? usuarioCreador, OutputParameter<string> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> BriefingSubirAdjuntoAsync(int? idUsuario, int? idBriefing, string descripcion, byte[] contenido, string extension, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> IncidenciasConversacionCrearEntradaAsync(int? idUsuario, int? idIncidencia, string texto, byte[] imagen, OutputParameter<string> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> IncidenciasCrearAsync(int? idUsuario, int? idNodo, string titulo, OutputParameter<string> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> IncidenciasFinalizarAsync(int? idUsuario, int? idIncidencia, int? idNodo, OutputParameter<string> salida, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
        Task<int> IncidenciasMarcarLeidoAsync(int? idUsuario, int? idIncidencia, int? ultimoLeido, OutputParameter<int> returnValue = null, CancellationToken cancellationToken = default);
    }
}
