# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
pnpm dev        # 개발 서버 (http://localhost:5173)
pnpm build      # TypeScript 타입 체크 후 Vite 빌드
pnpm lint       # ESLint
pnpm preview    # 빌드 결과물 미리보기
```

테스트 프레임워크 없음.

## 아키텍처

이 프로젝트는 **순수 프론트엔드 정적 사이트**로, 서버가 없습니다. 핵심 가치는 사용자 입력 데이터가 브라우저 밖으로 나가지 않는다는 점입니다.

### 데이터 흐름

```
Generator.tsx (폼 입력)
  → generateScript(FormValues)  ← src/lib/generateScript.ts
  → Code.gs 문자열 + appscript.json 문자열 반환
  → 화면에 표시 / 다운로드 / 클립보드 복사
```

`src/lib/generateScript.ts`가 핵심 파일입니다. 이 파일은 **Google Apps Script 코드를 TypeScript 템플릿 리터럴로 문자열 생성**합니다. 생성된 문자열 안에는 GAS 전용 API(`UrlFetchApp`, `MailApp`, `Utilities`)가 포함되므로, TypeScript 타입 에러를 내지 않도록 백틱 문자열 내부로 격리되어 있습니다.

### 컴포넌트 렌더 순서 (App.tsx)

`Hero` → `Features` → `HowItWorks` → `Preview` → `Generator` → `RegisterGuide` → `Footer`

각 컴포넌트는 독립적이며 props를 주고받지 않습니다. 상태는 `Generator.tsx` 내부에만 존재합니다 (`useState`로 폼 값, 생성 결과, 유효성 오류, 비밀번호 표시 여부 관리).

### 이메일 미리보기

`Preview.tsx`의 `PREVIEW_HTML`은 실제 생성 로직과 분리된 **하드코딩 예시 HTML**입니다. 실제 이메일 HTML은 `generateScript.ts`의 `buildHtml` 함수(GAS 코드 내부)에서 생성됩니다. 두 HTML 구조를 일치시켜야 할 때는 둘 다 수정해야 합니다.

## 코드 컨벤션

- **포매터**: Prettier (double quote, semi, printWidth 100)
- React 컴포넌트: `export default function ComponentName()`
- 유틸/훅/핸들러: `export const fn = () => {}`
- `interface`: Props, API 계약 타입 / `type`: 유니온·인터섹션·유틸리티 조합
- 주석은 한국어로 작성
