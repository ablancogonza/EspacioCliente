﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace EspacioCliente.Data.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; }

    public string Login { get; set; }

    public string Password { get; set; }

    public int IdRol { get; set; }

    public virtual ICollection<UsuarioNodo> UsuarioNodo { get; set; } = new List<UsuarioNodo>();
}