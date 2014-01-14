using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;
using SampleApplication.DataAccess.Models;

namespace SampleApplication.DataAccess.Repositories
{
    public interface ITestRepository : IRepository<Test>, IDisposable
    {
        IEnumerable<TestSynonym> GetAllTestSynonyms();
        IQueryable<TestSynonym> QueryTestSynonyms(Expression<Func<TestSynonym, bool>> filter);

        Models.TestSynonym GetTestSynonymById(int id);
        IEnumerable<Models.TestSynonym> GetTestSynonymByTestId(int testId);
        IEnumerable<Models.TestSynonym> GetTestSynonymByTestCode(string testCode);
        Models.TestSynonym InsertTestSynonym(TestSynonym entity);
        Models.TestSynonym UpdateTestSynonym(TestSynonym entity);
        void DeleteTestSynonym(TestSynonym entity);

        Models.TestSample GetTestSampleById(int id);
        Models.TestSample AddTestSample(TestSample entity);
        Models.TestSample UpdateTestSample(TestSample entity);
        void DeleteTestSample(TestSample entity);

        IEnumerable<Models.SampleTransportCondition> GetTestSampleConditionBySampleId(int sampleId);
        Models.SampleTransportCondition GetTestSampleConditionById(int id);
        Models.SampleTransportCondition AddTestSampleCondition(SampleTransportCondition entity);
        Models.SampleTransportCondition UpdateTestSampleCondition(SampleTransportCondition entity);
        void DeleteTestSampleCondition(SampleTransportCondition entity);

        Models.TestRequirement GetTestRequirementById(int id);
        Models.TestRequirement AddTestRequirement(TestRequirement entity);
        Models.TestRequirement UpdateTestRequirement(TestRequirement entity);
        void DeleteTestRequirement(TestRequirement entity);

        Models.TestStep GetTestStepById(int id);
        Models.TestStep AddTestStep(TestStep entity);
        Models.TestStep UpdateTestStep(TestStep entity);
        void DeleteTestStep(TestStep entity);

        Models.TestTutorialStep GetTestTutorialStepById(int id);
        Models.TestTutorialStep AddTestTutorialStep(TestTutorialStep entity);
        Models.TestTutorialStep UpdateTestTutorialStep(TestTutorialStep entity);
        void DeleteTestTutorialStep(TestTutorialStep entity);
    }
}
