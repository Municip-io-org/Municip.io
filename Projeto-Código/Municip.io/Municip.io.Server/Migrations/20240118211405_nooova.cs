using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Municip.io.Server.Migrations
{
    /// <inheritdoc />
    public partial class nooova : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Municipalities",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "PostalCode",
                table: "Municipalities",
                newName: "president");

            migrationBuilder.RenameColumn(
                name: "District",
                table: "Municipalities",
                newName: "description");

            migrationBuilder.AddColumn<string>(
                name: "contact",
                table: "Municipalities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "contact",
                table: "Municipalities");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Municipalities",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "president",
                table: "Municipalities",
                newName: "PostalCode");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Municipalities",
                newName: "District");
        }
    }
}
