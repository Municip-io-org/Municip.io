using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Municip.io.Server.Migrations
{
    /// <inheritdoc />
    public partial class nova : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostalCode",
                table: "Citizens",
                newName: "postalCode2");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Citizens",
                newName: "postalCode1");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Citizens",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Citizens",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "firstName",
                table: "Citizens",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Citizens");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Citizens");

            migrationBuilder.DropColumn(
                name: "firstName",
                table: "Citizens");

            migrationBuilder.RenameColumn(
                name: "postalCode2",
                table: "Citizens",
                newName: "PostalCode");

            migrationBuilder.RenameColumn(
                name: "postalCode1",
                table: "Citizens",
                newName: "Name");
        }
    }
}
