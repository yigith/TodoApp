using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApi.Migrations
{
    public partial class TodoUserFk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "TodoItems",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_TodoItems_OwnerId",
                table: "TodoItems",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_AspNetUsers_OwnerId",
                table: "TodoItems",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_AspNetUsers_OwnerId",
                table: "TodoItems");

            migrationBuilder.DropIndex(
                name: "IX_TodoItems_OwnerId",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "TodoItems");
        }
    }
}
