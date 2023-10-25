# 디렉터리 구조

```
├── css
├── page
├── src
|  ├─ constructor
|  ├─ handler
|  │  └─ buttons
|  ├─ imageColorPicker
|  ├─ utils
|  │  └─regex
|  └─views
└──
```

- 명암비
  캔버스 사용해서 화가들이 사용하는 팔레트 모양을 만들어 보기

## 9 / 19

- 색상 타입 변경 기능 구현 완료
- 베이스 색상 변경 기능 추가

## 9 / 20

- 보색이용 색반전
- 메인, 베이스 색 교체 기능 추가
- 검색창에 색상 입력시 해당 색상 코드에 맞는 타입으로 변환
- 검색 미리보기 기능 구현 중 60% 진행

- type : RGB에서 보색 변경 시 var 변수가 출력되는 현상 발견 // 해결
-

## 9 / 24

- 검색 결과 클릭 시 색 반영
- 정규 색상에 포함되는 문자열 입력 시에도 색 적용되도록 변경

## 9 / 25

- 단어 검색 기능 추가
- 검색 미리보기 추가

## 9 / 27

- settingObj => colorPalette 수정중 -
- updatePaletteColor 인수 수정 필요 -
- 핸들러 모으기 중 -
- colorType 변경 후 색 변경시 컬러타입 변경되는 문제 발생

## 10 /2

- colorpicker 수정 시 basecolor 초기화됨
- colorinput 변경 시 팔레트에 반영 안되서 색 교환 시 예전 값으로 적용됨

## 10 / 4

- 뷰 업데이트를 ColoPaletteList 인스턴스의 메서드를 이용하도록 수정
- 팔레트 넘기기 기능 추가
- 팔레트 변경 시 색상이 transtion의 영향을 받도록 수정

## 10 /5

- 팔레트 타이틀 보여주는 애니메이션 추가
-

## 10 / 7

- colorItemBox 디자인 수정 및 exChangeButton 추가

# Reference

- https://colors.muz.li/color/1a1a1a

# 프로젝트

## 중점적으로 생각한것

- 생성자 함수, 클래스의 활용
- 이벤트 위임, 이벤트 버블링

## 알게 된것

- 이벤트 버블링
- 프로토타입, 정적 메서드, 클로저 경험
- 클래스를 이용한 간단한 Component 제작
- Observer 패턴 사용

# 10월 25일

- [(구)팔레트 리스트 버튼 => 팔레트 타입 변경 버튼] 버튼 기능 수정수정
- Safari vh 측정 방식으로 인한 팔레트 레이아웃 불균형 문제 개선
- Safari 환경 정책 문제로 ColorPicer 아이콘이 정상 동작하지 않음으로인해 Safari 개별 ColorPicker 추가
- 가로 768px 이하에서 글자 크기로 인한 Overlay-Item 비정상적인 크기 문제 수정
- 디바이스 가로 길이에 따라 반응형으로 PaletteItemCounts 조정 및 이에 따른 RGB 팔레트 색칠 알고리즘 추가.
- PaletteItem hover 시 나타나는 버튼들 색상 오류 FIX

# 할일

- 배경 색상 전환 애니메이션 수정

- 정규식 수정

- 반응형 수정

- rgb 팔레트 r,g,b 순서 전환

- 되돌리기 기능 추가
- 팔레트 타입 메뉴 위치 수정

- resize itemCounts debounce 적용
- colorpicekr input도 가능하면 적용

- safari colorPicker custom

## 버그

- 아이패드 환경에서 rgb 타입때 레이아웃이 이상해짐
- 아이패드에서 컬러picker 동작
- resize 반영 시 toolbox colorpicker value 오류
- 255,249,148 에서 undefined .. 재현 안됨
