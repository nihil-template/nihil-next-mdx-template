# NextJS MDX 템플릿
NextJS에서 MDX를 편하게 쓰려고 만든 템플릿.

1. `posts` 폴더에 있는 `0000` 폴더를 복사해서 이름을 원하는 연도로 바꾸고 그 내부의 월별 폴더 안에 `mdx` 파일을 작성. 프론트매터는 알아서 자유롭게 구성한다.
2. `src/utils/MDX` 폴더 안에 `getAllMDX.ts` 와 `src/types/mdx.types.ts` 파일도 함께 수정해준다.

## 설치
```
npm install
npm i
```
## 개발서버
```
npm run serve
```
## 배포
```
npm run start
```
## 정적 페이지 생성
```
npm run export
```
