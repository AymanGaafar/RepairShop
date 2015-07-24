namespace RepairShop.Controllers.OData
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
    using System.Web.Http.OData;
    using RepairShop.Models;

    public class JobWorkDoneController : ODataController
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

        private bool JobWorkDoneExists(Guid jobId, Guid workDoneId)
        {
            return db.JobWorkDone.Count(e => e.JobId == jobId && e.WorkDoneId == workDoneId) > 0;
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

        // DELETE: odata/JobWorkDone(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid jobId, [FromODataUri] Guid workDoneId)
        {
            JobWorkDone jobWorkDone = await db.JobWorkDone.FindAsync(new object[] { jobId, workDoneId });
            if (jobWorkDone == null)
            {
                return NotFound();
            }

            db.JobWorkDone.Remove(jobWorkDone);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/JobWorkDone(5)/Job
        [EnableQuery]
        public SingleResult<Job> GetJob([FromODataUri] Guid jobId, [FromODataUri] Guid workDoneId)
        {
            return SingleResult.Create(db.JobWorkDone
                .Where(m => m.JobId == jobId && m.WorkDoneId == workDoneId)
                .Select(m => m.Job));
        }

        // GET: odata/JobWorkDone
        [EnableQuery]
        public IQueryable<JobWorkDone> GetJobWorkDone()
        {
            return db.JobWorkDone;
        }

        // GET: odata/JobWorkDone(5)
        [EnableQuery]
        public SingleResult<JobWorkDone> GetJobWorkDone([FromODataUri] Guid jobId, [FromODataUri] Guid workDoneId)
        {
            return SingleResult.Create(db.JobWorkDone
                .Where(m => m.JobId == jobId && m.WorkDoneId == workDoneId));
        }

        // GET: odata/JobWorkDone(5)/WorkDone
        [EnableQuery]
        public SingleResult<WorkDone> GetWorkDone([FromODataUri] Guid jobId, [FromODataUri] Guid workDoneId)
        {
            return SingleResult.Create(db.JobWorkDone
                .Where(m => m.JobId == jobId && m.WorkDoneId == workDoneId)
                .Select(m => m.WorkDone));
        }

        // PATCH: odata/JobWorkDone(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid jobId, [FromODataUri] Guid workDoneId, Delta<JobWorkDone> patch)
        {
            JobWorkDone jobWorkDone = await db.JobWorkDone.FindAsync(new object[] { jobId, workDoneId });
            if (jobWorkDone == null)
            {
                return NotFound();
            }

            patch.GetEntity().JobId = jobId;
            patch.GetEntity().WorkDoneId = workDoneId;
            patch.Patch(jobWorkDone);

            Validate(patch.GetEntity());

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
                if (!JobWorkDoneExists(jobId, workDoneId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(jobWorkDone);
        }

        // POST: odata/JobWorkDone
        public async Task<IHttpActionResult> Post(JobWorkDone jobWorkDone)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.JobWorkDone.Add(jobWorkDone);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (JobWorkDoneExists(jobWorkDone.JobId, jobWorkDone.WorkDoneId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(jobWorkDone);
        }

        #endregion
    }
}
