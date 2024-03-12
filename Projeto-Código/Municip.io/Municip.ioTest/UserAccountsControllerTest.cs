using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Municip.io.Server.Controllers;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Municip.ioTest
{

    namespace Municip.ioTest
    {
        public class AccountUserControllerTest
        {
            private readonly ApplicationDbContext _context;
            private readonly AccountUserController _controller;
            private readonly UserManager<IdentityUser> _userManager;

            public AccountUserControllerTest()
            {

                var serviceProvider = new ServiceCollection()
                    .AddEntityFrameworkInMemoryDatabase()
                    .BuildServiceProvider();

                var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                    .UseInMemoryDatabase(Guid.NewGuid().ToString())
                    .UseInternalServiceProvider(serviceProvider)
                    .Options;

                _context = new ApplicationDbContext(options);

                var _userManagerMock = new Mock<UserManager<IdentityUser>>(
                    Mock.Of<IUserStore<IdentityUser>>(), null, null, null, null, null, null, null, null);

                SeedDatabase();


                _controller = new AccountUserController(_userManager, _context);
            }

            private void SeedDatabase()
            {
                //    _context.Citizens.AddRange(new[]
                //    {
                //});
                _context.SaveChanges();
            }



            [Fact]
            public void Test_CitizenWithForeignNif()
            {
                var cit = new Citizen { Nif = "ES123456789", firstName = "Test1", Surname = "Test1", Email = "test1@email.com", birthDate = new DateTime(10), status = CitizenStatus.Pending, Address = "adasd" };

                var result = _controller.RegisterCitizen(cit);

                Assert.NotNull(result);

                Assert.NotNull(_context.Citizens.FirstOrDefaultAsync(c => c.Nif == "ES123456789"));
            }


            //test if sends email in register
            [Fact]
            public void Test_SendEmail()
            {
                var cit = new Citizen { Nif = "ES123456789", firstName = "Test1", Surname = "Test1", Email = "test1@email.com", birthDate = new DateTime(10), status = CitizenStatus.Pending, Address = "adasd" };

                //test sendRegister function
                var result = _controller.SendRegister(cit.Email, cit.firstName);
                
                Assert.NotNull(result);
                Assert.Equal("Success", (result as OkObjectResult).Value);

            }

        }

    }
}
