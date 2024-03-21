
// Это эммулятор ответов сервера для тестов

class ConnectorMock {

    setBase(url) {
        console.log("Установлен новый базовый URL: " + url);
    }

    constructor(baseURL = 'testURL', username = 'defaultUsername', password = 'defaultPassword') {

        this.pauseMSec = 1000;

        this.settings = {
            "isActive": false
        };

         this.tasks = [
            {id: 1, type: "task", name: "Задача 1", subsystem: "Подсистема 1"},
            {
                id: 2, type: "package", name: "Пакет 1", tasks: [
                    {id: 4, name: "Задача в пакете 1", subsystem: "Подсистема 2"},
                    {id: 5, name: "Задача в пакете 2", subsystem: "Подсистема 2"}]
            },
            {id: 3, type: "task", name: "Задача 2", subsystem: "Подсистема 3"},
        ];

        this.subsystems = [
            {
                "id": "t",
                "name": "Весь транспорт",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "tM",
                        "name": "Маршрутные листы",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "tS",
                        "name": "Сборка заказа",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            },
            {
                "id": "x",
                "name": "Все процессы xPL",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "xM",
                        "name": "xPL Статусы маршрутных листов",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "xR",
                        "name": "xPL Размещение после растановки межблока",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "xU",
                        "name": "xPL Отмена ЗНС по e-COMM",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            },
            {
                "id": "w",
                "name": "Все складские процессы",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "wA",
                        "name": "Аптечный хаб",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "wS",
                        "name": "Динамика работы склада",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            },
            {
                "id": "s",
                "name": "Все продажи",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "sA",
                        "name": "Аптека",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "sC",
                        "name": "Подбор товаров",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "s7",
                        "name": "Схема 702",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "sM",
                        "name": "Маркировка",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "sV",
                        "name": "Виды расчетов",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            },
            {
                "id": "b",
                "name": "Бюджетные продажи",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "bA",
                        "name": "Актуализация статусов РА",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            }
        ];
        this.robots = [
            {
                "name": "ChuckleGLaDOS",
                "subsystems": [],
                "insertDate": "2024-01-14T12:22:48",
                "thredGUID": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "",
                "status": "idle"
            },
            {
                "name": "GiggleGear",
                "subsystems": [],
                "insertDate": "2024-01-14T12:22:48",
                "thredGUID": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "",
                "status": "idle"
            },
            {
                "name": "Guffaw-BEE",
                "subsystems": [],
                "insertDate": "2024-01-14T12:22:40",
                "thredGUID": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "",
                "status": "idle"
            },
            {
                "name": "Smiles-a-C3PO",
                "subsystems": [],
                "insertDate": "2024-01-14T12:22:40",
                "thredGUID": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "",
                "status": "idle"
            },
            {
                "name": "Smiles-a-Lot",
                "subsystems": [],
                "insertDate": "2024-01-14T12:22:40",
                "thredGUID": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "",
                "status": "idle"
            }
        ];

        this.tasks = this.allTasks();
    }

    allTasks() {
        return [
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 041694be-551d-4980-81f3-320331698bce",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "9a732a54-f173-4644-a260-4ec5280754e0",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "complete",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T16:57:09",
                        "completionDate": "2024-01-07T22:05:19",
                        "launchDate": "2024-01-07T22:05:18",
                        "text": "ЭтотОбъект = XMLЗначение(Тип(\"ДокументСсылка.МаршрутныйЛист\"), \"9aeaebbf-bdb7-11ed-a21b-b47af1468eb0\").ПолучитьОбъект();\n\nЭтотОбъект.ДополнительныеСвойства.Вставить(\"ВыполнитьОбработчики\", Ложь);\nЭтотОбъект.РасчитатьСуммовыеПоказатели_Фоново(Статус);\nЭтотОбъект.Записать();",
                        "tasks": [],
                        "properties": {
                            "МарХ": true,
                            "Магистральный": false,
                            "Масса": 264.398,
                            "Объем": 1.21463,
                            "ФактическаяДатаДоставки": "0001-01-01T00:00:00",
                            "КоличествоМест": 158,
                            "ДатаОтгрузки": "2023-03-08T00:00:00",
                            "ПробегПлан": 76.469,
                            "ВремяНаЛинии": "0001-01-01T06:55:00",
                            "ПометкаУдаления": false,
                            "ПеревозчикЗаказной": false,
                            "КонвейерМСК": true,
                            "ИспользуетсяОборотнаяТара": false,
                            "ДатаЗакрытияПериодаМЛ": "2023-02-15T00:00:00",
                            "КоэффициентПаллет": 0,
                            "ДатаВыездаВРейс": "2023-03-08T00:00:00"
                        }
                    },
                    {
                        "UID": "a606a1c3-fe37-4cfa-b775-6ff99836ff54",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "complete",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T16:57:09",
                        "completionDate": "2024-01-07T22:05:19",
                        "launchDate": "2024-01-07T22:05:19",
                        "tasks": []
                    },
                    {
                        "UID": "81900a3e-1f57-43aa-8b85-fd3b41019716",
                        "name": "Запись документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T16:57:09",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "13a520a5-dc41-4675-b606-406bda7fae49",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T16:57:09",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 1dc2e5ed-607c-4184-96ea-3e5d19324013",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "6d8bf7de-a4f1-4489-a213-cd72cafbac7e",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "complete",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T19:18:44",
                        "completionDate": "2024-01-07T22:50:42",
                        "launchDate": "2024-01-07T22:50:39",
                        "tasks": []
                    },
                    {
                        "UID": "e0d2d928-fb4d-4ddb-b05c-f44e4f4d109e",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "complete",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T19:18:44",
                        "completionDate": "2024-01-07T22:50:42",
                        "launchDate": "2024-01-07T22:50:42",
                        "tasks": []
                    },
                    {
                        "UID": "8a0669b4-7795-44aa-8498-8d7f0d82937c",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "running",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T19:18:44",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 83e01860-756e-4994-8850-7b77bafa0a7d",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "cb598028-95c0-4b7b-a582-901c01b0612e",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T19:18:48",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "c123d2b6-bd07-42d8-a144-1a5004ca9447",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T19:18:48",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "66f8a069-08f2-4505-9d65-90355a79f8b5",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-03T19:18:48",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "70bfa710-cf0c-4959-a85b-43772ef06271",
                "name": "Задание 63 839 901 934 310",
                "type": "task",
                "status": "wait",
                "subsystemTitle": "ТС",
                "creationDate": "2024-01-03T21:05:34",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": []
            },
            {
                "UID": "22569315-b98f-4535-980e-7e2649b9dd43",
                "name": "Задание 63 839 901 934 317",
                "type": "task",
                "status": "wait",
                "subsystemTitle": "ТС",
                "creationDate": "2024-01-03T21:05:34",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": []
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 92d59c62-a102-4e70-9d17-395b2489d0c3",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "0fe1d5e2-c504-402b-9a62-e9489b6d9652",
                        "name": "Задание пакета 2",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС",
                        "creationDate": "2024-01-03T21:05:34",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "4816382a-b099-4087-b443-3ecc8f8265d0",
                        "name": "Задание пакета 1",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС",
                        "creationDate": "2024-01-03T21:05:34",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет c0e81cdc-c204-4e7e-8924-ff8c2cd33a09",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "48302a55-e3bd-4e75-8d64-eac929eded18",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:47",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "78e2069a-dbbe-4973-b43a-2e6cef2017b7",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:47",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "e801a033-57f9-407a-8498-7109b7662661",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:47",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 3d50755e-2c85-44fd-9728-4fb48f0fce47",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "255ed07e-b0e5-40e6-a643-8d5693c2c7f5",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:48",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "9e70a05a-66af-46e4-aa39-a2f512e12d62",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:48",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "f9751b94-2062-4224-9268-262e6ebd6fc2",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:48",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 5263695b-d016-45ae-9ac4-c4cd51e63f51",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "2048a720-06f7-41c9-a58f-473b2ed9a2f6",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:48",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "f0390a17-62bc-4b69-acb4-cc8a4294407c",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:48",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "6a68b3f6-d5e7-45d2-80e5-eb6e1196ce7a",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:48",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет b5474225-d719-43bb-b7e4-7d318b620720",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "d83a3acf-9702-493c-977f-0568b00bb2c7",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "305c1276-78e0-429b-81b6-17c0bee90603",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "dfa324a6-75cc-46ab-91dc-d9e38df0deed",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 2863c4a1-cc79-4044-9e6e-cef1dde311d0",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "9b4f7036-1ce9-45f9-9c41-92d5a5c90e83",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "143f04f6-55eb-43cc-b381-b67ed8517828",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "3867f3bd-39f3-468e-ad52-47b554797051",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет dfe08edd-1ab0-4776-8da4-d7cc82baa775",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "1d512e0b-7e6b-4250-b711-6183fb70d148",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "d1df8ff0-b176-4178-ba95-eafad35733f4",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "a65641d7-e55c-4ccf-b10b-6b87319d224e",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 77da9f0c-3f5d-45fd-9832-a24d84b48961",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "09dc12b2-dbe3-43a7-bdc2-102e2e43e084",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "831bcf52-3cca-4530-861a-a39dcb5a754b",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "301da758-43d1-4a6e-a5d8-ebb9408afe16",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:49",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет ad2be601-85d7-4b64-9fd1-b0c53c5a5edc",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "a42cef7c-a5a2-4180-b056-5def03170b4d",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "e6e1bf8a-cb6e-46b2-b3d2-52d5a494b1d9",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "3b1ea960-60af-4ba7-8029-4548c70e7ced",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 3fe26db8-1676-497e-8bf9-5fc792940acd",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "71d63a58-2bc7-436c-8ae6-3386e6e0438a",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "dd978e4a-476e-4c87-a5a4-ee76f8523340",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "fbe626f1-3835-4140-8566-cec383ee1119",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет db0b9947-dfa0-4e74-b60b-547a27abcc33",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "986477c5-64ba-4619-92c5-2d1b43c9a2d1",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "8b59bd98-47c8-4387-96fe-91aa44197f28",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "8c6aa822-5871-445a-8d3a-1202faa53d32",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "error",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 3bb49d10-2936-4ac4-bb32-e3fa6d6cf499",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "783af0c4-a2aa-4d47-8367-68d44de7cc10",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "f83fd307-f51b-4851-b050-7dcbc8dcb791",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "9a650124-9b23-4b42-b333-03d9388d960a",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:50",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 246498e4-ee1f-4043-803d-7eed4f704750",
                "type": "package",
                "status": "",
                "subsystemTitle": "",
                "creationDate": "0001-01-01T00:00:00",
                "completionDate": "0001-01-01T00:00:00",
                "launchDate": "0001-01-01T00:00:00",
                "tasks": [
                    {
                        "UID": "530eb8d0-a194-424a-8d99-30e0e6bc3bc1",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "status": "complete",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:51",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "d6c62f13-6b96-47e0-9b8f-6d4359aad579",
                        "name": "Расчет итогов",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:51",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    },
                    {
                        "UID": "eb19a5ca-5276-4a10-a916-40d26f0062b0",
                        "name": "Проведение документа",
                        "type": "task",
                        "status": "wait",
                        "subsystemTitle": "ТС.МЛ",
                        "creationDate": "2024-01-07T12:00:51",
                        "completionDate": "0001-01-01T00:00:00",
                        "launchDate": "0001-01-01T00:00:00",
                        "tasks": []
                    }
                ]
            }
        ];
    }

    async getRobots() {
        return this.robots;
    }

    async updateRobot(updatedRobot) {
        const index = this.robots.findIndex(robot => robot.name === updatedRobot.name);
        if (index !== -1) {
            this.robots[index] = updatedRobot;
        }
    }

    async deleteRobot(robot) {
        await sleep(this.pauseMSec);
        const index = this.robots.findIndex(r => r.name === robot.name);
        if (index !== -1) {
            this.robots.splice(index, 1);
        }
    }

    async getTasks(limit, filters, subsystems) {
        await sleep(1000);
        return this.tasks.slice(0, limit);
    }


    async getTask(UID) {
        await sleep(this.pauseMSec);
        const tasks = this.allTasks();
        return tasks.find(task => task.UID === UID);
    }

    async getSettings() {
        return this.settings;
    }

    async setSettings(settings) {
        this.settings = !this.settings;
    }

    async getSubsystems() {
        return this.subsystems;
    }

    async addRobot(robot) {
        await sleep(this.pauseMSec);
        this.robots.push(new Robot("robot"));
    }

    async updateSubsystem(subsystem) {
        await sleep(this.pauseMSec);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}