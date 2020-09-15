class utils {

    static getSchedule() {
        var openApi

        var today = new Date()
        var inicioExtend = new Date();
        inicioExtend.setHours(20,30,0); // 8.30 pm
        var finExtend = new Date();
        finExtend.setHours(3,59,0); // 4.00 am

        if (today >= inicioExtend && today <= finExtend) {
        openApi = "@account-extends" 
        } else {
        openApi = "@account-opening"
        }

        return openApi
    }
  }
  
  export default utils;