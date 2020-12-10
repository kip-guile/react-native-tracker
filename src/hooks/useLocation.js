import { useState, useEffect } from 'react'
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from 'expo-location'

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null)

  useEffect(() => {
    let subscriber
    const startWatching = async () => {
      try {
        let status = await requestPermissionsAsync()
        sebscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          (location) => {
            callback(location)
          }
        )
        if (!status.granted) {
          setErr('denied')
        } else {
          setErr(null)
        }
      } catch (e) {
        setErr(e)
      }
    }
    if (shouldTrack) {
      startWatching()
    } else {
      if (subscriber) {
        subscriber.remove()
      }
      subscriber = null
    }

    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  return [err]
}
