using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Municip.io.Server.Migrations
{
    /// <inheritdoc />
    public partial class maisssh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "birthDate",
                table: "Citizens",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "birthDate",
                table: "Citizens");
        }
    }
}
