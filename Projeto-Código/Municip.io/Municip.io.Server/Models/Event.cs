using System.ComponentModel.DataAnnotations;

namespace Municip.io.Server.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }

        [Range(1, int.MaxValue)]
        public int Capacity { get; set; }

        public int NRegistrations { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime StartRegistration { get; set; }

        public DateTime EndRegistration { get; set; }

        public string Local { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public string Municipality { get; set; }
        


        // Navigation Properties

        
        public List<Citizen> Citizens { get; set; }


        public bool IncrementRegistrations(){
            if (NRegistrations < Capacity)
            {
                NRegistrations++;
                return true; 
            }
            else
            {
                return false; 
            }
        }
        public bool DecrementRegistrations(){
            if (NRegistrations > 0)
            {
                NRegistrations--;
                return true; 
            }
            else
            {
                return false; 
            }
        }
    }
}
