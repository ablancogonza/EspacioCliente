﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace EspacioCliente.Data.Models;

public partial class Insercion
{
    public int Id { get; set; }

    public int IdPlan { get; set; }

    public int Medio { get; set; }

    public DateOnly Inicio { get; set; }

    public DateOnly Fin { get; set; }

    public decimal Inversion { get; set; }

    public int? IdValla { get; set; }

    public byte[] Imagen { get; set; }

    public virtual Plan IdPlanNavigation { get; set; }

    public virtual Valla IdVallaNavigation { get; set; }

    public virtual Medio MedioNavigation { get; set; }

    public virtual ICollection<Orden> Orden { get; set; } = new List<Orden>();
}