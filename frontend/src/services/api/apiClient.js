import axios from 'axios'
import { BACKEND_ENDPOINTS } from './endpoints'
/**
 * Обертка надо клиентом
 */
class ApiClient {
  constructor(options = {}) {
    // заголовки по-умолчанию
    this.defaultHeaders = options.headers || {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    // создание экземпляра клиента
    this.client =
      options.client ||
      axios.create({
        baseURL: process.env.API_URL,
        headers: this.defaultHeaders
      })
  }

  urlFormat(url, args) {
    let regex = /{(.*?)}/g

    return url.replace(regex, (str, d) => {
      let key = d.trim()
      return args[key]
    })
  }
}

/**
 * прокси объект для динамического вызова функций апи
 */
export default new Proxy(new ApiClient(), {
  get: function(target, name) {
    if (BACKEND_ENDPOINTS[name] !== undefined) {
      return ({ params = {}, data = {}, args = {} } = {}) => {
        debugger
        return target
          .client({
            method: BACKEND_ENDPOINTS[name].method,
            url: target.urlFormat(BACKEND_ENDPOINTS[name].url, args),
            data: data,
            params: params
          })
          .then(serverResponse => serverResponse.data)
          .catch(() => {
            throw new Error('Server response error')
          })
      }
    } else {
      // Если вызов не относится к вызову стандартного апи, то вызываем напрямую из объекта
      return target[name]
    }
  }
})
