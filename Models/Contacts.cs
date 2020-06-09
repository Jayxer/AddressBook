using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace AddressBook.Models
{
    public class Contacts
    {
        [Key]
        public long? ContactId { get; set; }
        [DisallowNull]
        public string FirstName { get; set; }
        [DisallowNull]
        public string Surname { get; set; }
        [AllowNull]
        public string Tel { get; set; }
        [AllowNull]
        public string Cell { get; set; }
        [AllowNull]
        public string Email { get; set; }
        [AllowNull]
        public DateTime UpdatedDate { get; set; }
    }
}
