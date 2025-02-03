import React from 'react'
import { Container, LicenseButton } from '../components/OpenSourceLicense'
import { GridComponent } from '../components/GridComponent'
import { openSourceLicenseJsonList } from '../../licenses/OpenSourceLicensesJson'
import { TabNavigatorHomeIcon } from '../components/Tab';
import { useNavigation } from '@react-navigation/native';

export const OpenSourceLicense = () => {
  const navigation = useNavigation()

  return (
    <Container>
      <TabNavigatorHomeIcon
        navigation={navigation}
      />
      <GridComponent
        data={openSourceLicenseJsonList}
        renderItem={({item: inputItem}) => {
          return <LicenseButton item={inputItem} />;
        }}
      />
    </Container>
  );
};
