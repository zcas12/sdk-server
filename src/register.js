import axios from "axios";
export async function register(reqData) {
    const payMethod = makePayMethod(reqData.actionResult);
    const vanCode = makeVanCode(reqData.actionResult);
    reqData = {
        pay_method: payMethod,
        van_code: vanCode,
        ...reqData
    }
    const result = await axios.post('http://10.0.0.185:8080/trade/register',reqData);
    if(result.data?.Code === '0000') {
        window.location.replace(reqData?.successUrl + `?reqData=${JSON.stringify(reqData)}&resData=${JSON.stringify(result.data)}`)
    }else{
        alert(result.data?.Message)
    }
}
function makePayMethod(actionResult) {
    if (actionResult === 'card') return 'CARD'
    else if (actionResult === 'acnt') return 'BANK'
    else if (actionResult === 'vcnt') return 'VCNT'
    else if (actionResult === 'mobx') return 'MOBX'
    else if (actionResult === 'ocb' || actionResult === 'tpnt') return 'TPNT'
    else if (actionResult === 'scbl' || actionResult === 'sccl' || actionResult === 'schm') return 'GIFT'
}
function makeVanCode(actionResult) {
    if (actionResult === 'ocb') return 'SCSK'
    else if (actionResult === 'tpnt') return 'SCWB'
    else if (actionResult === 'scbl') return 'SCBL'
    else if (actionResult === 'sccl') return 'SCCL'
    else if (actionResult === 'schm') return 'SCHM'
    else return ''
}