﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace EspacioCliente.Data.Models;

public partial class Nodo
{
    public int Id { get; set; }

    public int? IdNodoPadre { get; set; }

    public int? IdTipoNodo { get; set; }

    public string Descripcion { get; set; }

    public string Latitud { get; set; }

    public string Longitud { get; set; }

    public virtual Nodo IdNodoPadreNavigation { get; set; }

    public virtual TipoNodo IdTipoNodoNavigation { get; set; }

    public virtual ICollection<Incidencia> Incidencia { get; set; } = new List<Incidencia>();

    public virtual ICollection<Nodo> InverseIdNodoPadreNavigation { get; set; } = new List<Nodo>();

    public virtual ICollection<Plan> Plan { get; set; } = new List<Plan>();

    public virtual ICollection<UsuarioNodo> UsuarioNodo { get; set; } = new List<UsuarioNodo>();
}