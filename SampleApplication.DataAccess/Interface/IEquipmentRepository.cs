using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SampleApplication.DataAccess.Models;

namespace SampleApplication.DataAccess.Repositories
{
	public interface IEquipmentRepository : IRepository<Equipment>, IDisposable
	{
        IEnumerable<Models.Equipment> GetByName(string Name);
	}
}
