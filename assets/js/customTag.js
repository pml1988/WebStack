class HeaderAnchor extends HTMLAnchorElement {
    get headers() {
        return this.hasAttribute('headers');
    }
    get url() {
        return this.hasAttribute('url');
    }
    static get observedAttributes() {
        return ['url','headers'];
    }

    hrefEvent() {

    }

    constructor() {
        super();
        this.addEventListener('click', e => {
            // alert('You Clicked Me!');
            e.preventDefault();
            // const result = confirm("Are you sure?");
            // if (result) window.location.href = e.target.href;
            if(this.url) {
                var url = this.attributes.url.value;
                console.log("url is:"  + url);
                var that = this;
                var headersList = [];
                if(this.headers) {
                    headersList = getCustomHeaders(this.attributes.headers.value);
                }
                xhrGetRequest(url,headersList,(response)=>{
                    that.contentWindow.contents = response;
                    that.href = 'javascript:window["contents"]';
                });
            }
        });
    }
    connectedCallback() {


    }

}

function getCustomHeaders(headers) {
    var headersList = [];
    var isObjectForm = /^{.*}$/.test(headers);
    var jsonHeaders = '';
    if(isObjectForm) {
        jsonHeaders = headers.replace(/^\{|\}$/g, '');
        jsonHeaders.split(",").forEach(function(header) {
            var itemHeader =  header.split(":");
            headersList.push([itemHeader[0], itemHeader[1]]);
        });
    }else {
        if(headers.indexOf("(") > 0 && headers.lastIndexOf(")") === headers.length - 1) {
            var methodName = headers.substring(0,headers.indexOf("("));
            var params = headers.substring(headers.indexOf("(")+1,headers.lastIndexOf(")"));
            var paramsArray = params.split(',');
            var outerFunction = window[methodName];
            if (typeof outerFunction === 'function') {
                var returnResult = outerFunction.apply(null, paramsArray);
                if(returnResult) {
                    headersList = Object.entries(returnResult);
                }
            }
        }
    }
    return headersList;
}

function xhrGetRequest(url,headersList,successCallBack) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    if(headersList) {
        headersList.forEach(function([key,value]) {
            xhr.setRequestHeader(key, value);
        });
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === this.DONE && xhr.status === 200) {
            if(successCallBack) {
                successCallBack(xhr.responseText);
            }
        }
    };
    xhr.send();
}

class HeaderIFrame extends HTMLIFrameElement {
    get headers() {
        return this.hasAttribute('headers');
    }
    get url() {
        return this.hasAttribute('url');
    }
    static get observedAttributes() {
        return ['url','headers'];
    }
    constructor() {
        super();
    }
    connectedCallback(){
        if(this.url) {
            var url = this.attributes.url.value;
            var that = this;
            var headersList = [];
            if(this.headers) {
                headersList = getCustomHeaders(this.attributes.headers.value);
            }
            xhrGetRequest(url,headersList,(response)=>{
                that.contentWindow.contents = response;
                that.src = 'javascript:window["contents"]';
            });
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
}

window.customElements.define('header-anchor', HeaderAnchor, {extends:'a'});
window.customElements.define('header-iframe', HeaderIFrame,{extends: 'iframe'});


class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener("click", event => {
            console.log("ConfirmLink click");
            if (!confirm("Do you really want to leave")) {
                event.preventDefault();
            }
        });
    }
}

customElements.define("uc-confirm-link", ConfirmLink, { extends: "a" });




class CodingDudeGravatar extends HTMLElement {
    get email() {
        return this.hasAttribute('email');
    }

    constructor() {
        super();
        console.log("CodingDudeGravatar constructor")
        this.addEventListener('click', e => {
            alert('You Clicked Me!');
        });
        this.innerText="Hello There!";
    }
    static get observedAttributes() {
        return ['email'];
    }

    connectedCallback(){
        console.log("CodingDudeGravatar connectedCallback")
        if (this.email) {
            var email = this.attributes.email.value;
            var gravatar = "https://www.gravatar.com/avatar";
            this.innerHTML = `<img src="${gravatar}"></br>${email}`
        }
        else {
            this.innerHTML = "No Email";
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("CodingDudeGravatar attributeChangedCallback")
        if (name == 'email') {
            //uncomment to see the behaviour
            alert(`The ${name} changed to ${newValue}`)
        }
    }
}

window.customElements.define('codingdude-gravatar', CodingDudeGravatar);