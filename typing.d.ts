// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpRequestConfig } from 'luch-request'

declare module 'luch-request' {
  interface HttpRequestConfig {
    custom: {
      showLoading?: boolean
      showError?: boolean
    }
  }
}
