/*!
* Infragistics.Web.ClientUI data source localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.DataSourceLocale) {
	$.ig.DataSourceLocale = {};

	$.extend($.ig.DataSourceLocale, {

		locale: {
			invalidDataSource: "Подаденият източник на данни е невалиден.",
			unknownDataSource: "Типът на източника на данни не може да бъде определен. Моля дефинирайте дали данните са в JSON или XML формат.",
			errorParsingArrays: "Грешка при парсирането на масива от данни и при прилагането на дефинираната schema: ",
			errorParsingJson: "Грешка при парсирането на JSON обекта от данни и при прилагането на дефинираната schema: ",
			errorParsingXml: "Грешка при парсирането на XML обекта от данни и при прилагането на дефинираната schema: ",
			errorParsingHtmlTable: "Грешка при извличането на данни от HTML таблицата и при прилагането на дефинираната schema: ",
			errorExpectedTbodyParameter: "Очакваният параметър трябва да е от тип table или tbody.",
			errorTableWithIdNotFound: "Не е намерена HTML таблица с ID: ",
			errorParsingHtmlTableNoSchema: "Грешка при парсиране на табличния DOM: ",
			errorParsingJsonNoSchema: "Грешка при парсиране на JSON string: ",
			errorParsingXmlNoSchema: "Грешка при парсиране на XML string: ",
			errorXmlSourceWithoutSchema: "Подаденият източник на данни е XML документ, но няма дефинирана schema за данните ($.IgDataSchema).",
			errorUnrecognizedFilterCondition: "Неразпознато условие за филтриране: ",
			errorRemoteRequest: "Неуспешно завършено външно поискване на данни: ",
			errorSchemaMismatch: "Входните данни не отговарят на подадената schema; съответното поле не може да бъде попълнено успешно: ",
			errorSchemaFieldCountMismatch: "Входните данни не отговарят на подадената схема като брой полета. ",
			errorUnrecognizedResponseType: "Типът на доставените данни не е деклариран правилно или не е било възможно типът да бъде определен автоматично. Моля попълнете settings.responseDataType и/или settings.responseContentType.",
			hierarchicalTablesNotSupported: "Таблици не се поддържат от HierarchicalSchema",
			cannotBuildTemplate: "Шаблонът не може да бъде построен. Източника на данни няма записи и не са дефинирани колони.",
			unrecognizedCondition: "Неразпознато условие за филтриране: ",
			fieldMismatch: "Изразът съдържа невалидно поле или условие за филтриране: ",
			noSortingFields: "Моля задайте поне едно поле при извикване на sort().",
			filteringNoSchema: "Нямате зададени schema / fields. Нужно е да зададете schema с field дефиниция и типове, за да можете да филтрирате източника на данни."
		}
	});

}

/*
* Infragistics.Web.ClientUI common DV widget localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Chart) {
	$.ig.Chart = {};

	$.extend($.ig.Chart, {

		locale: {
			unsupportedBrowser: "Браузърът ви не поддържа HTML5 canvas елемент. <br/>Моля обновете до някоя от следните версии:",
			currentBrowser: "Вашият браузър: {0}",
			ie9: "Microsoft Internet Explorer V 9+",
			chrome8: "Google Chrome V 8+",
			firefox36: "Mozilla Firefox V 3.6+",
			safari5: "Apple Safari V 5+",
			opera11: "Opera V 11+",
			ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			operaDownload: "http://www.opera.com/download/",
			chromeDownload: "http://www.google.com/chrome",
			firefoxDownload: "http://www.mozilla.com/",
			safariDownload: "http://www.apple.com/safari/download/",
			seriesName: "трябва да попълните series name в зададените от вас опции.",
			axisName: "трябва да попълните axis name в зададените от вас опции.",
			close: "Затвори",
			overview: "Преглед"
		}
	});

}

/*!
* Infragistics.Web.ClientUI shared localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*jQuery must be defined before this. If it is not the $ variable is created*/
$ = $ || {};

$.ig = $.ig || {};

if (!$.ig.SharedLocale) {
	$.ig.SharedLocale = {};

	$.extend($.ig.SharedLocale, {

		locale: {
			popoverOptionChangeNotSupported: "Промяната на следната опция след инициализация на igPopover не се поддържа:"
		}
	});

}

/*!
* Infragistics.Web.ClientUI templating localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Templating) {
	$.ig.Templating = {};

	$.extend($.ig.Templating, {
		locale: {
			undefinedArgument: 'Грешка при опит да се вземе стойността на следното свойство от източника на данни: '
		}
	});
}

/*!
* Infragistics.Web.ClientUI Combo localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global $ */
$.ig = $.ig || {};

if (!$.ig.Combo) {
	$.ig.Combo = {
		locale: {
			noMatchFoundText: 'Няма намерени резултати.',
			dropDownButtonTitle: 'Покажи падащото меню.',
			clearButtonTitle: 'Изчисти стойността.'
		}
	};
}

/*!
* Infragistics.Web.ClientUI Dialog localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global $ */
$.ig = $.ig || {};

if (!$.ig.Dialog) {
	$.ig.Dialog = {
		locale: {
			closeButtonTitle: "Затвори.",
			minimizeButtonTitle: "Минимизирай.",
			maximizeButtonTitle: "Максимизирай.",
			pinButtonTitle: "Закачи.",
			unpinButtonTitle: "Откачи.",
			restoreButtonTitle: "Възстанови."
		}
	};
}

/*!
* Infragistics.Web.ClientUI Editors localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global $ */
$.ig = $.ig || {};

if (!$.ig.Editor) {
	$.ig.Editor = {
		locale: {
			spinUpperTitle: 'Инкрементирай.',
			spinLowerTitle: 'Декрементирай.',
			buttonTitle: 'Покажи списъка.',
			clearTitle: 'Изчисти стойността.',
			datePickerButtonTitle: 'Покажи календара.'
		}
	};
}

/*!
* Infragistics.Web.ClientUI Grid localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Grid) {
	$.ig.Grid = {};

	$.extend($.ig.Grid, {

		locale: {
			noSuchWidget: "Следният widget не е зареден: ",
			autoGenerateColumnsNoRecords: "autoGenerateColumns е позволено, но няма записи в източника на данни за да могат да бъдат генерирани колони",
			optionChangeNotSupported: "Промяната на следната опция след инициализация на igGrid не се поддържа:",
			optionChangeNotScrollingGrid: "Промяната на следната опция след инициализация на igGrid не се поддържа, защото първоначалната ви конфигурация не е включвала scrolling и грида се нуждае от повторно рендериране:",
			noPrimaryKeyDefined: "Нямате дефиниран primary key. За да използвате features като Grid Editing, ви трябва дефиниран primary key.",
			indexOutOfRange: "Индексът на ред, който сте въвели, е извън големината на колекцията.",
			noSuchColumnDefined: "Подаденият column key не отговаря на нито един о тези на дефинираните колони.",
			columnIndexOutOfRange: "Индексът на колоната, който сте въвели, е извън големината на колекцията.",
			recordNotFound: "Записът със следното id не може да бъде намерен в колекцията от данни:",
			columnNotFound: "Колоната със следния key не може да бъде намерена:",
			colPrefix: "Колона ",
			columnVirtualizationRequiresWidth: "Имате позволена virtualization / columnVirtualization, но няма широчина, която да може да бъде  инферирана за колоните на грида. Трябва да дефинирате a) широчина, b) опцията defaultColumnWidth, c) широчина за всяка колона",
			virtualizationRequiresHeight: "Имате позволена virtualization, което изисква височината на грида да бъде дефинирана.",
			colVirtualizationDenied: "columnVirtualization is applicable for fixed virtualization only",
			noColumnsButAutoGenerateTrue: "Имате забранено autoGenerateColumns, но нямате дефинирани колони за грида. Моля разрешете autoGenerateColumns или дефинирайте колони.",
			noPrimaryKey: "igHierarchicalGrid widget изисква дефиниран primary key.",
			//templatingEnabledButNoTemplate: "You have jQueryTemplating set to true, but there is no rowTemplate defined.",
			expandTooltip: "Отвори реда",
			collapseTooltip: "Затвори реда"
		}
	});

	$.ig.GridFiltering = $.ig.GridFiltering || {};

	$.extend($.ig.GridFiltering, {
		locale: {
			startsWithNullText: "Започва с...",
			endsWithNullText: "Завършва на...",
			containsNullText: "Съдържа...",
			doesNotContainNullText: "Не съдържа...",
			equalsNullText: "Равно на...",
			doesNotEqualNullText: "Не е равно на...",
			greaterThanNullText: "По-голямо от...",
			lessThanNullText: "По-малко от...",
			greaterThanOrEqualToNullText: "По-голямо или равно на...",
			lessThanOrEqualToNullText: "По-малко или равно на...",
			onNullText: "На...",
			notOnNullText: "Не на...",
			emptyNullText: "Празно",
			notEmptyNullText: "Не е празно",
			nullNullText: "Null",
			notNullNullText: "Не е null",
			startsWithLabel: "Започва с",
			endsWithLabel: "Завършва на",
			containsLabel: "Съдържа",
			doesNotContainLabel: "Не съдържа",
			equalsLabel: "Равно на",
			doesNotEqualLabel: "Не е равно на",
			greaterThanLabel: "По-голямо от",
			lessThanLabel: "По-малко от",
			greaterThanOrEqualToLabel: "По-голямо или равно на",
			lessThanOrEqualToLabel: "По-малко или равно на",
			trueLabel: "True",
			falseLabel: "False",
			afterLabel: "След",
			beforeLabel: "Преди",
			todayLabel: "Днес",
			yesterdayLabel: "Вчера",
			thisMonthLabel: "Този месец",
			lastMonthLabel: "Миналият месец",
			nextMonthLabel: "Следващият месец",
			thisYearLabel: "Тази година",
			lastYearLabel: "Миналата година",
			nextYearLabel: "Следващата година",
			clearLabel: "Изчисти филтърът",
			noFilterLabel: "Не",
			onLabel: "На",
			notOnLabel: "Не на",
			advancedButtonLabel: "Подробно",
			filterDialogCaptionLabel: "Подробно търсене",
			filterDialogConditionLabel1: "Покажи записите отговарящи ",
			filterDialogConditionLabel2: " на следния критерий",
			filterDialogOkLabel: "Търси",
			filterDialogCancelLabel: "Отмени",
			filterDialogAnyLabel: "Който и да е",
			filterDialogAllLabel: "Всички",
			filterDialogAddLabel: "Прибави",
			filterDialogErrorLabel: "Надхвърлен е максималният брой филтри.",
			filterSummaryTitleLabel: "Резултати от търсенето",
			filterSummaryTemplate: "${matches} отговарящи записи",
			filterDialogClearAllLabel: "Изчисти всички филтри",
			tooltipTemplate: "${condition} филтър приложен",
			// M.H. 13 Oct. 2011 Fix for bug #91007
			featureChooserText: "Скрий филтъра",
			featureChooserTextHide: "Покажи филтъра",
			// M.H. 17 Oct. 2011 Fix for bug #91007
			featureChooserTextAdvancedFilter: "Подробен филтър",
			virtualizationSimpleFilteringNotAllowed: "Когато е разрешен хоризонтален virtualization, простият филтър (filter row) не се поддържа. Моля прехвърлете в режим на подробно търсене (advanced mode) и/или забранете advancedModeEditorsVisible",
			featureChooserNotReferenced: "Скриптът за Feature Chooser не е рефериран. За да не получавате тази грешка моля реферирайте ig.ui.grid.featurechooser.js или използвайте някой от комбинираните скриптови файлове."
		}
	});

	$.ig.GridGroupBy = $.ig.GridGroupBy || {};

	$.extend($.ig.GridGroupBy, {
		locale: {
			emptyGroupByAreaContent: "Издърпайте колона до тук или {0} за да групирате",
			emptyGroupByAreaContentSelectColumns: "изберете колони",
			emptyGroupByAreaContentSelectColumnsCaption: "изберете колони",
			expandTooltip: "Отвори групирания ред",
			collapseTooltip: "Затвори групирания ред",
			removeButtonTooltip: "Премахни групирането по тази колона",
			featureChooserText: "Премахни групирането",
			featureChooserTextHide: "Групирай",
			modalDialogCaptionButtonDesc: "Натисни за сортиране в възходящ ред",
			modalDialogCaptionButtonAsc: "Натисни за сортиране в низходящ ред",
			modalDialogCaptionButtonUngroup: "Натисни за премахване на групирането",
			modalDialogGroupByButtonText: "Групирай",
			modalDialogCaptionText: 'Прибави към групирането',
			modalDialogDropDownLabel: 'Показване:',
			modalDialogClearAllButtonLabel: 'изчисти всички',
			modalDialogRootLevelHierarchicalGrid: 'Най-горно ниво',
			modalDialogDropDownButtonCaption: "Натисни за показване/скриване",
			modalDialogButtonApplyText: 'Приложи',
			modalDialogButtonCancelText: 'Отмени'
		}
	});

	$.ig.GridHiding = $.ig.GridHiding || {};

	$.extend($.ig.GridHiding, {
		locale: {
			columnChooserDisplayText: "Избиране на колони",
			hiddenColumnIndicatorTooltipText: "Скрита колона/колони",
			columnHideText: "Скрий",
			columnChooserCaptionLabel: "Избиране на колони",
			columnChooserCheckboxesHeader: "покажи",
			columnChooserColumnsHeader: "колона",
			columnChooserCloseButtonTooltip: "Затвори",
			hideColumnIconTooltip: "Скрий",
			featureChooserNotReferenced: "Скриптът за Feature Chooser не е рефериран. За да не получавате тази грешка моля реферирайте ig.ui.grid.featurechooser.js или използваите някой от комбинираните скриптови файлове.",
			columnChooserShowText: "Покажи",
			columnChooserHideText: "Скрий",
			columnChooserResetButtonLabel: "върни към начално състояние",
			columnChooserButtonApplyText: 'Приложи',
			columnChooserButtonCancelText: 'Отмени'
		}
	});

	$.ig.GridPaging = $.ig.GridPaging || {};

	$.extend($.ig.GridPaging, {

		locale: {
			pageSizeDropDownLabel: "Покажи ",
			pageSizeDropDownTrailingLabel: "записи",
			//pageSizeDropDownTemplate: "Show ${dropdown} records",
			nextPageLabelText: "следваща",
			prevPageLabelText: "предишна",
			firstPageLabelText: "",
			lastPageLabelText: "",
			currentPageDropDownLeadingLabel: "Страница",
			currentPageDropDownTrailingLabel: "от ${count}",
			//currentPageDropDownTemplate: "Pg ${dropdown} of ${count}",
			currentPageDropDownTooltip: "Избиране на страница",
			pageSizeDropDownTooltip: "Избиране на брой записи на страница",
			pagerRecordsLabelTooltip: "Граници на показаните записи",
			prevPageTooltip: "отиди на предишната страница",
			nextPageTooltip: "отиди на следващата страница",
			firstPageTooltip: "отиди на първата страница",
			lastPageTooltip: "отиди на последната страница",
			pageTooltipFormat: "страница ${index}",
			pagerRecordsLabelTemplate: "${startRecord} - ${endRecord} от ${recordCount} записа"
		}
	});

	$.ig.GridRowSelectors = $.ig.GridRowSelectors || {};

	$.extend($.ig.GridRowSelectors, {

		locale: {
			selectionNotLoaded: "igGridSelection не е инициализиран. За да не получавате тази грешка, моля добавете Selection feature за грида или променете requireSelection опцията за Row Selectors feature да бъде равна на false."
		}
	});

	$.ig.GridSorting = $.ig.GridSorting || {};

	$.extend($.ig.GridSorting, {
		locale: {
			sortedColumnTooltipFormat: 'сортирано ${direction}',
			unsortedColumnTooltip: 'натиснете за да сортирате',
			ascending: 'възходящ ред',
			descending: 'низходящ ред',
			modalDialogSortByButtonText: 'сортирай по',
			modalDialogResetButton: "върни към начално състояние",
			modalDialogCaptionButtonDesc: "Натиснете, за да сортирате в низходящ ред",
			modalDialogCaptionButtonAsc: "Натиснете, за да сортирате във възходящ ред",
			modalDialogCaptionButtonUnsort: "Натиснете, за да премахнете сортирането",
			featureChooserText: "Сортиране по множество колони",
			modalDialogCaptionText: "Сортиране по множество колони",
			modalDialogButtonApplyText: 'Приложи',
			modalDialogButtonCancelText: 'Отмени'
			//modalDialogButtonSlideCaption: "Click to show/hide sorted columns"
		}
	});

	$.ig.GridSummaries = $.ig.GridSummaries || {};

	$.extend($.ig.GridSummaries, {
		locale: {
			featureChooserText: "Скрий обобщените стойности",
			featureChooserTextHide: "Покажи обобщените стойности",
			dialogButtonOKText: 'OK',
			dialogButtonCancelText: 'Отмени',
			emptyCellText: '',
			summariesHeaderButtonTooltip: 'Покажи/Скрий обобщените стойности',
			// M.H. 13 Oct. 2011 Fix for bug 91008
			defaultSummaryRowDisplayLabelCount: 'Брой',
			defaultSummaryRowDisplayLabelMin: 'Минимум',
			defaultSummaryRowDisplayLabelMax: 'Максимум',
			defaultSummaryRowDisplayLabelSum: 'Сума',
			defaultSummaryRowDisplayLabelAvg: 'Осреднено',
			defaultSummaryRowDisplayLabelCustom: '',
			calculateSummaryColumnKeyNotSpecified: "Моля, задайте идентификатор на колона, за да изчислите обобщените стойности",
			featureChooserNotReferenced: "Скриптът за Feature Chooser не е рефериран. За да не получавате тази грешка, моля реферирайте ig.ui.grid.featurechooser.js или използваите някой от комбинираните скриптови файлове."
		}
	});

	$.ig.GridUpdating = $.ig.GridUpdating || {};

	$.extend($.ig.GridUpdating, {
		locale: {
			doneLabel: 'Готово',
			doneTooltip: 'Излез и запази промените',
			cancelLabel: 'Отмени',
			cancelTooltip: 'Излез без да запазваш промените',
			addRowLabel: 'Пробави нов ред',
			addRowTooltip: 'Натисни, за да започнеш прибавянето на нов ред',
			deleteRowLabel: '',
			deleteRowTooltip: 'Изтрий реда',
			igEditorException: 'Манипулирането на данни в ui.igGrid изисква ui.igEditor да бъде зареден',
			igComboException: 'За да използвате combo като едитор в ui.igGrid е нужно ui.igCombo да бъде зареден',
			igRatingException: 'За да използвате igRating като едитор в ui.igGrid е нужно ui.igRating да бъде зареден',
			igValidatorException: 'Опциите за валидация в igGridUpdating изискват ui.igValidator да бъде зареден',
			noPrimaryKeyException: 'Манипулационни операции върху данни след изтриването на ред се поддържат само ако имате дефиниран "primaryKey" в опциите на грида.',
			hiddenColumnValidationException: 'Ред със скрита колона не може да бъде променян ако имате включена валидация.',
			dataDirtyException: 'Гридът има неизчистени транзакции, което може да повлияе на рендерирането на данните. За да предотвратите грешки, можете да разрешите опцията "autoCommit" в грида, или да прихванете събитието "dataDirty" от igGridUpdating и да го отмените. Докато обработвате това събитие, приложението ви може също така да извършва "commit()" на данни в грида.'
		}
	});

}

/*!
* Infragistics.Web.ClientUI HTML Editor localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.HtmlEditor) {
	$.ig.HtmlEditor = {};

	$.extend($.ig.HtmlEditor, {

		locale: {
			boldButtonTitle: 'Получер',
			italicButtonTitle: 'Курсив',
			underlineButtonTitle: 'Подчертано',
			strikethroughButtonTitle: 'Зачеркнат',
			increaseFontSizeButtonTitle: 'Увеличи размера на шрифта',
			decreaseFontSizeButtonTitle: 'Намали размера на шрифта',
			alignTextLeftButtonTitle: 'Подравняване на текст отляво',
			alignTextRightButtonTitle: 'Подравняване на текст отдясно',
			alignTextCenterButtonTitle: 'Центрирано',
			justifyButtonTitle: 'Двустранно подравняване',
			bulletsButtonTitle: 'Водещи символи',
			numberingButtonTitle: 'Номериране',
			decreaseIndentButtonTitle: 'Намали отстъпа',
			increaseIndentButtonTitle: 'Увеличи отстъпа',
			insertPictureButtonTitle: 'Вмъкване на картина',
			fontColorButtonTitle: 'Цвят на шрифт',
			textHighlightButtonTitle: 'Цвят на осветяване на текст',
			insertLinkButtonTitle: 'Вмъкване на хипервръзка',
			insertTableButtonTitle: 'Таблица',
			addRowButtonTitle: 'Прибави ред',
			removeRowButtonTitle: 'Премахни ред',
			addColumnButtonTitle: 'Прибави колона',
			removeColumnButtonTitle: 'Премахни колона',
			inserHRButtonTitle: 'Insert Horizontal Rule',
			viewSourceButtonTitle: 'Покажи сорс кода',
			cutButtonTitle: 'Изрежи',
			copyButtonTitle: 'Копирай',
			pasteButtonTitle: 'Постави',
			undoButtonTitle: 'Undo',
			redoButtonTitle: 'Redo',
			imageUrlDialogText: 'URL на картината:',
			imageAlternativeTextDialogText: 'Алтернативен текст:',
			imageWidthDialogText: 'Широчина на изображението:',
			imageHeihgtDialogText: 'Височина на изображението:',
			linkNavigateToUrlDialogText: 'Навигирай към URL:',
			linkDisplayTextDialogText: 'Текст:',
			linkOpenInDialogText: 'Отвори във:',
			linkTargetNewWindowDialogText: 'Нов прозорец',
			linkTargetSameWindowDialogText: 'Съшият прозорец',
			linkTargetParentWindowDialogText: 'Майчиният прозорец',
			linkTargetTopmostWindowDialogText: 'Най-горният прозорец',
			applyButtonTitle: 'Изпълни',
			cancelButtonTitle: 'Отмени',
			collapseButtonTitle: 'Прибери',
			fontNames: {
				win: [
						{ text: "Times New Roman", value: "Times New Roman" },
						{ text: "Arial", value: "Arial" },
						{ text: "Arial Black", value: "Arial Black" },
						{ text: "Helvetica", value: "Helvetica" },
						{ text: "Comic Sans MS", value: "Comic Sans MS" },
						{ text: "Courier New", value: "Courier New" },
						{ text: "Georgia", value: "Georgia" },
						{ text: "Impact", value: "Impact" },
						{ text: "Lucida Console", value: "Lucida Console" },
						{ text: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
						{ text: "Palatino Linotype", value: "Palatino Linotype" },
						{ text: "Tahoma", value: "Tahoma" },
						{ text: "Trebuchet MS", value: "Trebuchet MS" },
						{ text: "Verdana", value: "Verdana" },
						{ text: "Symbol", value: "Symbol" },
						{ text: "Webdings", value: "Webdings" },
						{ text: "Wingdings", value: "Wingdings" },
						{ text: "MS Sans Serif", value: "MS Sans Serif" },
						{ text: "MS Serif", value: "MS Serif" }
					],
				mac: [
						{ text: "Times New Roman", value: "Times New Roman" },
						{ text: "Arial", value: "Arial" },
						{ text: "Arial Black", value: "Arial Black" },
						{ text: "Helvetica", value: "Helvetica" },
						{ text: "Comic Sans MS", value: "Comic Sans MS" },
						{ text: "Courier New", value: "Courier New" },
						{ text: "Georgia", value: "Georgia" },
						{ text: "Impact", value: "Impact" },
						{ text: "Monaco", value: "Monaco" },
						{ text: "Lucida Grande", value: "Lucida Grande" },
						{ text: "Book Antiqua", value: "Book Antiqua" },
						{ text: "Geneva", value: "Geneva" },
						{ text: "Trebuchet MS", value: "Trebuchet" },
						{ text: "Verdana", value: "Verdana" },
						{ text: "Symbol", value: "Symbol" },
						{ text: "Webdings", value: "Webdings" },
						{ text: "Zapf Dingbats", value: "Zapf Dingbats" },
						{ text: "New York", value: "New York" }
					]
			},
			fontSizes: [
				{ text: "1", value: "1 (8pt)", style: "xx-small"},
				{ text: "2", value: "2 (9pt)", style: "x-small" },
				{ text: "3", value: "3 (10pt)", style: "small" },
				{ text: "4", value: "4 (12pt)", style: "medium" },
				{ text: "5", value: "5 (14pt)", style: "large" },
				{ text: "6", value: "6 (16pt)", style: "x-large" },
				{ text: "7", value: "7 (18pt)", style: "xx-large" }
				],
			formatsList: [
					{ text: "h1", value: "Heading 1" },
					{ text: "h2", value: "Heading 2" },
					{ text: "h3", value: "Heading 3" },
					{ text: "h4", value: "Heading 4" },
					{ text: "h5", value: "Heading 5" },
					{ text: "h6", value: "Heading 6" }
				]
		}

	});
}

/*!
* Infragistics.Web.ClientUI Tree localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Tree) {
	$.ig.Tree = {};

	$.extend($.ig.Tree, {
		locale: {
			invalidArgumentType: 'Подаденият аргумент е от невалиден тип.',
			errorOnRequest: 'Проблем при извличане на данните: ',
			noDataSourceUrl: 'igTree изисква опцията dataSourceUrl да бъде попълнена, за да се оправят заявки за данни.',
			incorrectPath: 'Връх със следната пътека не беше намерен: ',
			incorrectNodeObject: 'Подаденият аргумент не е jQuery елемент.',
			setOptionError: 'Стойността на следната опция не може да бъде променяна след инициализация: '
		}
	});

}

/*!
* Infragistics.Web.ClientUI Upload localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.Upload) {
	$.ig.Upload = {};

	$.extend($.ig.Upload, {

		locale: {
			labelUploadButton: "Качи файл",
			labelAddButton: "Прибави",
			labelClearAllButton: "Изчисти качените",
			// M.H. 13 May 2011 - fix bug 75042
			labelSummaryTemplate: "{0} от {1} качени",
			labelSummaryProgressBarTemplate: "{0}/{1}",
			labelShowDetails: "Покажи детайлите",
			labelHideDetails: "Скрий детайлите",
			labelSummaryProgressButtonCancel: "Отмени",
			// M.H. 1 June 2011 Fix bug #77532
			labelSummaryProgressButtonContinue: "Качи",
			labelSummaryProgressButtonDone: "Готово",
			labelProgressBarFileNameContinue: "...",

			//error messages
			errorMessageFileSizeExceeded: "Максималната големина на файла е надхвърлена.",
			errorMessageGetFileStatus: "Състоянието на файла не може да бъде взето! Вероятно е връзката да е прекъснала.",
			errorMessageCancelUpload: "Командата за отмяна на качването е неуспешно изпратена! Вероятно е връзката да е прекъснала.",
			errorMessageNoSuchFile: "Файлът не може да бъде намерен. Вероятно файлът е твърде голям.",
			errorMessageOther: "Грешка при качването на файла. Код на грешката: {0}.",
			errorMessageValidatingFileExtension: "Неуспешно валидиране на разширението на файла.",
			errorMessageAJAXRequestFileSize: "Грешка в AJAX заявката при опит да се вземе големината на файла.",
			errorMessageMaxUploadedFiles: "Надхвърлен е максималният брой на качените файлове.",
			errorMessageMaxSimultaneousFiles: "Стойността на опцията maxSimultaneousFilesUploads е невалидна. Трябва да е по-голяма от 0 или null.",
			errorMessageTryToRemoveNonExistingFile: "Опитвате премахване на несъществуващ файл с id {0}.",
			errorMessageTryToStartNonExistingFile: "Опитвате стартиране на качване на несъществуващ файл с id {0}.",

			// M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			// title attributes            
			titleUploadFileButtonInit: "Качи файл",
			titleAddFileButton: "Прибави",
			titleCancelUploadButton: "Отмени",
			// M.H. 1 June 2011 Fix bug #77532
			titleSummaryProgressButtonContinue: "Качи",
			titleClearUploaded: "Изчисти качените",
			titleShowDetailsButton: "Покажи детайлите",
			titleHideDetailsButton: "Скрий детайлите",
			titleSummaryProgressButtonCancel: "Отмени",
			titleSummaryProgressButtonDone: "Готово",
			// M.H. 1 June 2011 Fix bug #77532
			titleSingleUploadButtonContinue: "Качи",
			titleClearAllButton: "Изчисти качените"
		}
	});

}

/*!
* Infragistics.Web.ClientUI Validator localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global $ */
$.ig = $.ig || {};

if (!$.ig.Validator) {
	$.ig.Validator = {
		locale: {
			defaultMessage: 'Невалидна стойност',
			selectMessage: 'Моля изберете стойност',
			rangeSelectMessage: 'Моля изберете между {0} и {1} елемента',
			minSelectMessage: 'Моля изберете най-малко {0} елемента',
			maxSelectMessage: 'Моля изберете повече от {0} елемента',
			rangeLengthMessage: 'Моля въведете стойност между {0} и {1} символа',
			minLengthMessage: 'Моля въведете {0} символа или повече',
			maxLengthMessage: 'Моля въведете по-малко от {0} символа',
			requiredMessage: 'Това поле е задължително',
			maskMessage: 'Моля попълнете всички задължителни полета',
			dateFieldsMessage: 'Моля попълнете стойности в полетата за дата',
			invalidDayMessage: 'Невалиден ден от месеца. Моля попълнете валиден ден',
			dateMessage: 'Моля попълнете валидна дата',
			numberMessage: 'Моля попълнете валидно число',
			rangeMessage: 'Моля попълнете стойност между {0} и {1}',
			minMessage: 'Моля попълнете стойност по-голяма или равна на {0}',
			maxMessage: 'Моля попълнете стойност по-малка или равна на {0}'
		}
	};
}

/*!
* Infragistics.Web.ClientUI Video Player localization resources 12.1.20121.1010
*
* Copyright (c) 2011-2012 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

$.ig = $.ig || {};

if (!$.ig.VideoPlayer) {
	$.ig.VideoPlayer = {};

	$.extend($.ig.VideoPlayer, {

		locale: {
			liveStream: "Видео на живо",
			live: "На живо",
			paused: "Паузирано",
			playing: "В прогрес",
			play: 'Пусни',
			volume: "Сила на звука",
			unsupportedVideoSource: "Подадените видео източници не съдържат формат поддържан от вашия браузър.",
			missingVideoSource: "Липсват видео източници.",
			progressLabelLongFormat: "$currentTime$ / $duration$",
			progressLabelShortFormat: "$currentTime$",
			enterFullscreen: "Цял екран",
			exitFullscreen: "Излез от цял екран",
			skipTo: "Отиди до",
			unsupportedBrowser: "Вашият браузър не поддържа HTML5 видео. <br/>Моля обновете до някоя от следните версии:",
			currentBrowser: "Вашият браузър: {0}",
			ie9: "Microsoft Internet Explorer V 9+",
			chrome8: "Google Chrome V 8+",
			firefox36: "Mozilla Firefox V 3.6+",
			safari5: "Apple Safari V 5+",
			opera11: "Opera V 11+",
			ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			operaDownload: "http://www.opera.com/download/",
			chromeDownload: "http://www.google.com/chrome",
			firefoxDownload: "http://www.mozilla.com/",
			safariDownload: "http://www.apple.com/safari/download/",
			buffering: 'Буфериране...',
			adMessage: 'Реклама: Видеото ще продължи след $duration$ секунди.',
			adMessageLong: 'Реклама: Видеото ще продължи след $duration$.',
			adMessageNoDuration: 'Реклама: Видеото ще продължи след рекламите.',
			adNewWindowTip: 'Реклама: Натиснете тук, за да отворите съдържанието в нов прозорец.',
			nonDivException: 'Infragistics HTML5 Video Player може да бъде инстанциран само на DIV елемент.',
			relatedVideos: 'Подобни видея',
			replayButton: 'Започни отначало',
			replayTooltip: 'Натиснете тук, за да пуснете видеото отначало.'
		}
	});

}


