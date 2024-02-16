using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Municip.io.Server.Controllers;
using Municip.io.Server.Data;
using Municip.io.Server.Models;
using Xunit;

namespace Municip.ioTest
{
    public class CitizenStatusControllerTest
    {
        private readonly ApplicationDbContext _context;
        private readonly CitizenStatusController _controller;
        private readonly UserManager<IdentityUser> _userManager;

        public CitizenStatusControllerTest()
        {
            // Setup DbContext
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .UseInternalServiceProvider(serviceProvider)
                .Options;

            _context = new ApplicationDbContext(options);

            // Setup UserManager with mock UserStore
            var _userManagerMock = new Mock<UserManager<IdentityUser>>(
      Mock.Of<IUserStore<IdentityUser>>(), null, null, null, null, null, null, null, null);

            SeedDatabase();

            // Instantiate the controller with the mocked dependencies
            _controller = new CitizenStatusController(_context, _userManagerMock.Object);
        }

        private void SeedDatabase()
        {
            // Populate the in-memory database with test data
            _context.Citizens.AddRange(new[]
     {
                new Citizen { Email = "test1@example.com", firstName = "Filipe", status = CitizenStatus.Pending,  Address = "123  avenida", Gender = "m",Municipality = " City",Nif = "123456789",Surname = "Fonseca",photo = "path/to/photo",postalCode1 = "1234",postalCode2 = "678" },
                new Citizen { Email = "test2@example.com", firstName = "Teresa", status = CitizenStatus.Blocked,  Address = "123 rua ",Gender = "f",Municipality = " City",Nif = "123456789",
    Surname = "Raquel",photo = "path/to/photo",
    postalCode1 = "1235",
    postalCode2 = "678" },
                new Citizen { Email = "test3@example.com", firstName = "Pedro", status = CitizenStatus.Approved,  Address = "123 avenida 456",
    Gender = "m",
    Municipality = " City",
    Nif = "123456789",
    Surname = "Moura",
    photo = "path/",
    postalCode1 = "1234",
    postalCode2 = "679" }
            });
            _context.SaveChanges();
        }


        [Fact]
        public async Task ApproveCitizen_When_CitizenExistsAndIsBlocked_ShouldApproveAndSendUnblockEmail()
        {
            // Arrange
            var email = "test2@example.com";

            // Act
            var result = await _controller.approveCitizen(email);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(3, _context.Citizens.Count());
            Assert.Equal(CitizenStatus.Approved, _context.Citizens.FirstOrDefault(c => c.Email == email)?.status);
        }

        [Fact]
        public async Task DeleteCitizen_When_CitizenExists_ShouldDeleteAndSendRemoveEmail()
        {
            // Arrange
            var email = "test1@example.com";

            // Act
            var result = await _controller.deleteCitizen(email);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, _context.Citizens.Count());
            Assert.Null(_context.Citizens.FirstOrDefault(c => c.Email == email));
        }
    }
}
