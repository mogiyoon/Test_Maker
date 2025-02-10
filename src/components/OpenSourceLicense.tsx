import React from "react";
import { useState } from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
`
export const ExplainContainer = styled.View`
`
export const InLicenseButton = styled.TouchableOpacity`
  border-bottom-width: 0.5px;
  min-height: 30px;
  padding: 5px;
  justify-content: center;
`
export const LicenseText = styled.Text`
  font-size: 10px;
`

export const LicenseButton = (item) => {
  const [isOpenLicense, setIsOpenLicense] = useState(false)
  const outItem = item.item

  return (
    <InLicenseButton
      onPress={() => setIsOpenLicense(!isOpenLicense)}
    >
      <LicenseText>
        {outItem.libraryName}
      </LicenseText>
      {isOpenLicense ? (
        <ExplainContainer>
          <LicenseText>
          {'\n'}
          {outItem.version ? 'version: ' + outItem.version + '\n' + '\n' : null}
          {outItem._license ? 'license: ' + outItem._license + '\n' + '\n' : null}
          {outItem._description ? 'description: ' + outItem._description + '\n' + '\n' : null}
          {outItem.homepage ? 'homepage: ' + outItem.homepage + '\n' + '\n' : null}
          {outItem.author?.name ? 'author - name: ' + outItem.author.name + '\n' + '\n' : null}
          {outItem.author?.email ? 'author - email: ' + outItem.author.email + '\n' + '\n' : null}
          {outItem.repository?.type ? 'repository - type: ' + outItem.repository.type + '\n' + '\n' : null}
          {outItem.repository?.url ? 'repository - url: ' + outItem.repository.url + '\n' + '\n' : null}
          {outItem.repository?.directory ? 'repository - directory: ' + outItem.repository.directory + '\n' + '\n' : null}
          {outItem._licenseContent ? 'licenseContent: ' + outItem._licenseContent + '\n' + '\n' : null}
        </LicenseText>
        </ExplainContainer>
      ) : (
        null
      )}
    </InLicenseButton>
  )
}