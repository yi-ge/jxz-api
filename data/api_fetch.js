import fetch from 'node-fetch';

const utilURI = "http://dev.manager.boutiquer.net:8080";
const requestTimeout = 20000;
class ApiFetch {
    constructor() {
    }

    /**
     * 超时请求
     * @param fn
     * @returns {Function}
     */
    static factoryOverTime(fn) {
        function t(fn, uri, query) {
            return new Promise((resolve, reject)=> {
                let state = 0,
                    st = setTimeout(()=> {
                        if (state == 1)  return;
                        state = 2;
                        resolve({code: 10000, msg: "网络超时"});
                    }, requestTimeout);
                fn.apply(void(0), [uri, query]).then(result=> {
                    if (state == 2) return;
                    state = 1;
                    clearTimeout(st);
                    resolve(result);
                }).catch(e=> {
                    reject(e);
                });
            }).then((result)=> {
                return result;
            });
        }
        return (uri, query)=> {
            return t(fn, uri, query);
        }
    }

    /**
     * 请求接口
     * @param uri
     * @param query
     * @constructor
     */
    InterFace(uri, query) {
        return fetch(uri, {
            method: "POST",
            body: JSON.stringify(query),
            headers:{'Content-Type': 'application/json',}
        }).then(result=> {
            return result.json();
        });
    }

    /**
     * 工具类工厂函数
     * @param host
     * @returns {Function}
     */
    factoryUtilInterface(host) {
        return (uri, query)=> {
            console.log("======start======");
            console.log('uri=======>', uri);
            console.log('body======>', query);
            return this.InterFace(`${host}${uri}`, query).then(result=> {
                console.log("=====result======>",result);
                return result;
            }).catch(e=>{
                throw e;
            });
        }
    }
}

const apiFetch = new ApiFetch();
const UtilApi = ApiFetch.factoryOverTime(apiFetch.factoryUtilInterface(utilURI));
export {
    UtilApi
}
