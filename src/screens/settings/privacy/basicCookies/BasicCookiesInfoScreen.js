/** @format */

import { View, Text } from 'react-native';
import React from 'react';
import ScrollViewLayout from '../../../../components/Layouts/ScrollViewLayout/ScrollViewLayout';
import BodyTwo from '../../../../components/type/BodyTwo';
import SubHeader from '../../../../components/SubHeader/SubHeader';

export default function BasicCookiesInfoScreen(props) {
  return (
    <ScrollViewLayout>
      <BodyTwo style={{ padding: 16 }}>
        MINIDE usa cookies básicas en la app para que el funcionamiento pueda
        ser posible. Sin estas cookies no podemos ofrecerte la experiencia de
        navegación. La cookies que almacenamos en tu teléfono es esta:
      </BodyTwo>
      <SubHeader title='Cookie de usuario' />
      <BodyTwo style={{ paddingHorizontal: 16 }}>
        Almacenamos el número de ID de tu usuario, el token de validación, el
        nombre de usuario y el email. La cookie es persistente mientras estés
        logueado, al cerrar sesión, esta cookie es inmediatamente eliminada.
      </BodyTwo>
    </ScrollViewLayout>
  );
}

// NAVIGATION OPTIONS

export const screenOptions = navData => {
  return {
    headerTitle: 'Cookies básicas',
    presentation: 'modal',
  };
};
