using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AddressBook.Models;

namespace AddressBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly AddressBookContext _context;

        public ContactsController(AddressBookContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Contacts>> Get()
        {
            return await _context.Contacts.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Contacts contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{contactId}")]
        public async Task<IActionResult> Put(long contactId, [FromBody] Contacts contact)
        {
            _context.Contacts.Update(contact);

            contact.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();
            
            return Ok();
        }

        [HttpDelete("{contactId}")]
        public async Task<ActionResult<Contacts>> Delete(long contactId)
        {
            var contact = await _context.Contacts.FindAsync(contactId);
            
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("{searchContacts}")]
        public IEnumerable<Contacts> searchContacts(string searchFirstName, string searchSurname, string searchTel)
        {
            IEnumerable<Contacts> contacts = _context.Contacts;
            if (!string.IsNullOrEmpty(searchFirstName) && (searchFirstName != "null"))
            {
                contacts = contacts.Where(c => c.FirstName.ToLower().Contains(searchFirstName.ToLower()));
            }
            if (!string.IsNullOrEmpty(searchSurname) && (searchSurname != "null"))
            {
                contacts = contacts.Where(c => c.Surname.ToLower().Contains(searchSurname.ToLower()));
            }
            if (!string.IsNullOrEmpty(searchTel) && (searchTel != "null"))
            {
                contacts = contacts.Where(c => c.Tel.ToLower().Contains(searchTel.ToLower()));
            }

            return contacts;
        }
    }
}
