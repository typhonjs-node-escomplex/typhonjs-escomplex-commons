* Project:
   * moduleAverage.maintainability: 135.211

* Module 1:
   * filePath: `./src/ESComplexProject.js`
   * srcPath: `./src/ESComplexProject.js`
   * maintainability: 110.612
   * errors: (info) maintainability: 110.612 &lt; 115 @ Module - ./src/ESComplexProject.js (1 - 241)
   * Class: **ESComplexProject** (11)
      * maintainability: 110.612
      * errors: (info) maintainability: 110.612 &lt; 115 @ Class - ESComplexProject (11 - 240)
      * Class method: **constructor** (44)
         * cyclomatic: 8
         * halstead.difficulty: 7.385
         * errors: (warning) cyclomatic: 8 &gt; 7 @ Class Method - constructor (44 - 103)
      * Class method: **analyze** (115)
         * cyclomatic: 4
         * halstead.difficulty: 13.333
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - analyze (115 - 162)
         * errors: (warning) halstead.difficulty: 13.333 &gt; 13 @ Class Method - analyze (115 - 162)
      * Class method: **&lt;anonymous&gt;** (126)
         * cyclomatic: 3
         * halstead.difficulty: 14.912
         * errors: (warning) halstead.difficulty: 14.912 &gt; 13 @ Class Method - &lt;anonymous&gt; (126 - 153)
      * Class method: **processResults** (174)
         * cyclomatic: 5
         * halstead.difficulty: 15.75
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - processResults (174 - 201)
         * errors: (warning) halstead.difficulty: 15.75 &gt; 13 @ Class Method - processResults (174 - 201)
      * Class method: **analyzeAsync** (215)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **&lt;anonymous&gt;** (217)
         * cyclomatic: 1
         * halstead.difficulty: 2.143
      * Class method: **processResultsAsync** (232)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **&lt;anonymous&gt;** (234)
         * cyclomatic: 1
         * halstead.difficulty: 2.143

* Module 2:
   * filePath: `./src/index.js`
   * srcPath: `./src/index.js`
   * maintainability: 171

* Module 3:
   * filePath: `./src/Plugins.js`
   * srcPath: `./src/Plugins.js`
   * maintainability: 120.055
   * Class: **Plugins** (12)
      * maintainability: 120.055
      * Class method: **constructor** (23)
         * cyclomatic: 3
         * halstead.difficulty: 8.938
         * errors: (info) halstead.difficulty: 8.938 &gt; 8 @ Class Method - constructor (23 - 37)
      * Class method: **onConfigure** (47)
         * cyclomatic: 5
         * halstead.difficulty: 14.3
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - onConfigure (47 - 64)
         * errors: (warning) halstead.difficulty: 14.3 &gt; 13 @ Class Method - onConfigure (47 - 64)
      * Class method: **onProjectStart** (73)
         * cyclomatic: 1
         * halstead.difficulty: 2.357
      * Class method: **onProjectEnd** (86)
         * cyclomatic: 2
         * halstead.difficulty: 7.2

* Module 4:
   * filePath: `./test/fixture/testImportNPMAlias.js`
   * srcPath: `./test/fixture/testImportNPMAlias.js`
   * maintainability: 171

* Module 5:
   * filePath: `./test/fixture/testRequireNPMAlias.js`
   * srcPath: `./test/fixture/testRequireNPMAlias.js`
   * maintainability: 160.237

* Module 6:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/analyze/AnalyzeError.js`
   * srcPath: `typhonjs-escomplex-commons/src/analyze/AnalyzeError.js`
   * maintainability: 151.191
   * Class: **AnalyzeError** (4)
      * maintainability: 151.191
      * Class method: **constructor** (14)
         * cyclomatic: 1
         * halstead.difficulty: 1.667
      * Class method: **line** (49)
         * cyclomatic: 1
         * halstead.difficulty: 1
      * Class method: **message** (55)
         * cyclomatic: 1
         * halstead.difficulty: 1
      * Class method: **severity** (61)
         * cyclomatic: 1
         * halstead.difficulty: 1
      * Class method: **source** (67)
         * cyclomatic: 1
         * halstead.difficulty: 1
      * Class method: **toString** (73)
         * cyclomatic: 1
         * halstead.difficulty: 1.333

* Module 7:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/plugin/syntax/AbstractSyntaxLoader.js`
   * maintainability: 122.136
   * Module method: **&lt;anonymous&gt;** (33)
      * cyclomatic: 4
      * halstead.difficulty: 11.7
      * errors: (info) cyclomatic: 4 &gt; 3 @ Module Method - &lt;anonymous&gt; (33 - 44)
      * errors: (info) halstead.difficulty: 11.7 &gt; 8 @ Module Method - &lt;anonymous&gt; (33 - 44)
   * Module method: **&lt;anonymous&gt;** (39)
      * cyclomatic: 2
      * halstead.difficulty: 4
   * Class: **AbstractSyntaxLoader** (6)
      * maintainability: 118.601
      * Class method: **onLoadSyntax** (13)
         * cyclomatic: 4
         * halstead.difficulty: 10.083
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - onLoadSyntax (13 - 22)
         * errors: (info) halstead.difficulty: 10.083 &gt; 8 @ Class Method - onLoadSyntax (13 - 22)

* Module 8:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/report/AbstractReport.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/report/AbstractReport.js`
   * maintainability: 148.735
   * Class: **AbstractReport** (5)
      * maintainability: 148.735
      * Class method: **constructor** (13)
         * cyclomatic: 1
         * halstead.difficulty: 1.875
      * Class method: **aggregateReport** (28)
         * cyclomatic: 2
         * halstead.difficulty: 5
      * Class method: **incrementDistinctHalsteadItems** (36)
         * cyclomatic: 2
         * halstead.difficulty: 2.55
      * Class method: **incrementHalsteadItems** (52)
         * cyclomatic: 1
         * halstead.difficulty: 1.667
      * Class method: **incrementHalsteadMetric** (66)
         * cyclomatic: 1
         * halstead.difficulty: 1.333
      * Class method: **incrementParams** (76)
         * cyclomatic: 1
         * halstead.difficulty: 1.25
      * Class method: **isHalsteadMetricDistinct** (89)
         * cyclomatic: 1
         * halstead.difficulty: 3.125

* Module 9:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/report/AggregateReport.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/report/AggregateReport.js`
   * maintainability: 120.222
   * Class: **AggregateReport** (8)
      * maintainability: 120.222
      * Class method: **constructor** (16)
         * cyclomatic: 1
         * halstead.difficulty: 7.143
      * Class method: **parse** (58)
         * cyclomatic: 2
         * halstead.difficulty: 5.143

* Module 10:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/report/averages/HalsteadAverage.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/report/averages/HalsteadAverage.js`
   * maintainability: 105.249
   * errors: (info) maintainability: 105.249 &lt; 115 @ Module - typhonjs-escomplex-commons/src/module/report/averages/HalsteadAverage.js (1 - 68)
   * Class: **HalsteadAverage** (5)
      * maintainability: 105.249
      * errors: (info) maintainability: 105.249 &lt; 115 @ Class - HalsteadAverage (5 - 67)
      * Class method: **constructor** (10)
         * cyclomatic: 1
         * halstead.difficulty: 5.077

* Module 11:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/report/averages/MethodAverage.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/report/averages/MethodAverage.js`
   * maintainability: 117.819
   * Class: **MethodAverage** (6)
      * maintainability: 117.819
      * Class method: **constructor** (11)
         * cyclomatic: 1
         * halstead.difficulty: 4.5

* Module 12:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/report/averages/ModuleAverage.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/report/averages/ModuleAverage.js`
   * maintainability: 145.803
   * Class: **ModuleAverage** (6)
      * maintainability: 145.803
      * Class method: **constructor** (11)
         * cyclomatic: 1
         * halstead.difficulty: 1.8

* Module 13:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/report/ClassReport.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/report/ClassReport.js`
   * maintainability: 128.681
   * Class: **ClassReport** (12)
      * maintainability: 128.681
      * Class method: **constructor** (21)
         * cyclomatic: 1
         * halstead.difficulty: 5.417
      * Class method: **clearErrors** (67)
         * cyclomatic: 2
         * halstead.difficulty: 4
      * Class method: **&lt;anonymous&gt;** (73)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getErrors** (84)
         * cyclomatic: 2
         * halstead.difficulty: 7.071
      * Class method: **&lt;anonymous&gt;** (90)
         * cyclomatic: 1
         * halstead.difficulty: 1.875
      * Class method: **parse** (103)
         * cyclomatic: 4
         * halstead.difficulty: 13.385
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - parse (103 - 121)
         * errors: (warning) halstead.difficulty: 13.385 &gt; 13 @ Class Method - parse (103 - 121)
      * Class method: **&lt;anonymous&gt;** (112)
         * cyclomatic: 1
         * halstead.difficulty: 2.5
      * Class method: **&lt;anonymous&gt;** (117)
         * cyclomatic: 1
         * halstead.difficulty: 2

* Module 14:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/report/HalsteadData.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/report/HalsteadData.js`
   * maintainability: 110.635
   * errors: (info) maintainability: 110.635 &lt; 115 @ Module - typhonjs-escomplex-commons/src/module/report/HalsteadData.js (1 - 88)
   * Class: **HalsteadData** (5)
      * maintainability: 110.635
      * errors: (info) maintainability: 110.635 &lt; 115 @ Class - HalsteadData (5 - 87)
      * Class method: **constructor** (10)
         * cyclomatic: 1
         * halstead.difficulty: 6.25
      * Class method: **reset** (75)
         * cyclomatic: 2
         * halstead.difficulty: 8.25
         * errors: (info) halstead.difficulty: 8.25 &gt; 8 @ Class Method - reset (75 - 86)
      * Class method: **&lt;anonymous&gt;** (77)
         * cyclomatic: 2
         * halstead.difficulty: 4.375

* Module 15:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/report/MethodReport.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/report/MethodReport.js`
   * maintainability: 130.447
   * Class: **MethodReport** (7)
      * maintainability: 130.447
      * Class method: **constructor** (17)
         * cyclomatic: 1
         * halstead.difficulty: 5.556
      * Class method: **clearErrors** (55)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getErrors** (65)
         * cyclomatic: 1
         * halstead.difficulty: 2.5
      * Class method: **parse** (77)
         * cyclomatic: 3
         * halstead.difficulty: 10
         * errors: (info) halstead.difficulty: 10 &gt; 8 @ Class Method - parse (77 - 90)
      * Class method: **&lt;anonymous&gt;** (86)
         * cyclomatic: 1
         * halstead.difficulty: 2.5

* Module 16:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/report/ModuleReport.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/report/ModuleReport.js`
   * maintainability: 123.988
   * Class: **ModuleReport** (19)
      * maintainability: 123.988
      * Class method: **constructor** (30)
         * cyclomatic: 2
         * halstead.difficulty: 11.75
         * errors: (info) halstead.difficulty: 11.75 &gt; 8 @ Class Method - constructor (30 - 120)
      * Class method: **addDependencies** (127)
         * cyclomatic: 3
         * halstead.difficulty: 7
      * Class method: **clearErrors** (141)
         * cyclomatic: 2
         * halstead.difficulty: 4.714
      * Class method: **&lt;anonymous&gt;** (147)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **&lt;anonymous&gt;** (148)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **createScope** (163)
         * cyclomatic: 4
         * halstead.difficulty: 17.208
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - createScope (163 - 206)
         * errors: (warning) halstead.difficulty: 17.208 &gt; 13 @ Class Method - createScope (163 - 206)
      * Class method: **finalize** (213)
         * cyclomatic: 1
         * halstead.difficulty: 2.8
      * Class method: **getCurrentClassReport** (226)
         * cyclomatic: 2
         * halstead.difficulty: 6.6
      * Class method: **getCurrentMethodReport** (236)
         * cyclomatic: 2
         * halstead.difficulty: 6.6
      * Class method: **getErrors** (249)
         * cyclomatic: 2
         * halstead.difficulty: 7.875
      * Class method: **&lt;anonymous&gt;** (255)
         * cyclomatic: 1
         * halstead.difficulty: 1.875
      * Class method: **&lt;anonymous&gt;** (256)
         * cyclomatic: 1
         * halstead.difficulty: 1.875
      * Class method: **getFormatFileExtensions** (267)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getFormatNames** (277)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getFormatTypes** (287)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getSetting** (300)
         * cyclomatic: 5
         * halstead.difficulty: 10
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - getSetting (300 - 310)
         * errors: (info) halstead.difficulty: 10 &gt; 8 @ Class Method - getSetting (300 - 310)
      * Class method: **halsteadItemEncountered** (319)
         * cyclomatic: 3
         * halstead.difficulty: 6.875
      * Class method: **incrementCyclomatic** (336)
         * cyclomatic: 3
         * halstead.difficulty: 7.5
      * Class method: **incrementLogicalSloc** (353)
         * cyclomatic: 3
         * halstead.difficulty: 7.667
      * Class method: **parse** (371)
         * cyclomatic: 5
         * halstead.difficulty: 16.286
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - parse (371 - 394)
         * errors: (warning) halstead.difficulty: 16.286 &gt; 13 @ Class Method - parse (371 - 394)
      * Class method: **&lt;anonymous&gt;** (380)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **&lt;anonymous&gt;** (385)
         * cyclomatic: 1
         * halstead.difficulty: 2.5
      * Class method: **&lt;anonymous&gt;** (390)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **popScope** (402)
         * cyclomatic: 3
         * halstead.difficulty: 6
      * Class method: **processHalsteadItems** (425)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **&lt;anonymous&gt;** (427)
         * cyclomatic: 1
         * halstead.difficulty: 1.25
      * Class method: **setSetting** (441)
         * cyclomatic: 4
         * halstead.difficulty: 7.727
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - setSetting (441 - 456)
      * Class method: **toFormat** (467)
         * cyclomatic: 1
         * halstead.difficulty: 2

* Module 17:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/traits/actualize.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/traits/actualize.js`
   * maintainability: 111.799
   * errors: (info) maintainability: 111.799 &lt; 115 @ Module - typhonjs-escomplex-commons/src/module/traits/actualize.js (1 - 32)
   * Module method: **&lt;anonymous&gt;** (19)
      * cyclomatic: 1
      * halstead.difficulty: 5.921

* Module 18:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/traits/HalsteadArray.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/traits/HalsteadArray.js`
   * maintainability: 140.17
   * Class: **HalsteadArray** (7)
      * maintainability: 140.17
      * Class method: **constructor** (15)
         * cyclomatic: 3
         * halstead.difficulty: 7.5
      * Class method: **&lt;anonymous&gt;** (28)
         * cyclomatic: 3
         * halstead.difficulty: 10.8
         * errors: (info) halstead.difficulty: 10.8 &gt; 8 @ Class Method - &lt;anonymous&gt; (28 - 32)
      * Class method: **forEach** (48)
         * cyclomatic: 1
         * halstead.difficulty: 1.4
      * Class method: **get** (60)
         * cyclomatic: 1
         * halstead.difficulty: 1.333
      * Class method: **length** (70)
         * cyclomatic: 1
         * halstead.difficulty: 1
      * Class method: **metric** (77)
         * cyclomatic: 1
         * halstead.difficulty: 1
      * Class method: **type** (84)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **valueOf** (96)
         * cyclomatic: 1
         * halstead.difficulty: 5.786
      * Class method: **&lt;anonymous&gt;** (98)
         * cyclomatic: 2
         * halstead.difficulty: 5.6
      * Class method: **&lt;anonymous&gt;** (105)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **&lt;anonymous&gt;** (105)
         * cyclomatic: 3
         * halstead.difficulty: 7.778

* Module 19:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/traits/safeArray.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/traits/safeArray.js`
   * maintainability: 148.682
   * Module method: **&lt;anonymous&gt;** (8)
      * cyclomatic: 4
      * halstead.difficulty: 8
      * errors: (info) cyclomatic: 4 &gt; 3 @ Module Method - &lt;anonymous&gt; (8 - 11)

* Module 20:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/traits/safeName.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/traits/safeName.js`
   * maintainability: 119.451
   * Module method: **&lt;anonymous&gt;** (9)
      * cyclomatic: 7
      * halstead.difficulty: 9.188
      * errors: (info) cyclomatic: 7 &gt; 3 @ Module Method - &lt;anonymous&gt; (9 - 19)
      * errors: (info) halstead.difficulty: 9.188 &gt; 8 @ Module Method - &lt;anonymous&gt; (9 - 19)

* Module 21:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/traits/Trait.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/traits/Trait.js`
   * maintainability: 138.638
   * Class: **Trait** (4)
      * maintainability: 138.638
      * Class method: **constructor** (12)
         * cyclomatic: 2
         * halstead.difficulty: 5.25
      * Class method: **metric** (37)
         * cyclomatic: 1
         * halstead.difficulty: 1
      * Class method: **type** (44)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **valueOf** (56)
         * cyclomatic: 3
         * halstead.difficulty: 11.429
         * errors: (info) halstead.difficulty: 11.429 &gt; 8 @ Class Method - valueOf (56 - 64)
      * Class method: **&lt;anonymous&gt;** (60)
         * cyclomatic: 2
         * halstead.difficulty: 6

* Module 22:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/module/traits/TraitHalstead.js`
   * srcPath: `typhonjs-escomplex-commons/src/module/traits/TraitHalstead.js`
   * maintainability: 128.1
   * Class: **TraitHalstead** (5)
      * maintainability: 128.1
      * Class method: **constructor** (13)
         * cyclomatic: 8
         * halstead.difficulty: 11.289
         * errors: (warning) cyclomatic: 8 &gt; 7 @ Class Method - constructor (13 - 61)
         * errors: (info) halstead.difficulty: 11.289 &gt; 8 @ Class Method - constructor (13 - 61)
      * Class method: **&lt;anonymous&gt;** (24)
         * cyclomatic: 3
         * halstead.difficulty: 4.286
      * Class method: **filter** (73)
         * cyclomatic: 2
         * halstead.difficulty: 6.667
      * Class method: **metric** (83)
         * cyclomatic: 1
         * halstead.difficulty: 1
      * Class method: **type** (90)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **valueOf** (100)
         * cyclomatic: 3
         * halstead.difficulty: 13.125
         * errors: (warning) halstead.difficulty: 13.125 &gt; 13 @ Class Method - valueOf (100 - 111)
      * Class method: **&lt;anonymous&gt;** (104)
         * cyclomatic: 2
         * halstead.difficulty: 6

* Module 23:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/project/result/ProjectResult.js`
   * srcPath: `typhonjs-escomplex-commons/src/project/result/ProjectResult.js`
   * maintainability: 125.535
   * Class: **ProjectResult** (15)
      * maintainability: 125.535
      * Class method: **constructor** (25)
         * cyclomatic: 3
         * halstead.difficulty: 12.316
         * errors: (info) halstead.difficulty: 12.316 &gt; 8 @ Class Method - constructor (25 - 90)
      * Class method: **&lt;anonymous&gt;** (80)
         * cyclomatic: 1
         * halstead.difficulty: 2.4
      * Class method: **clearErrors** (98)
         * cyclomatic: 2
         * halstead.difficulty: 4
      * Class method: **&lt;anonymous&gt;** (104)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **finalize** (119)
         * cyclomatic: 5
         * halstead.difficulty: 15.167
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - finalize (119 - 152)
         * errors: (warning) halstead.difficulty: 15.167 &gt; 13 @ Class Method - finalize (119 - 152)
      * Class method: **&lt;anonymous&gt;** (132)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **&lt;anonymous&gt;** (136)
         * cyclomatic: 2
         * halstead.difficulty: 9.188
         * errors: (info) halstead.difficulty: 9.188 &gt; 8 @ Class Method - &lt;anonymous&gt; (136 - 148)
      * Class method: **getErrors** (161)
         * cyclomatic: 2
         * halstead.difficulty: 7.071
      * Class method: **&lt;anonymous&gt;** (167)
         * cyclomatic: 1
         * halstead.difficulty: 1.875
      * Class method: **getFormatFileExtensions** (178)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getFormatNames** (188)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getFormatTypes** (198)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getSetting** (211)
         * cyclomatic: 5
         * halstead.difficulty: 10
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - getSetting (211 - 221)
         * errors: (info) halstead.difficulty: 10 &gt; 8 @ Class Method - getSetting (211 - 221)
      * Class method: **parse** (230)
         * cyclomatic: 3
         * halstead.difficulty: 10
         * errors: (info) halstead.difficulty: 10 &gt; 8 @ Class Method - parse (230 - 243)
      * Class method: **&lt;anonymous&gt;** (239)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **setSetting** (253)
         * cyclomatic: 4
         * halstead.difficulty: 7.727
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - setSetting (253 - 268)
      * Class method: **toFormat** (279)
         * cyclomatic: 1
         * halstead.difficulty: 2

* Module 24:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/json/FormatJSON.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/json/FormatJSON.js`
   * maintainability: 150.518
   * Class: **FormatJSON** (4)
      * maintainability: 150.518
      * Class method: **formatReport** (16)
         * cyclomatic: 3
         * halstead.difficulty: 7.556
      * Class method: **formatResult** (31)
         * cyclomatic: 3
         * halstead.difficulty: 7.556
      * Class method: **extension** (42)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (52)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **type** (62)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 25:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js`
   * maintainability: 103.409
   * errors: (info) maintainability: 103.409 &lt; 115 @ Module - typhonjs-escomplex-commons/src/transform/formats/json/FormatJSONCheckstyle.js (1 - 272)
   * Class: **FormatJSONCheckstyle** (17)
      * maintainability: 103.409
      * errors: (info) maintainability: 103.409 &lt; 115 @ Class - FormatJSONCheckstyle (17 - 240)
      * Class method: **constructor** (19)
         * cyclomatic: 1
         * halstead.difficulty: 1.25
      * Class method: **formatReport** (35)
         * cyclomatic: 3
         * halstead.difficulty: 12.071
         * errors: (info) halstead.difficulty: 12.071 &gt; 8 @ Class Method - formatReport (35 - 46)
      * Class method: **formatResult** (59)
         * cyclomatic: 3
         * halstead.difficulty: 11.375
         * errors: (info) halstead.difficulty: 11.375 &gt; 8 @ Class Method - formatResult (59 - 75)
      * Class method: **&lt;anonymous&gt;** (68)
         * cyclomatic: 1
         * halstead.difficulty: 1.125
      * Class method: **extension** (82)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (92)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **type** (102)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **_formatModule** (118)
         * cyclomatic: 10
         * halstead.difficulty: 27.9
         * errors: (warning) cyclomatic: 10 &gt; 7 @ Class Method - _formatModule (118 - 162)
         * errors: (error) halstead.difficulty: 27.9 &gt; 20 @ Class Method - _formatModule (118 - 162)
      * Class method: **_parseErrors** (164)
         * cyclomatic: 14
         * halstead.difficulty: 31.706
         * errors: (error) cyclomatic: 14 &gt; 12 @ Class Method - _parseErrors (164 - 239)
         * errors: (error) halstead.difficulty: 31.706 &gt; 20 @ Class Method - _parseErrors (164 - 239)

* Module 26:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/json/FormatJSONMinimal.js`
   * maintainability: 120.465
   * Class: **FormatJSONMinimal** (7)
      * maintainability: 120.465
      * Class method: **constructor** (9)
         * cyclomatic: 1
         * halstead.difficulty: 1.25
      * Class method: **formatReport** (26)
         * cyclomatic: 3
         * halstead.difficulty: 10.676
         * errors: (info) halstead.difficulty: 10.676 &gt; 8 @ Class Method - formatReport (26 - 35)
      * Class method: **formatResult** (49)
         * cyclomatic: 3
         * halstead.difficulty: 11.773
         * errors: (info) halstead.difficulty: 11.773 &gt; 8 @ Class Method - formatResult (49 - 65)
      * Class method: **&lt;anonymous&gt;** (58)
         * cyclomatic: 1
         * halstead.difficulty: 1.125
      * Class method: **extension** (72)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (82)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **type** (92)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **_formatClasses** (108)
         * cyclomatic: 1
         * halstead.difficulty: 5.25
      * Class method: **&lt;anonymous&gt;** (112)
         * cyclomatic: 4
         * halstead.difficulty: 8.346
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - &lt;anonymous&gt; (112 - 131)
         * errors: (info) halstead.difficulty: 8.346 &gt; 8 @ Class Method - &lt;anonymous&gt; (112 - 131)
      * Class method: **&lt;anonymous&gt;** (121)
         * cyclomatic: 2
         * halstead.difficulty: 4.167
      * Class method: **_formatMethods** (146)
         * cyclomatic: 1
         * halstead.difficulty: 5.25
      * Class method: **&lt;anonymous&gt;** (150)
         * cyclomatic: 4
         * halstead.difficulty: 8.4
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - &lt;anonymous&gt; (150 - 167)
         * errors: (info) halstead.difficulty: 8.4 &gt; 8 @ Class Method - &lt;anonymous&gt; (150 - 167)
      * Class method: **&lt;anonymous&gt;** (159)
         * cyclomatic: 2
         * halstead.difficulty: 4.167
      * Class method: **_formatModule** (186)
         * cyclomatic: 9
         * halstead.difficulty: 20.938
         * errors: (warning) cyclomatic: 9 &gt; 7 @ Class Method - _formatModule (186 - 219)
         * errors: (error) halstead.difficulty: 20.938 &gt; 20 @ Class Method - _formatModule (186 - 219)
      * Class method: **&lt;anonymous&gt;** (198)
         * cyclomatic: 2
         * halstead.difficulty: 4.167

* Module 27:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/json/FormatJSONModules.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/json/FormatJSONModules.js`
   * maintainability: 124.142
   * Class: **FormatJSONModules** (5)
      * maintainability: 124.142
      * Class method: **formatReport** (18)
         * cyclomatic: 6
         * halstead.difficulty: 15.231
         * errors: (info) cyclomatic: 6 &gt; 3 @ Class Method - formatReport (18 - 28)
         * errors: (warning) halstead.difficulty: 15.231 &gt; 13 @ Class Method - formatReport (18 - 28)
      * Class method: **formatResult** (40)
         * cyclomatic: 3
         * halstead.difficulty: 11
         * errors: (info) halstead.difficulty: 11 &gt; 8 @ Class Method - formatResult (40 - 57)
      * Class method: **&lt;anonymous&gt;** (44)
         * cyclomatic: 4
         * halstead.difficulty: 9
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - &lt;anonymous&gt; (44 - 53)
         * errors: (info) halstead.difficulty: 9 &gt; 8 @ Class Method - &lt;anonymous&gt; (44 - 53)
      * Class method: **extension** (64)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (74)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **type** (84)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 28:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdown.js`
   * maintainability: 156.387
   * Class: **FormatMarkdown** (7)
      * maintainability: 156.387
      * Class method: **constructor** (9)
         * cyclomatic: 1
         * halstead.difficulty: 2.4
      * Class method: **extension** (21)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (31)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 29:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdownAdjacency.js`
   * maintainability: 157.745
   * Class: **FormatMarkdownAdjacency** (6)
      * maintainability: 157.745
      * Class method: **constructor** (8)
         * cyclomatic: 1
         * halstead.difficulty: 2.5
      * Class method: **extension** (18)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (28)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 30:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdownMinimal.js`
   * maintainability: 157.745
   * Class: **FormatMarkdownMinimal** (9)
      * maintainability: 157.745
      * Class method: **constructor** (11)
         * cyclomatic: 1
         * halstead.difficulty: 2.5
      * Class method: **extension** (21)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (31)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 31:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdownModules.js`
   * maintainability: 157.745
   * Class: **FormatMarkdownModules** (6)
      * maintainability: 157.745
      * Class method: **constructor** (8)
         * cyclomatic: 1
         * halstead.difficulty: 2.5
      * Class method: **extension** (18)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (28)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 32:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/markdown/FormatMarkdownVisibility.js`
   * maintainability: 157.745
   * Class: **FormatMarkdownVisibility** (6)
      * maintainability: 157.745
      * Class method: **constructor** (8)
         * cyclomatic: 1
         * halstead.difficulty: 2.5
      * Class method: **extension** (18)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (28)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 33:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/text/AbstractFormatText.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/text/AbstractFormatText.js`
   * maintainability: 119.155
   * Class: **AbstractFormatText** (6)
      * maintainability: 119.155
      * Class method: **constructor** (15)
         * cyclomatic: 1
         * halstead.difficulty: 2.4
      * Class method: **formatReport** (33)
         * cyclomatic: 1
         * halstead.difficulty: 7.219
      * Class method: **formatResult** (70)
         * cyclomatic: 1
         * halstead.difficulty: 6.857
      * Class method: **&lt;anonymous&gt;** (77)
         * cyclomatic: 1
         * halstead.difficulty: 7
      * Class method: **_formatClass** (113)
         * cyclomatic: 6
         * halstead.difficulty: 14.526
         * errors: (info) cyclomatic: 6 &gt; 3 @ Class Method - _formatClass (113 - 124)
         * errors: (warning) halstead.difficulty: 14.526 &gt; 13 @ Class Method - _formatClass (113 - 124)
      * Class method: **_formatClasses** (140)
         * cyclomatic: 2
         * halstead.difficulty: 4.714
      * Class method: **&lt;anonymous&gt;** (144)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **_formatEntries** (162)
         * cyclomatic: 3
         * halstead.difficulty: 10.5
         * errors: (info) halstead.difficulty: 10.5 &gt; 8 @ Class Method - _formatEntries (162 - 187)
      * Class method: **&lt;anonymous&gt;** (170)
         * cyclomatic: 5
         * halstead.difficulty: 9.688
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - &lt;anonymous&gt; (170 - 184)
         * errors: (info) halstead.difficulty: 9.688 &gt; 8 @ Class Method - &lt;anonymous&gt; (170 - 184)
      * Class method: **_formatMethod** (204)
         * cyclomatic: 6
         * halstead.difficulty: 15.167
         * errors: (info) cyclomatic: 6 &gt; 3 @ Class Method - _formatMethod (204 - 215)
         * errors: (warning) halstead.difficulty: 15.167 &gt; 13 @ Class Method - _formatMethod (204 - 215)
      * Class method: **_formatMethods** (232)
         * cyclomatic: 2
         * halstead.difficulty: 4.333
      * Class method: **&lt;anonymous&gt;** (236)
         * cyclomatic: 1
         * halstead.difficulty: 1.929
      * Class method: **_formatModule** (257)
         * cyclomatic: 5
         * halstead.difficulty: 16.763
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - _formatModule (257 - 277)
         * errors: (warning) halstead.difficulty: 16.763 &gt; 13 @ Class Method - _formatModule (257 - 277)
      * Class method: **_formatProject** (290)
         * cyclomatic: 4
         * halstead.difficulty: 12.923
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - _formatProject (290 - 301)
         * errors: (info) halstead.difficulty: 12.923 &gt; 8 @ Class Method - _formatProject (290 - 301)

* Module 34:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/text/AbstractTextMatrix.js`
   * maintainability: 118.079
   * Class: **AbstractTextMatrix** (6)
      * maintainability: 118.079
      * Class method: **constructor** (21)
         * cyclomatic: 1
         * halstead.difficulty: 2.4
      * Class method: **formatReport** (33)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **formatResult** (50)
         * cyclomatic: 6
         * halstead.difficulty: 16.944
         * errors: (info) cyclomatic: 6 &gt; 3 @ Class Method - formatResult (50 - 89)
         * errors: (warning) halstead.difficulty: 16.944 &gt; 13 @ Class Method - formatResult (50 - 89)
      * Class method: **_formatMatrixList** (106)
         * cyclomatic: 5
         * halstead.difficulty: 9.263
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - _formatMatrixList (106 - 131)
         * errors: (info) halstead.difficulty: 9.263 &gt; 8 @ Class Method - _formatMatrixList (106 - 131)
      * Class method: **&lt;anonymous&gt;** (116)
         * cyclomatic: 1
         * halstead.difficulty: 3.382
      * Class method: **&lt;anonymous&gt;** (121)
         * cyclomatic: 1
         * halstead.difficulty: 2.429

* Module 35:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/text/FormatText.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/text/FormatText.js`
   * maintainability: 125.777
   * Class: **FormatText** (7)
      * maintainability: 125.777
      * Class method: **constructor** (9)
         * cyclomatic: 1
         * halstead.difficulty: 3.571
      * Class method: **formatResult** (31)
         * cyclomatic: 7
         * halstead.difficulty: 18.85
         * errors: (info) cyclomatic: 7 &gt; 3 @ Class Method - formatResult (31 - 54)
         * errors: (warning) halstead.difficulty: 18.85 &gt; 13 @ Class Method - formatResult (31 - 54)
      * Class method: **extension** (61)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (71)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **type** (81)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 36:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/text/FormatTextAdjacency.js`
   * maintainability: 156.212
   * Class: **FormatTextAdjacency** (6)
      * maintainability: 156.212
      * Class method: **constructor** (8)
         * cyclomatic: 1
         * halstead.difficulty: 3.214
      * Class method: **extension** (19)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (29)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **type** (39)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 37:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/text/FormatTextMinimal.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/text/FormatTextMinimal.js`
   * maintainability: 156.212
   * Class: **FormatTextMinimal** (7)
      * maintainability: 156.212
      * Class method: **constructor** (9)
         * cyclomatic: 1
         * halstead.difficulty: 3.214
      * Class method: **extension** (20)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (30)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **type** (40)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 38:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/text/FormatTextModules.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/text/FormatTextModules.js`
   * maintainability: 158.705
   * Class: **FormatTextModules** (7)
      * maintainability: 158.705
      * Class method: **constructor** (9)
         * cyclomatic: 1
         * halstead.difficulty: 2.5
      * Class method: **extension** (19)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (29)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **type** (39)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 39:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/formats/text/FormatTextVisibility.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/formats/text/FormatTextVisibility.js`
   * maintainability: 156.212
   * Class: **FormatTextVisibility** (6)
      * maintainability: 156.212
      * Class method: **constructor** (8)
         * cyclomatic: 1
         * halstead.difficulty: 3.214
      * Class method: **extension** (19)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **name** (29)
         * cyclomatic: 1
         * halstead.difficulty: 0.5
      * Class method: **type** (39)
         * cyclomatic: 1
         * halstead.difficulty: 0.5

* Module 40:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/transform/TransformFormat.js`
   * srcPath: `typhonjs-escomplex-commons/src/transform/TransformFormat.js`
   * maintainability: 130.284
   * Class: **TransformFormat** (26)
      * maintainability: 130.284
      * Class method: **addFormat** (33)
         * cyclomatic: 7
         * halstead.difficulty: 6.806
         * errors: (info) cyclomatic: 7 &gt; 3 @ Class Method - addFormat (33 - 63)
      * Class method: **forEach** (71)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **forEachExt** (84)
         * cyclomatic: 2
         * halstead.difficulty: 5.333
      * Class method: **forEachType** (100)
         * cyclomatic: 2
         * halstead.difficulty: 5.333
      * Class method: **format** (119)
         * cyclomatic: 6
         * halstead.difficulty: 12.235
         * errors: (info) cyclomatic: 6 &gt; 3 @ Class Method - format (119 - 142)
         * errors: (info) halstead.difficulty: 12.235 &gt; 8 @ Class Method - format (119 - 142)
      * Class method: **getFileExtensions** (149)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **&lt;anonymous&gt;** (151)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getNames** (159)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **getTypes** (169)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **&lt;anonymous&gt;** (171)
         * cyclomatic: 1
         * halstead.difficulty: 1.5
      * Class method: **isFormat** (181)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **removeFormat** (191)
         * cyclomatic: 1
         * halstead.difficulty: 1.333

* Module 41:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/utils/MathUtil.js`
   * srcPath: `typhonjs-escomplex-commons/src/utils/MathUtil.js`
   * maintainability: 128.142
   * Class: **MathUtil** (6)
      * maintainability: 128.142
      * Class method: **compactMatrix** (19)
         * cyclomatic: 1
         * halstead.difficulty: 4.9
      * Class method: **&lt;anonymous&gt;** (23)
         * cyclomatic: 2
         * halstead.difficulty: 7.875
      * Class method: **&lt;anonymous&gt;** (27)
         * cyclomatic: 2
         * halstead.difficulty: 2.8
      * Class method: **create2DArray** (43)
         * cyclomatic: 4
         * halstead.difficulty: 17.438
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - create2DArray (43 - 55)
         * errors: (warning) halstead.difficulty: 17.438 &gt; 13 @ Class Method - create2DArray (43 - 55)
      * Class method: **getMedian** (65)
         * cyclomatic: 2
         * halstead.difficulty: 18.9
         * errors: (warning) halstead.difficulty: 18.9 &gt; 13 @ Class Method - getMedian (65 - 74)
      * Class method: **&lt;anonymous&gt;** (68)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **getPercent** (84)
         * cyclomatic: 2
         * halstead.difficulty: 5
      * Class method: **toFixedTraverse** (98)
         * cyclomatic: 1
         * halstead.difficulty: 1.8
      * Class method: **toFixed** (111)
         * cyclomatic: 3
         * halstead.difficulty: 8.571
         * errors: (info) halstead.difficulty: 8.571 &gt; 8 @ Class Method - toFixed (111 - 114)

* Module 42:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/utils/ObjectUtil.js`
   * srcPath: `typhonjs-escomplex-commons/src/utils/ObjectUtil.js`
   * maintainability: 102.252
   * errors: (info) maintainability: 102.252 &lt; 115 @ Module - typhonjs-escomplex-commons/src/utils/ObjectUtil.js (1 - 199)
   * Module method: **_depthTraverse** (146)
      * cyclomatic: 5
      * halstead.difficulty: 21.636
      * errors: (info) cyclomatic: 5 &gt; 3 @ Module Method - _depthTraverse (146 - 162)
      * errors: (error) halstead.difficulty: 21.636 &gt; 20 @ Module Method - _depthTraverse (146 - 162)
   * Module method: **_getAccessorList** (173)
      * cyclomatic: 3
      * halstead.difficulty: 13.333
      * errors: (warning) halstead.difficulty: 13.333 &gt; 13 @ Module Method - _getAccessorList (173 - 198)
   * Module method: **&lt;anonymous&gt;** (185)
      * cyclomatic: 2
      * halstead.difficulty: 2.333
   * Class: **ObjectUtil** (4)
      * maintainability: 98.302
      * errors: (warning) maintainability: 98.302 &lt; 100 @ Class - ObjectUtil (4 - 132)
      * Class method: **depthTraverse** (15)
         * cyclomatic: 3
         * halstead.difficulty: 5.688
      * Class method: **getAccessorList** (33)
         * cyclomatic: 2
         * halstead.difficulty: 4.9
      * Class method: **safeAccess** (51)
         * cyclomatic: 6
         * halstead.difficulty: 17
         * errors: (info) cyclomatic: 6 &gt; 3 @ Class Method - safeAccess (51 - 68)
         * errors: (warning) halstead.difficulty: 17 &gt; 13 @ Class Method - safeAccess (51 - 68)
      * Class method: **safeSet** (83)
         * cyclomatic: 13
         * halstead.difficulty: 38.48
         * errors: (error) cyclomatic: 13 &gt; 12 @ Class Method - safeSet (83 - 131)
         * errors: (error) halstead.difficulty: 38.48 &gt; 20 @ Class Method - safeSet (83 - 131)

* Module 43:
   * filePath: `./node_modules/typhonjs-escomplex-commons/src/utils/StringUtil.js`
   * srcPath: `typhonjs-escomplex-commons/src/utils/StringUtil.js`
   * maintainability: 113.509
   * errors: (info) maintainability: 113.509 &lt; 115 @ Module - typhonjs-escomplex-commons/src/utils/StringUtil.js (1 - 192)
   * Class: **StringUtil** (6)
      * maintainability: 113.509
      * errors: (info) maintainability: 113.509 &lt; 115 @ Class - StringUtil (6 - 192)
      * Class method: **compare** (16)
         * cyclomatic: 1
         * halstead.difficulty: 2.625
      * Class method: **incrementIndent** (29)
         * cyclomatic: 1
         * halstead.difficulty: 1.667
      * Class method: **indent** (42)
         * cyclomatic: 1
         * halstead.difficulty: 3.214
      * Class method: **safeStringObject** (61)
         * cyclomatic: 5
         * halstead.difficulty: 16.667
         * errors: (info) cyclomatic: 5 &gt; 3 @ Class Method - safeStringObject (61 - 74)
         * errors: (warning) halstead.difficulty: 16.667 &gt; 13 @ Class Method - safeStringObject (61 - 74)
      * Class method: **safeStringsObject** (96)
         * cyclomatic: 1
         * halstead.difficulty: 3.5
      * Class method: **safeStringsPrependObject** (124)
         * cyclomatic: 13
         * halstead.difficulty: 44.4
         * errors: (error) cyclomatic: 13 &gt; 12 @ Class Method - safeStringsPrependObject (124 - 175)
         * errors: (error) halstead.difficulty: 44.4 &gt; 20 @ Class Method - safeStringsPrependObject (124 - 175)
      * Class method: **tagEscapeHTML** (185)
         * cyclomatic: 1
         * halstead.difficulty: 3.75
      * Class method: **&lt;anonymous&gt;** (187)
         * cyclomatic: 1
         * halstead.difficulty: 2.727

* Module 44:
   * filePath: `./node_modules/typhonjs-escomplex-module/src/ESComplexModule.js`
   * srcPath: `typhonjs-escomplex-module/src/ESComplexModule.js`
   * maintainability: 126.029
   * Class: **ESComplexModule** (8)
      * maintainability: 126.029
      * Class method: **constructor** (19)
         * cyclomatic: 2
         * halstead.difficulty: 5.143
      * Class method: **analyze** (40)
         * cyclomatic: 4
         * halstead.difficulty: 13.045
         * errors: (info) cyclomatic: 4 &gt; 3 @ Class Method - analyze (40 - 66)
         * errors: (warning) halstead.difficulty: 13.045 &gt; 13 @ Class Method - analyze (40 - 66)
      * Class method: **&lt;anonymous&gt;** (59)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **&lt;anonymous&gt;** (60)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **analyzeAsync** (78)
         * cyclomatic: 1
         * halstead.difficulty: 2
      * Class method: **&lt;anonymous&gt;** (80)
         * cyclomatic: 1
         * halstead.difficulty: 2.143

* Module 45:
   * filePath: `./node_modules/typhonjs-escomplex-module/src/index.js`
   * srcPath: `typhonjs-escomplex-module/src/index.js`
   * srcPathAlias: `typhonjs-escomplex-module`
   * maintainability: 171

* Module 46:
   * filePath: `./node_modules/typhonjs-escomplex-module/src/Plugins.js`
   * srcPath: `typhonjs-escomplex-module/src/Plugins.js`
   * maintainability: 122.046
   * Class: **Plugins** (16)
      * maintainability: 122.046
      * Class method: **constructor** (27)
         * cyclomatic: 3
         * halstead.difficulty: 10.389
         * errors: (info) halstead.difficulty: 10.389 &gt; 8 @ Class Method - constructor (27 - 42)
      * Class method: **onConfigure** (52)
         * cyclomatic: 2
         * halstead.difficulty: 7.2
      * Class method: **onEnterNode** (68)
         * cyclomatic: 2
         * halstead.difficulty: 7.5
      * Class method: **onExitNode** (81)
         * cyclomatic: 1
         * halstead.difficulty: 2.625
      * Class method: **onLoadSyntax** (94)
         * cyclomatic: 2
         * halstead.difficulty: 7.2
      * Class method: **onModuleStart** (111)
         * cyclomatic: 1
         * halstead.difficulty: 7
      * Class method: **onModuleEnd** (125)
         * cyclomatic: 1
         * halstead.difficulty: 3
