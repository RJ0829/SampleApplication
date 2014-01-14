using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;
using SampleApplication.DataAccess.Models;
using SampleApplication.Models;

namespace SampleApplication.DataAccess.Repositories
{
	public class EquipmentRepository : IEquipmentRepository
	{
		private Entities dbContext;

		public EquipmentRepository()
		{
			dbContext = new Entities();

		}

		public Models.Equipment GetById(int id)
		{
			throw new NotImplementedException();
		}

		public IEnumerable<Models.Equipment> GetByName(string Name)
		{
			return dbContext.Equipments.Where(x => x.DomainID == 1 && (x.Descriptor.ToLower().Contains(Name.ToLower()))).OrderBy(x => x.Descriptor).ToList();
		}

		public IEnumerable<Models.Equipment> GetAll()
		{
			return dbContext.Equipments.Where(x => x.IsDeleted == false && x.DomainID == 1).ToList();
		}

		public IQueryable<Models.Equipment> Query(Expression<Func<Models.Equipment, bool>> filter)
		{
			return dbContext.Equipments.Where(filter);
		}

		public Models.Equipment Insert(Models.Equipment entity)
		{
            throw new NotImplementedException();
		}

		public Models.Equipment Update(Models.Equipment entity)
		{
            throw new NotImplementedException();
		}
        
		public void Delete(Models.Equipment entity)
		{
            throw new NotImplementedException();
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
