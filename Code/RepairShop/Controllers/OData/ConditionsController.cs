namespace RepairShop.Controllers
{
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
    using RepairShop.Models;
    using System.Web.Http.OData;
    //using System.Web.OData;

    public class ConditionsController : ODataController
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

        private bool ConditionExists(Guid key)
        {
            return db.Conditions.Any(e => e.ConditionId == key);
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

        // DELETE: odata/Conditions(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Condition condition = await db.Conditions.FindAsync(key);
            if (condition == null)
            {
                return NotFound();
            }

            db.Conditions.Remove(condition);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Conditions
        [EnableQuery(PageSize = 20)]
        public IQueryable<Condition> GetConditions()
        {
            return db.Conditions;
        }

        // GET: odata/Conditions(5)
        [EnableQuery]
        public SingleResult<Condition> GetCondition([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Conditions.Where(condition => condition.ConditionId == key));
        }

        // GET: odata/Conditions(5)/Jobs
        [EnableQuery]
        public IQueryable<Job> GetJobs([FromODataUri] Guid key)
        {
            return db.Conditions.Where(m => m.ConditionId == key).SelectMany(m => m.Jobs);
        }

        // PATCH: odata/Conditions(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<Condition> patch)
        {
            Condition condition = await db.Conditions.FindAsync(key);
            if (condition == null)
            {
                return NotFound();
            }

            patch.GetEntity().ConditionId = key;
            patch.Patch(condition);

            Validate(condition);

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
                if (!ConditionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(condition);
        }

        // POST: odata/Conditions
        public async Task<IHttpActionResult> Post(Condition condition)
        {
            condition.ConditionId = Guid.NewGuid();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Conditions.Add(condition);
            await db.SaveChangesAsync();

            return Created(condition);
        }

        #endregion
    }
}
