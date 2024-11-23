﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EspacioCliente.Data.Models;

public partial class EspacioClienteContext : DbContext
{
    public EspacioClienteContext(DbContextOptions<EspacioClienteContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Log> Log { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    public virtual DbSet<UsuarioNodo> UsuarioNodo { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Latin1_General_CI_AI");

        modelBuilder.Entity<Log>(entity =>
        {
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Texto).IsRequired();
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.Property(e => e.Login)
                .IsRequired()
                .HasMaxLength(50);
            entity.Property(e => e.Nombre)
                .IsRequired()
                .HasMaxLength(70);
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(250);
        });

        modelBuilder.Entity<UsuarioNodo>(entity =>
        {
            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.UsuarioNodo)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UsuarioNodo_Usuario");
        });

        OnModelCreatingGeneratedFunctions(modelBuilder);
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}