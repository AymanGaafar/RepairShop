namespace RepairShop.Controllers
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.Owin;
    using RepairShop.Components;
    using RepairShop.Models;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using System.Web.Http.ModelBinding;
    using System.Web.Http.OData;
    //using System.Web.OData;

    //[Authorize]
    public class UsersController : ODataController
    {
        #region Private Static Properties
        #endregion

        #region Public Static Properties
        #endregion

        #region Private Properties
        
        private RepairShopDbContext db = new RepairShopDbContext();

        #endregion

        #region Public Properties
        #endregion

        #region Constructors
        #endregion

        #region Private Methods

        private bool UserExists(string key)
        {
            return db.Users.Any(e => e.Id == key);
        }

        #endregion

        #region Protected Methods

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }

            base.Dispose(disposing);
        }

        #endregion

        #region Public Methods

        // DELETE: odata/Users(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] string key)
        {
            User user = await db.Users.Where(USR => USR.Id == key).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Users(5)
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] string key)
        {
            return SingleResult.Create(db.Users.Where(user => user.Id == key));
        }

        // GET: odata/Users
        [EnableQuery(PageSize=20)]
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // PATCH: odata/Users(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] string key, Delta<User> patch)
        {
            User user = await db.Users.Where(USR => USR.Id == key).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }

            patch.GetEntity().Id = key;
            patch.Patch(user);

            Validate(user);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(user);
        }

        // POST: odata/Users
        public async Task<IHttpActionResult> Post(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await Request.GetOwinContext().GetUserManager<ApplicationUserManager>()
                .CreateAsync(user, "Password!9");

            //db.Users.Add(user);
            //await db.SaveChangesAsync();

            return Created(user);
        }

        #endregion
    }
}
