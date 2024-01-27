
using Microsoft.AspNetCore.Identity;

namespace ESTEvents.Data
{
    public static class DataSeeder
    {


        public static async Task SeedData(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            await SeedRoles(roleManager);
            await SeedAdminUser(userManager);
        }

        private static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            string[] roleNames = { "Citizen", "Municipal", "Admin" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }

        private static async Task SeedAdminUser(UserManager<IdentityUser> userManager)
        {
            if (await userManager.FindByEmailAsync("admin@ips.pt") == null)
            {
                var user = new IdentityUser
                {
                    UserName = "admin@ips.pt",
                    Email = "admin@ips.pt",
                };

                var result = await userManager.CreateAsync(user, "Password-123");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }
}
