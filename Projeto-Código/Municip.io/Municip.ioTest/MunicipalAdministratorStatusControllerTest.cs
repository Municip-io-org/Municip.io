using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Municip.io.Server.Controllers;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
using Xunit;

namespace Municip.ioTest
{
public class MunicipalAdministratorStatusControllerTest
    {
        private readonly ApplicationDbContext _context;
        private readonly MunicipalAdministratorStatusController _controller;
        private readonly UserManager<IdentityUser> _userManager;

        public MunicipalAdministratorStatusControllerTest()
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

      
            _controller = new MunicipalAdministratorStatusController(_context, _userManagerMock.Object);
        }

        private void SeedDatabase()
        {
            _context.MunicipalAdministrators.AddRange(new[]
            {
                new MunicipalAdministrator("Test1", "Test1", "test1@email.com","Montijo"){status = MunicipalAdministratorStatus.Pending},
                new MunicipalAdministrator("Test2", "Test2", "test2@email.com","Alcochete"){status = MunicipalAdministratorStatus.Pending},
                new MunicipalAdministrator("Test3", "Test3", "test3@email.com","Setúbal"){status = MunicipalAdministratorStatus.Approved},
                new MunicipalAdministrator("Test4", "Test4", "test4@email.com","Setúbal"){status = MunicipalAdministratorStatus.Blocked},

            });
            _context.SaveChanges();
        }

        //test getMunicipalAdministrators
        [Fact]
        public void Test_GetMunicipalAdministrators()
        {
            var result = _controller.getMunicipalAdministrators("Montijo");
            Assert.NotNull(result);
            var okResult = Assert.IsType<JsonResult>(result);
            var municipalAdministrators = Assert.IsAssignableFrom<List<MunicipalAdministrator>>(okResult.Value);
            Assert.Equal(1, municipalAdministrators.Count);
        }

        //test approve municipal administrator
        [Fact]
        public async Task Test_ApproveMunicipalAdministrator()
        {
            var email = "test1@email.com";
            var result = await _controller.approveMunicipalAdministrator(email);
            Assert.NotNull(result);
            var okResult = Assert.IsType<JsonResult>(result);
            var municipalAdministrators = Assert.IsAssignableFrom<List<MunicipalAdministrator>>(okResult.Value);
            Assert.Contains(municipalAdministrators, m => m.Email == email && m.status == MunicipalAdministratorStatus.Approved);

        }


        [Fact]
        public async Task Test_DeleteMunicipalAdministrator()
        {
            var email = "test2@email.com";
            var result = await _controller.deleteMunicipalAdministrator(email);
            Assert.NotNull(result);
            var okResult = Assert.IsType<JsonResult>(result);
            var municipalAdministrators = Assert.IsAssignableFrom<List<MunicipalAdministrator>>(okResult.Value);
            Assert.DoesNotContain(municipalAdministrators, m => m.Email == email);

        }


        [Fact]
        public async Task Test_BlockMunicipalAdministrator()
        {
            var email = "test3@email.com";
            var result = await _controller.blockMunicipalAdministrator(email);
            Assert.NotNull(result);
            var okResult = Assert.IsType<JsonResult>(result);
            var municipalAdministrators = Assert.IsAssignableFrom<List<MunicipalAdministrator>>(okResult.Value);
            Assert.Contains(municipalAdministrators, m => m.Email == email && m.status == MunicipalAdministratorStatus.Blocked);
        }
    }
}


