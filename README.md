# 📸 Test Maker: 나만의 단어장, 나만의 시험지

**Test Maker**는 책이나 노트를 사진으로 찍어 단어를 추출하고, 나만의 단어장을 만들어 학습하며, 터치 몇 번으로 암기용 시험지까지 자동으로 생성해주는 스마트 학습 앱입니다.

<br>

<p align="center">
  <img src="https://path.to/your/app/demo.gif" width="300">
</p>

<br>

## 📖 프로젝트 소개

학생이나 어학 공부를 하는 사람들은 종종 책에 있는 단어를 노트에 옮겨 적고, 외우고, 스스로 시험 보는 과정을 반복합니다. **Test Maker**는 이 지루하고 비효율적인 과정을 기술로 해결합니다.

카메라로 찍기만 하면 텍스트가 단어장으로, 단어장은 다시 시험지로 자동 변환되어 사용자는 오롯이 '학습'에만 집중할 수 있습니다.

<br>

## ✨ 주요 기능

* **📸 스마트 OCR 단어 추출**: 카메라로 책이나 문서를 촬영하면, 광학 문자 인식(OCR) 기술을 통해 원하는 단어와 그 의미를 자동으로 추출하여 단어장에 추가합니다.
* **✍️ 단어/의미 직접 추가**: OCR뿐만 아니라 사용자가 직접 단어와 뜻을 입력하여 자신만의 사전을 손쉽게 구축할 수 있습니다.
* **📚 나만의 의미 사전 구축**: 추가된 단어들은 주제별, 중요도별로 그룹화하여 체계적으로 관리할 수 있는 개인 맞춤형 사전을 제공합니다.
* **🧠 자동 문제 생성**: 단어장에 저장된 데이터를 기반으로 객관식, 주관식(단어 쓰기) 등 다양한 유형의 학습 문제를 자동으로 생성합니다.
* **📄 시험지 형태로 내보내기**: 생성된 문제들을 실제 시험지와 같은 형태로 이미지 파일(.jpg, .png)이나 PDF로 저장하고, 친구들과 공유하거나 인쇄할 수 있습니다.

<br>

## 📱 스크린샷

| OCR 촬영 화면 | 단어장 목록 | 문제 풀이 화면 |
| :---: | :---: | :---: |
| <img src="https://path.to/your/ocr-screen.png" width="250"> | <img src="https://path.to/your/wordlist-screen.png" width="250"> | <img src="https://path.to/your/quiz-screen.png" width="250"> |

<br>

## 🛠️ 기술 스택

* **Core**: `React Native`
* **State Management**: `Redux (or Zustand, Recoil)`
* **Navigation**: `React Navigation`
* **OCR**:  `Google Vision API`
* **Camera**: `react-native-vision-camera`
* **Local Storage**: `AsyncStorage` / `Realm`
* **UI/Component**: `Styled-components`

<br>

## 📜 라이선스

이 프로젝트는 [MIT](LICENSE.md) 라이선스를 따릅니다.