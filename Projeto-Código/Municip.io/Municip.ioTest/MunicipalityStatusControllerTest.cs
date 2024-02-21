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
    public class MunicipalityStatusControllerTest
    {
        private readonly ApplicationDbContext _context;
        private readonly MunicipalityStatusController _controller;
        private readonly UserManager<IdentityUser> _userManager;

        public MunicipalityStatusControllerTest()
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

      
            _controller = new MunicipalityStatusController(_context, _userManagerMock.Object);
        }

        private void SeedDatabase()
        {
            _context.Municipalities.AddRange(new[]
            {
                new Municipality { name = "Municipality1", email = "test1@example.com", status = MunicipalityStatus.Pending },
                new Municipality { name = "Municipality2", email = "test2@example.com", status = MunicipalityStatus.Blocked },
                new Municipality { name = "Municipality3", email = "test3@example.com", status = MunicipalityStatus.Approved },
                new Municipality { name = "Municipality4", email = "test4@example.com", status = MunicipalityStatus.Pending }
            });
            _context.SaveChanges();
        }

        [Fact]
        public Task Test_GetMunicipalities()
        {
            var result = _controller.getMunicipalities();
            Assert.NotNull(result);
            var okResult = Assert.IsType<JsonResult>(result);
            var municipalities = Assert.IsAssignableFrom<IQueryable<Municipality>>(okResult.Value);
            Assert.Equal(4, municipalities.Count());
            return Task.CompletedTask;
        }

        [Fact]
        public async Task Test_ApproveMunicipality()
        {

            var municipalityName = "Municipality1";

            var result = await _controller.approveMunicipality(municipalityName);

            Assert.NotNull(result);
            var okResult = Assert.IsType<JsonResult>(result);
            var municipalities = Assert.IsAssignableFrom<List<Municipality>>(okResult.Value);
            var approvedMunicipality = municipalities.FirstOrDefault(m => m.name == municipalityName);
            Assert.NotNull(approvedMunicipality);
            Assert.Equal(MunicipalityStatus.Approved, approvedMunicipality.status);
        }


        [Fact]
        public async Task Test_DeleteMunicipality()
        {
            var municipalityName = "Municipality1";
            var result = await _controller.deleteMunicipality(municipalityName);
            Assert.NotNull(result);
            var okResult = Assert.IsType<JsonResult>(result);
            var municipalities = Assert.IsAssignableFrom<List<Municipality>>(okResult.Value);
            Assert.DoesNotContain(municipalities, m => m.name == municipalityName);
        }



        [Fact]
        public void Test_PendingMunicipality()
        {
          
            var municipalityName = "Municipality1";
            var result = _controller.pendingMunicipality(municipalityName);
            Assert.NotNull(result);
            var okResult = Assert.IsType<OkResult>(result);
        }
    }
}
