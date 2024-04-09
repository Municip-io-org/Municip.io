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

        //date limite to reservation finish
        public DateTime? ReservationLimitDate { get; set; }

        //borrow date
        public DateTime? BorrowedDate { get; set; }

        // the date when the book is to be returned
        public DateTime? ReturnDate { get; set; }

        // the date that the book was delivered to the library
        public DateTime? DeliveredDate { get; set; }

        public string Municipality { get; set; }

        public BookRequestStatus Status { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || GetType() != obj.GetType())
            {
                return false;
            }

            BookRequest other = (BookRequest)obj;

            // Compare os atributos relevantes para determinar a igualdade
            return Id == other.Id &&
                   Citizen.Equals(other.Citizen) &&
                   Book.Equals(other.Book) &&
                   NullableEquals(ReservedDate, other.ReservedDate) &&
                   NullableEquals(ReservationLimitDate, other.ReservationLimitDate) &&
                   NullableEquals(BorrowedDate, other.BorrowedDate) &&
                   NullableEquals(ReturnDate, other.ReturnDate) &&
                   NullableEquals(DeliveredDate, other.DeliveredDate) &&
                   Municipality == other.Municipality &&
                   Status == other.Status;
        }

        private bool NullableEquals<T>(T? x, T? y) where T : struct
        {
            // Função de comparação para tipos nullable
            return x.GetValueOrDefault().Equals(y.GetValueOrDefault());
        }
    }
}
