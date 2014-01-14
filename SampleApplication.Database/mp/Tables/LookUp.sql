CREATE TABLE [mp].[LookUp] (
    [GroupID]           INT           NOT NULL,
    [TableName]         VARCHAR (50)  NOT NULL,
    [FieldName]         VARCHAR (50)  NOT NULL,
    [ValueCode]         VARCHAR (10)  NOT NULL,
    [DisplayOrder]      TINYINT       NULL,
    [ValueDescription]  VARCHAR (100) NULL,
    [OwnerFieldName]    VARCHAR (50)  NULL,
    [OwnerValue]        VARCHAR (10)  NULL,
    [DefaultValue]      BIT           NULL,
    [SystemRequired]    BIT           NULL,
    [Aliased]           BIT           NULL,
    [ValueForAction]    VARCHAR (255) NULL,
    [RecordLastUpdated] ROWVERSION    NOT NULL,
    CONSTRAINT [tblLookUp_PK] PRIMARY KEY CLUSTERED ([TableName] ASC, [FieldName] ASC, [ValueCode] ASC, [GroupID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [OwnerKey]
    ON [mp].[LookUp]([TableName] ASC, [OwnerFieldName] ASC, [OwnerValue] ASC);


GO
CREATE NONCLUSTERED INDEX [Order]
    ON [mp].[LookUp]([TableName] ASC, [FieldName] ASC, [DisplayOrder] ASC);

