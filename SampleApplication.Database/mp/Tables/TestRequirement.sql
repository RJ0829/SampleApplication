CREATE TABLE [mp].[TestRequirement] (
    [RequirementId]          INT           IDENTITY (1, 1) NOT NULL,
    [TestID]                 INT           NOT NULL,
    [RequirementType]        VARCHAR (10)  NOT NULL,
    [StandardRequirement]    VARCHAR (10)  NOT NULL,
    [RequirementDescription] VARCHAR (255) NULL,
    CONSTRAINT [TestRequirement_PK] PRIMARY KEY CLUSTERED ([RequirementId] ASC),
    CONSTRAINT [Test_TestRequirement_FK1] FOREIGN KEY ([TestID]) REFERENCES [mp].[Test] ([TestID])
);



