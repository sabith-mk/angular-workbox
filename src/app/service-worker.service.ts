import { Injectable } from '@angular/core'
import { register, Hooks } from 'register-service-worker'
import { Observable, Observer, fromEvent, merge } from 'rxjs'
import { map } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  constructor(private toastr: ToastrService) { }

  public registerServiceWorker(): void {
    const serviceWorkerPath = `/sw.js`
    const options: Hooks = {
      registrationOptions: { scope: './' },
      ready: (registration) => {
        console.log('Service worker is active.')
        merge<boolean>(
          fromEvent(window, 'offline').pipe(map(() => false)),
          fromEvent(window, 'online').pipe(map(() => true)),
          new Observable((sub: Observer<boolean>) => {
            sub.next(navigator.onLine)
            sub.complete()
          })).subscribe((online) => {
            if (online) {
              this.toastr.success('Application is online, will resume any offline operations.', 'Service worker')
            } else {
              this.toastr.error('No internet connection. App is running in offline mode.', 'Service worker')
            }
          })
      },
      registered: (registration) => {
        this.toastr.success('Service worker has been registered.', 'Service worker')
      },
      cached: (registration) => {
        this.toastr.success('Application has been cached for offline use.', 'Service worker')
      },
      updatefound: (registration) => {
        this.toastr.info('Downloading new update.', 'Service worker: Update')
      },
      updated: (registration) => {
        this.toastr.success('Application has been updated.', 'Service worker: Update')
      },
      offline: () => {
        console.error('No internet connection found. App is running in offline mode.')
      },
      error: (error) => {
        console.error('Error during service worker registration:', error)
      }
    }
    register(serviceWorkerPath, options)
  }
}
