/** @format */

import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGlobalVariables } from '../../store/actions/general';

export default function MaintenanceScreen() {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Minide is under maintenance. We will activate the service soon
      </Text>
    </View>
  );
}
