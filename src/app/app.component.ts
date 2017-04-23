import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    })
    this.registerDevice()
    this.receiveNotification()
  }

  registerDevice(){
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });
  }

  /**
	 * Recibe las notificaciones 
	 * @returns {Promise<any>}
	 * @memberOf BackUser
	 */
	receiveNotification(): Promise<any> {
		return new Promise(data => {
			this.push.rx.notification()
				.subscribe((msg) => {
					console.log(msg)
					alert(msg.title + ': ' + msg.text);
				});
		})
	}
}

