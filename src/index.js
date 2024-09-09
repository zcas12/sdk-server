var scriptElement = document.createElement('script');
scriptElement.src = 'https://testspay.kcp.co.kr/plugin/kcp_spay_hub.js?v=' + Date.now();
scriptElement.async = true;
document.head.appendChild(scriptElement);

import {open} from "./open"
import {register} from "./register"
export {open,register};