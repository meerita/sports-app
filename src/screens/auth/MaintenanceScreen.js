/** @format */

import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGlobalVariables } from '../../store/actions/general';

export default function MaintenanceScreen() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  // we will ask for globalvariables in this point
  useEffect(() => {
    dispatch(fetchGlobalVariables());
  }, []);

  const refreshHandler = () => {
    try {
      setRefreshing(true);
      dispatch(fetchGlobalVariables());
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Minide is under maintenance. We will activate the service soon. This
        screen will refresh every 10 minutes.
      </Text>
      <Button onPress={() => refreshHandler()} title='refrescar' />
    </View>
  );
}
