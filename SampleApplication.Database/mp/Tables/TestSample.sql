CREATE TABLE [mp].[TestSample] (
    [SampleId]           INT            IDENTITY (1, 1) NOT NULL,
    [TestID]             INT            NOT NULL,
    [EquipmentID]        INT            NOT NULL,
    [SmaplesRequired]    INT            NOT NULL,
    [SampleClassRule]    VARCHAR (10)   NULL,
    [Unit]               VARCHAR (10)   NULL,
    [MinimumQuantity]    NUMERIC (6, 2) NULL,
    [IdealQuantity]      NUMERIC (6, 2) NULL,
    [MicroQuantity]      NUMERIC (6, 2) NULL,
    [SampleType]         VARCHAR (10)   NULL,
    [AnalysisSampleType] VARCHAR (10)   NULL,
    CONSTRAINT [PK_TestEquipment] PRIMARY KEY CLUSTERED ([SampleId] ASC),
    CONSTRAINT [FK_TestEquipment_Test] FOREIGN KEY ([TestID]) REFERENCES [mp].[Test] ([TestID])
);



