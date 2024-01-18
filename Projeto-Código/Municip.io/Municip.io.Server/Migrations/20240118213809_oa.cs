using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Municip.io.Server.Migrations
{
    /// <inheritdoc />
    public partial class oa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "areaha",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "codigo",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "codigoine",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "codigopostal",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "descrpostal",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "distrito",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "eleitores",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "fax",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "localidade",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "nif",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "nome",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "populacao",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "rua",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "sitio",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "telefone",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "areaha",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "codigo",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "codigoine",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "codigopostal",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "descrpostal",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "distrito",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "eleitores",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "email",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "fax",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "localidade",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "nif",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "nome",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "populacao",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "rua",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "sitio",
                table: "Municipalities");

            migrationBuilder.DropColumn(
                name: "telefone",
                table: "Municipalities");
        }
    }
}
