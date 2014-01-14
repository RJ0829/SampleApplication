CREATE TABLE [mp].[TestSynonyms] (
    [SynonymId]     INT          IDENTITY (1, 1) NOT NULL,
    [TestID]        INT          NOT NULL,
    [PrimaryCode]   VARCHAR (20) NULL,
    [Code]          VARCHAR (20) NULL,
    [AlternateName] VARCHAR (20) NOT NULL,
    [CreatedDate]   DATETIME     NOT NULL,
    [CreatedUserId] INT          NULL,
    [DeletedDate]   DATETIME     NULL,
    [DeletedUserId] INT          NULL,
    [IsDeleted]     BIT          NULL,
    CONSTRAINT [PK_TestSynonyms] PRIMARY KEY CLUSTERED ([SynonymId] ASC),
    CONSTRAINT [FK_TestSynonyms_Tests] FOREIGN KEY ([PrimaryCode]) REFERENCES [mp].[Test] ([TestCode])
);





