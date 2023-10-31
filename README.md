# ColorGenerator (색상 생성 프로그램)

<img src="https://github.com/dnrgus1127/colorProject/assets/65962363/2d932999-66e5-439e-b9db-768e3b7bb4da" width="49%"/>
<img src="https://github.com/dnrgus1127/colorProject/assets/65962363/f97db4e6-7b65-40ce-8066-01a0e630d516" width="49%"/>


# ColorGenerator v 1.0

> 개발 시에 필요한 색상을 편하게 찾을 수 있게 도와주는 웹 페이지.<br>
> 개발 기간 : 2023.09.19 ~ 2023.10.29

## 개발 목적

- 프로젝트들을 진행하면서 디자인에 맞는 색상을 찾는게 귀찮을 때가 있어서 색상을 찾는데 도움이 되기 위함
- 바닐라 자바스크립트 (이벤트, 프로토타입, 클래스, 모듈, DOM API 등)을 깊게 학습하면서 기본에 대한 이해도를 높이기 위한 프로젝트

# Stacks

## Environment

<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## Config

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white">
<img src="https://img.shields.io/ba![Snipaste_2023-10-31_14-38-07](https://github.com/dnrgus1127/colorProject/assets/65962363/12405190-d428-4dff-b9c3-138acfd71eef)
dge/webpack-8DD6F9?style=for-the-badge&logo=npm&logoColor=white">

## Language

<img src="https://img.shields.io/badge/javscript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">

# 디렉터리 구조

```
├── css
├── dist // After 트랜스파일링
├── node_modules
├── src
|  ├─ browser // 브라우저 호환성 관련 함수들
|  ├─ handler
|  ├─ component // 재사용 웹 컴포넌트
|  ├─ core // 부모 클래스들
|  ├─ store // Observer 패턴 기반 전역 state
|  ├─ utils
└── script.js // 진입 JS
```

## GUIDE

## 개발 일지 (간략)

### 9월19일 ~ 9월 말

- 색상 검색 기능, 색상 조합 colorMix 자바스크립트로 구현
- 디자인 기초

### 10월 1일 ~ 10월 7일

- 글로벌 버튼 기능 추가, 팔레트 리스트 구현 ( 다중 팔레트로 색상 기억)

### 10월 8일 ~ 10월 19일

-바닐라 JS 웹 컴포넌트, 가상 DOM 구현 시도 => virtiul DOM 업데이트 부분에서 막힘. 롤백 (component, virtualDOM 브랜치)

### 10월 20일 ~ 10월 28일

- 명암비, 색 조합, 색 확장 3타입 분리
- Observer 패턴을 이용하여 전역 state 관리 기능 추가
- 중복 코드 리팩토링, 코드 정리

### 10월 28일 ~ 31일

- 반응형 디자인 수정
- 버그 픽스

---

# 프로젝트를 진행하면서 익힌 사실들

- 프로토타입 객체 지향에 대한 이해, ES6+ 클래스(문법적 설탕)를 이용한 추상화
- 이벤트 버블링, 이벤트 캡쳐링 등 이벤트 관련.
- 클로저에 대한 이해, 여러 고차함수들.
- Component, VirtualDOM 구현 시도로 비록 완성은 못했으나. React에서 virtualDOM의 역할에 대해서 이해할 수 있었음.
- Observer 패턴 사용

# Reference

- 모던 JavaScript Deep Dive
- [MDN Web Docs](https://developer.mozilla.org/ko/)
- [색상 사이트](https://colors.muz.li/color/1a1a1a)

# 현재 발견된 수정사항 및 개발사항

- 배경 색상 전환 애니메이션 수정

- 정규식 수정

- rgb 팔레트 r,g,b 순서 전환

- 되돌리기 기능 추가

## 버그

- resize 반영 시 toolbox colorpicker value 재현 안됨
- 255,249,148 에서 undefined .. 재현 안됨
