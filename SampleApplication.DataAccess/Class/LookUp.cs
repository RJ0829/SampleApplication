using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;
using SampleApplication.DataAccess.Models;

namespace SampleApplication.DataAccess.Repositories
{
    /// <summary>
    /// 
    /// </summary>
    public class LookUpRepository : ILookUpRepository
    {
        private Entities dbContext;

        public LookUpRepository()
        {
            dbContext = new Entities();
        }

        public Models.LookUp GetById(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Models.LookUp> GetAll()
        {
            return dbContext.LookUps.ToList();
            
        }

        public IQueryable<Models.LookUp> Query(Expression<Func<Models.LookUp, bool>> filter)
        {
            return dbContext.LookUps.Where(filter);
        }

        /// <summary>
        /// Insert new look up
        /// </summary>
        /// <param name="entity">look up data entity</param>
        /// <returns></returns>
        public Models.LookUp Insert(Models.LookUp entity)
        {
            dbContext.LookUps.Add(entity);
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// update look up
        /// </summary>
        /// <param name="entity">look up data entity</param>
        /// <returns></returns>
        public Models.LookUp Update(Models.LookUp entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Modified;
            dbContext.SaveChanges();
            return entity;
        }

        /// <summary>
        /// delete look up
        /// </summary>
        /// <param name="entity">look up data entity</param>
        /// <returns></returns>
        public void Delete(Models.LookUp entity)
        {
            dbContext.Entry(entity).State = System.Data.EntityState.Deleted;
            dbContext.SaveChanges();
        }

        public void Dispose()
        {
            if (dbContext != null)
            {
                dbContext.Dispose();
            }
        }
    }
}
