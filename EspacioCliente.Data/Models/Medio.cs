﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace EspacioCliente.Data.Models;

public partial class Medio
{
    public int Id { get; set; }

    public string Medio1 { get; set; }

    public virtual ICollection<Insercion> Insercion { get; set; } = new List<Insercion>();

    public virtual ICollection<Plan> Plan { get; set; } = new List<Plan>();
}