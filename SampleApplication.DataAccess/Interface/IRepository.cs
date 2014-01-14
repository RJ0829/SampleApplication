using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace SampleApplication.DataAccess.Repositories
{
    public interface IRepository<T>
    {
        T GetById(int id);
        IEnumerable<T> GetAll();
        IQueryable<T> Query(Expression<Func<T, bool>> filter);
        T Insert(T entity);
        T Update(T entity);
        void Delete(T entity);
    }
}
