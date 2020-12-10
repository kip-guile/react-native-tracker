import React, { useContext, useEffect } from 'react'
import { Button } from 'react-native'
import { Input } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    changeName,
    stopRecording,
  } = useContext(LocationContext)
  const [saveTrack] = useSaveTrack()

  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={changeName}
          placeholder='enter name'
        />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button title='stop recording' onPress={stopRecording} />
        ) : (
          <Button onPress={startRecording} title='start recording' />
        )}
      </Spacer>
      {!recording && locations.length ? (
        <Spacer>
          <Button onPress={saveTrack} title='Save recording' />
        </Spacer>
      ) : null}
    </>
  )
}

export default TrackForm
