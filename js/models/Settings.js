class Settings {
    constructor(isActive) {

        this.isActive = isActive;

        this.url_start = 'http://1seis.puls.local/';
        this.url_end = '/hs/queue_actions/';
        
        this.listBases = [
            {url: 'EIS_CB', name: 'ЦБ'},
            {url: 'EIS_MOW', name: 'Москва'},
            {url: 'EIS_SPB', name: 'Санкт-Петербург'},
            {url: 'EIS_NSK', name: 'Новосибирск'},
            {url: 'EIS_KRK', name: 'Екатеренбург'},
            {url: 'EIS_KRR', name: 'Краснодар'},
            {url: 'EIS_KZN', name: 'Казань'},
            {url: 'EIS_SAM', name: 'Самара'},
            {url: 'EIS_IRK', name: 'Иркутск'},
            {url: 'EIS_HBR', name: 'Хабаровск'},
            {url: 'EIS_VRN', name: 'Воронеж'},
            {url: 'EIS_VLG', name: 'Волгоград'},
            {url: 'EIS_BRN', name: 'Брянск'},
            {url: 'EIS_YAR', name: 'Ярославль'},
        ];
    }
    static getInstance() {
        if (!Settings.instance) {
            Settings.instance = new Settings();
        }
        return Settings.instance;
    }
}