using Stripe;

namespace Municip.io.Server.Models
{
    public class BookRequest
    {
        public int Id { get; set; }

        public Citizen Citizen { get; set; }

        public Book Book { get; set; }

        // the date when the book was reserved and possibly borrowed
        public DateTime? ReservedDate { get; set; }

        //borrow date
        public DateTime? BorrowedDate { get; set; }

        // the date when the book is to be returned
        public DateTime? ReturnDate { get; set; }

        // the date that the book was delivered to the library
        public DateTime? DeliveredDate { get; set; }

        public string Municipality { get; set; }

        public BookRequestStatus Status { get; set; }


    }
}
