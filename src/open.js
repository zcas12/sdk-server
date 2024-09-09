export function open (info) {
    let form = document.createElement('form'); // 폼 태그 생성
    form.setAttribute('name', 'orderInfo');
    form.setAttribute('method', 'post');
    form.setAttribute('action', "http://localhost:8080/payment/v1"); // 태그 속성 설정

    for(const key in info){
        let input = document.createElement('input'); // 자식 요소 input 태그 생성
        input.setAttribute('name', key); // 태그 속성 설정
        input.setAttribute('value', info[key]);
        input.setAttribute('type', 'hidden');
        form.appendChild(input); // input태그를 form태그의 자식요소로 만듦
    }
    document.body.appendChild(form);

    KCP_Pay_Execute_Web( form );
}