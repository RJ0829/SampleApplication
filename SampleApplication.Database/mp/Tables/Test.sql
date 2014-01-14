CREATE TABLE [mp].[Test] (
    [TestID]              INT            IDENTITY (1, 1) NOT NULL,
    [DomainID]            INT            NOT NULL,
    [TestCategoryID]      INT            NOT NULL,
    [TestCode]            VARCHAR (20)   NOT NULL,
    [Description]         VARCHAR (255)  NULL,
    [GuideVersion]        VARCHAR (10)   NULL,
    [HelpText]            VARCHAR (255)  NULL,
    [HelpImage]           VARCHAR (500)  NULL,
    [EstimatedDuration]   DECIMAL (4, 2) NULL,
    [Laboratory]          VARCHAR (10)   NULL,
    [ReferenceLaboratory] VARCHAR (10)   NULL,
    [CreatedDate]         DATETIME       NOT NULL,
    [CreatedUserId]       INT            NULL,
    [LastUpdate]          DATETIME       NULL,
    [LastUpdateUser]      INT            NULL,
    [IsDeleted]           BIT            NULL,
    [DeletedDate]         DATETIME       NULL,
    [DeletedUserId]       INT            NULL,
    CONSTRAINT [PK_Test] PRIMARY KEY CLUSTERED ([TestID] ASC)
);






GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Test]
    ON [mp].[Test]([TestCode] ASC);

