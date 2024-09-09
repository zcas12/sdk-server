var express = require("express");
var router = express.Router();
const axios = require('axios');
const cert = '-----BEGIN CERTIFICATE-----MIIDgTCCAmmgAwIBAgIHBy4lYNG7ojANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJLUjEOMAwGA1UECAwFU2VvdWwxEDAOBgNVBAcMB0d1cm8tZ3UxFTATBgNVBAoMDE5ITktDUCBDb3JwLjETMBEGA1UECwwKSVQgQ2VudGVyLjEWMBQGA1UEAwwNc3BsLmtjcC5jby5rcjAeFw0yMTA2MjkwMDM0MzdaFw0yNjA2MjgwMDM0MzdaMHAxCzAJBgNVBAYTAktSMQ4wDAYDVQQIDAVTZW91bDEQMA4GA1UEBwwHR3Vyby1ndTERMA8GA1UECgwITG9jYWxXZWIxETAPBgNVBAsMCERFVlBHV0VCMRkwFwYDVQQDDBAyMDIxMDYyOTEwMDAwMDI0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppkVQkU4SwNTYbIUaNDVhu2w1uvG4qip0U7h9n90cLfKymIRKDiebLhLIVFctuhTmgY7tkE7yQTNkD+jXHYufQ/qj06ukwf1BtqUVru9mqa7ysU298B6l9v0Fv8h3ztTYvfHEBmpB6AoZDBChMEua7Or/L3C2vYtU/6lWLjBT1xwXVLvNN/7XpQokuWq0rnjSRThcXrDpWMbqYYUt/CL7YHosfBazAXLoN5JvTd1O9C3FPxLxwcIAI9H8SbWIQKhap7JeA/IUP1Vk4K/o3Yiytl6Aqh3U1egHfEdWNqwpaiHPuM/jsDkVzuS9FV4RCdcBEsRPnAWHz10w8CX7e7zdwIDAQABox0wGzAOBgNVHQ8BAf8EBAMCB4AwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEAg9lYy+dM/8Dnz4COc+XIjEwr4FeC9ExnWaaxH6GlWjJbB94O2L26arrjT2hGl9jUzwd+BdvTGdNCpEjOz3KEq8yJhcu5mFxMskLnHNo1lg5qtydIID6eSgew3vm6d7b3O6pYd+NHdHQsuMw5S5z1m+0TbBQkb6A9RKE1md5/Yw+NymDy+c4NaKsbxepw+HtSOnma/R7TErQ/8qVioIthEpwbqyjgIoGzgOdEFsF9mfkt/5k6rR0WX8xzcro5XSB3T+oecMS54j0+nHyoS96/llRLqFDBUfWn5Cay7pJNWXCnw4jIiBsTBa3q95RVRyMEcDgPwugMXPXGBwNoMOOpuQ==-----END CERTIFICATE-----';
const querystring = require('querystring');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

/* 결제 요청 */
router.post('/payment/v1',async function (req, res) {
    const body = req.body;

    if (req.body?.res_cd === '0000') {
        const reqData = {
            tran_cd: body.tran_cd,
            site_cd: body.site_cd,
            kcp_cert_info: cert,
            enc_data: body.enc_data,
            enc_info: body.enc_info,
            ordr_mony: body.good_mny// 결제요청금액   ** 1 원은 실제로 업체에서 결제하셔야 될 원 금액을 넣어주셔야 합니다. 결제금액 유효성 검증 **
        };

        /*승인 요청*/
        const result = await axios.post('https://stg-spl.kcp.co.kr/gw/enc/v1/payment', reqData);

        /*결과값 세팅*/
        const query = querystring.stringify(result.data);

        if(result.data?.res_cd === '0000') res.redirect(body?.successUrl+'?'+query)
        else res.redirect(body?.failUrl)
    }else{
        res.redirect(body?.failUrl)
    }
});

/*모바일-거래등록*/
router.post('/trade/register',async function (req, res){
    /*거래등록 API REQ DATA*/
    const reqData = {
        kcp_cert_info: cert,
        ...req.body
    };
    const result = await axios.post('https://stg-spl.kcp.co.kr/std/tradeReg/register',reqData)
    res.send(result.data)
});
/*모바일 거래승인요청*/
router.post('/mobile/order', async function (req,res){
    const body = req.body
    const reqData = {
        tran_cd: body.tran_cd,
        site_cd: body.site_cd,
        kcp_cert_info: cert,
        enc_data: body.enc_data,
        enc_info: body.enc_info,
        ordr_mony: body.good_mny// 결제요청금액   ** 1 원은 실제로 업체에서 결제하셔야 될 원 금액을 넣어주셔야 합니다. 결제금액 유효성 검증 **
    };

    /*승인 요청*/
    const result = await axios.post('https://stg-spl.kcp.co.kr/gw/enc/v1/payment', reqData);

    const query = querystring.stringify(result.data);
    res.redirect('http://localhost:3000/mobile/payment?' + query);

});

module.exports = router;