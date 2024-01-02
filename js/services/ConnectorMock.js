
// Это эммулятор ответов сервера для тестов

class ConnectorMock {

    constructor(baseURL = 'testURL', username = 'defaultUsername', password = 'defaultPassword') {

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
                "id": "ТС",
                "name": "Весь транспорт",
                "children": [
                    {
                        "id": "МЛ",
                        "name": "Маршрутные листы"
                    },
                    {
                        "id": "Сборка",
                        "name": "Сборка заказа"
                    }
                ]
            },
            {
                "id": "xPL",
                "name": "Все процессы xPL",
                "children": [
                    {
                        "id": "МаршрутныеЛисты",
                        "name": "Все процессы xPL"
                    },
                    {
                        "id": "РазмещениеПослеМежблока",
                        "name": "Все процессы xPL"
                    }
                ]
            },
            {
                "id": "WMS",
                "name": "Все складские процессы",
                "children": [
                    {
                        "id": "АптечныйХаб",
                        "name": "Аптечный хаб"
                    }
                ]
            },
            {
                "id": "Продажи",
                "name": "Все продажи",
                "children": [
                    {
                        "id": "Аптека",
                        "name": "Продажи.Аптека"
                    },
                    {
                        "id": "ПодборТоваров",
                        "name": "Продажи.ПодборТоваров"
                    },
                    {
                        "id": "Схема_702",
                        "name": "Продажи.Схема_702"
                    },
                    {
                        "id": "Маркировка",
                        "name": "Продажи.Маркировка"
                    },
                    {
                        "id": "ВидыРасчетов",
                        "name": "Продажи.ВидыРасчетов"
                    }
                ]
            },
            {
                "id": "БюджетныеПродажи",
                "name": "БюджетныеПродажи",
                "children": [
                    {
                        "id": "АктуализацияСтатусовРА",
                        "name": "БюджетныеПродажи.АктуализацияСтатусовРА"
                    }
                ]
            }
        ];
        this.robots = [
            new Robot(1, "Робот 1", ),
            new Robot(2, "Робот 2", ),
        ];
    }
    getRobots() {
        return this.robots;
    }
}