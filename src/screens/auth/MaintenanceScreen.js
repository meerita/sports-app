/** @format */

// GENERAL
import { t } from '../../services/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import React, { useEffect } from 'react';

// STORE DATA & ACTIONS
import { fetchGlobalVariables } from '../../store/actions/general';

// COMPONENTS
import ButtonFilled from '../../components/Buttons/Filled/ButtonFilled';
import HeadlineFive from '../../components/type/HeadlineFive';

export default function MaintenanceScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Aquí puedes hacer la llamada a la API para actualizar el estado de maintenance
      dispatch(fetchGlobalVariables());
    }, 10 * 60 * 1000); // Este hook se ejecuta cada 10 minutos (en milisegundos)

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente deja de montarse
  }, []);

  const handleRefreshPress = () => {
    // Aquí puedes hacer la llamada a la API para actualizar el estado de maintenance
    dispatch(fetchGlobalVariables());
  };

  const isMaintenance = useSelector(state => state.general.maintenance);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
    >
      <HeadlineFive style={{ textAlign: 'center', marginBottom: 16 }}>
        {t('welcome:maintenance.description')}
      </HeadlineFive>
      <ButtonFilled
        style={{ flexGrow: 0 }}
        onPress={() => handleRefreshPress()}
      >
        {t('common:refresh')}
      </ButtonFilled>
    </View>
  );
}
