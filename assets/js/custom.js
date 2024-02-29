function hello() {
    console.log("hello");
}
class HeaderIFrame extends HTMLIFrameElement {
    constructor() {
        super();
    }
    connectedCallback() {
        // Retrieve the value of the 'headers' attribute
        const headersAttribute = this.getAttribute("headers");
        console.log("headersAttribute ="  +headersAttribute);
        console.log("window headersAttribute ="  +window[headersAttribute]);
        // console.log("window hello headersAttribute ="  + window['hello']);
        // Check if the 'headers' attribute is set and if it is a function
        if (headersAttribute && typeof window[headersAttribute] === "function") {
            // Call the function specified in the 'headers' attribute
            window[headersAttribute]();
        }
    }
}

window.customElements.define('header-iframe', HeaderIFrame, { extends: 'iframe' });

//
//
// class HeaderAnchor extends HTMLAnchorElement {
//     constructor() {
//         super();
//     }
// }
//
// class HeaderIFrame extends HTMLIFrameElement {
//     get headers() {
//         return this.hasAttribute('headers');
//     }
//     get url() {
//         return this.hasAttribute('url');
//     }
//     static get observedAttributes() {
//         return ['url','headers'];
//     }
//     constructor() {
//         super();
//     }
//
//     connectedCallback(){
//         if(this.url) {
//             var url = this.attributes.url.value;
//             var that = this;
//             var xhr = new XMLHttpRequest();
//             xhr.open('GET', url);
//             xhr.onreadystatechange = function () {
//                 //监听xhr对象的请求状态readyState；与服务器响应的状态status
//                 if (xhr.readyState === this.DONE && xhr.status === 200) {//固定写法判断
//                     // 获取服务器响应的数据
//                     that.contentWindow.contents = xhr.responseText;
//                     that.src = 'javascript:window["contents"]';
//                 }
//             };
//             if(this.headers) {
//                 var headers = this.attributes.headers.value;
//                 var isObjectForm = /^{.*}$/.test(headers);
//                 var jsonHeaders = '';
//                 if(isObjectForm) {
//                     jsonHeaders = headers.replace(/^\{|\}$/g, '');
//                     jsonHeaders.split(",").forEach(function(header) {
//                         var itemHeader =  header.split(":");
//                         xhr.setRequestHeader(itemHeader[0], itemHeader[1]);
//                     });
//                 }else {
//                     if(headers.indexOf("(") > 0 && headers.lastIndexOf(")") === headers.length - 1) {
//                         var methodName = headers.substring(0,headers.indexOf("("));
//                         var params = headers.substring(headers.indexOf("(")+1,headers.lastIndexOf(")"));
//                         var paramsArray = params.split(',');
//                         var outerFunction = window[methodName];
//                         if (typeof outerFunction === 'function') {
//                             var returnResult = outerFunction.apply(null, paramsArray);
//                             if(returnResult) {
//                                 Object.entries(returnResult).forEach(function([key,value]) {
//                                     xhr.setRequestHeader(key, value);
//                                 });
//                             }
//                         }
//                     }
//                 }
//             }
//             xhr.send();
//         }
//     }
//
//     attributeChangedCallback(name, oldValue, newValue) {
//     }
// }
//
// window.customElements.define('header-anchor', HeaderAnchor, {extends:'a'});
// window.customElements.define('header-iframe', HeaderIFrame,{extends: 'iframe'});
//
//
// class ConfirmLink extends HTMLAnchorElement {
//     connectedCallback() {
//         this.addEventListener("click", event => {
//             console.log("ConfirmLink click");
//             if (!confirm("Do you really want to leave")) {
//                 event.preventDefault();
//             }
//         });
//     }
// }
//
// customElements.define("uc-confirm-link", ConfirmLink, { extends: "a" });
//
//
//
//
// class CodingDudeGravatar extends HTMLElement {
//     get email() {
//         return this.hasAttribute('email');
//     }
//
//     constructor() {
//         super();
//         console.log("CodingDudeGravatar constructor")
//         this.addEventListener('click', e => {
//             alert('You Clicked Me!');
//         });
//         this.innerText="Hello There!";
//     }
//     static get observedAttributes() {
//         return ['email'];
//     }
//
//     connectedCallback(){
//         console.log("CodingDudeGravatar connectedCallback")
//         if (this.email) {
//             var email = this.attributes.email.value;
//             var gravatar = "https://www.gravatar.com/avatar";
//             this.innerHTML = `<img src="${gravatar}"></br>${email}`
//         }
//         else {
//             this.innerHTML = "No Email";
//         }
//     }
//
//     attributeChangedCallback(name, oldValue, newValue) {
//         console.log("CodingDudeGravatar attributeChangedCallback")
//         if (name == 'email') {
//             //uncomment to see the behaviour
//             alert(`The ${name} changed to ${newValue}`)
//         }
//     }
// }
//
// window.customElements.define('codingdude-gravatar', CodingDudeGravatar);