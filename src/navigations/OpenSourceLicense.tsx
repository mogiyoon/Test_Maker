import React from 'react'
import { Container, LicenseButton } from '../components/OpenSourceLicense'
import { GridComponent } from '../components/GridComponent'
import { openSourceLicenseJsonList } from '../../licenses/OpenSourceLicensesJson'

export const OpenSourceLicense = () => {
  return (
    <Container>
      <GridComponent
        data={openSourceLicenseJsonList}
        renderItem={({item: inputItem}) => {
          return <LicenseButton item={inputItem} />;
        }}
      />
    </Container>
  );
};
