import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'flashcards:notifications';

/**
 * Accreditation: code taken from Udacity React Native 'UdaciFitness' lessons
 */
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}

/**
 * Accreditation: code taken from Udacity React Native 'UdaciFitness' lessons
 */
function setNotification() {
  return {
    title: 'Your big test is comming up',
    body: 'Don\'t forget to take a quiz today,',
    ios: {
      sound: true,
    },
  };
}


export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

             let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(14)
              tomorrow.setMinutes(30)

            Notifications.scheduleLocalNotificationAsync(setNotification(), {
                time: tomorrow,
                repeat: 'day',
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}