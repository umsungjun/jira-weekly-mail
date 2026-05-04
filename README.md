# Jira 주간 업무 보고 자동화

> Jira 이슈를 자동 수집하고 Gemini AI로 요약해 매주 HTML 이메일 보고서를 자동 발송하는 Google Apps Script 생성기

[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

⭐ **유용하게 사용하셨다면 GitHub Star를 눌러주시면 큰 힘이 됩니다!**

---

## 주요 기능

- **Jira 자동 연동** — 이번 주 할당된 이슈를 JQL로 자동 수집, 완료·진행·예정 상태별 분류
- **Gemini AI 업무 요약** — 어떤 사이트/프로젝트에 집중했는지, 어떤 개발 방향인지를 AI가 자연스러운 문장으로 요약
- **HTML 이메일 자동 발송** — Google Apps Script `MailApp`으로 별도 서버 없이 이메일 발송
- **스크립트 생성기** — 정보를 입력하면 `Code.gs`와 `appscript.json` 두 파일을 브라우저에서 바로 생성 (서버 저장 없음)

---

## 생성 파일 설명

### `Code.gs`

Google Apps Script의 메인 실행 파일입니다. Jira API 호출, Gemini AI 요약, HTML 이메일 생성 및 발송 로직이 포함되어 있습니다.

주요 함수:

- `sendToMe()` — 본인 이메일로 테스트 발송
- `sendToAll()` — 전체 메일링 리스트로 발송
- `fetchIssues()` — Jira API로 이번 주 이슈 수집
- `generateAiSummary()` — Gemini API로 업무 요약 생성

### `appscript.json`

Google Apps Script 프로젝트 매니페스트 파일입니다. 타임존(Asia/Seoul), OAuth 권한 범위, 런타임 버전(V8)이 설정되어 있습니다.

> ⚠️ 이 파일을 편집기에서 보려면 **프로젝트 설정 → "편집기에 'appsscript.json' 매니페스트 파일 표시" 활성화**가 필요합니다.

---

## 프로젝트 구조

```
jira-reporter/
├── index.html                 # SEO 메타태그 포함
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.tsx
│   ├── index.css              # Tailwind + Noto Sans KR
│   ├── main.tsx
│   ├── components/
│   │   ├── Hero.tsx           # 히어로 섹션
│   │   ├── Features.tsx       # 핵심 기능 소개
│   │   ├── HowItWorks.tsx     # 3단계 사용 방법
│   │   ├── Preview.tsx        # 이메일 미리보기
│   │   ├── Generator.tsx      # 스크립트 생성 폼 + 결과
│   │   └── Footer.tsx         # 푸터 (GitHub/LinkedIn)
│   └── lib/
│       └── generateScript.ts  # 스크립트 생성 핵심 로직
├── .prettierrc
├── vite.config.ts
└── package.json
```

---

## 로컬 개발 환경 설정

**요구 사항**: Node.js 18+, pnpm 8+

```bash
# 저장소 클론
git clone https://github.com/umsungjun/jira-reporter.git
cd jira-reporter

# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:5173)
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 결과물 미리보기
pnpm preview
```

---

## Vercel 배포

1. [Vercel](https://vercel.com)에서 GitHub 저장소 연결
2. Framework Preset: **Vite** 선택
3. Build Command: `pnpm build`
4. Output Directory: `dist`
5. **Deploy** 클릭

---

## Google Apps Script 등록 방법

1. [script.google.com](https://script.google.com)에서 **새 프로젝트** 생성
2. 좌측 **프로젝트 설정(⚙️)** → **"편집기에 'appsscript.json' 매니페스트 파일 표시"** 활성화
3. 편집기에서 **Code.gs** 탭 → 기존 내용 전체 삭제 후 생성된 `Code.gs` 붙여넣기
4. 편집기에서 **appscript.json** 탭 → 기존 내용 전체 삭제 후 생성된 `appscript.json` 붙여넣기
5. 상단 함수 선택에서 **`sendToMe`** 선택 후 ▶ 실행 → 권한 허용 후 테스트 메일 확인
6. _(선택)_ 시계 아이콘 **트리거**에서 매주 금요일 오후 자동 실행 설정

---

## Jira API 토큰 발급 방법

1. [id.atlassian.com](https://id.atlassian.com) 로그인
2. 우측 상단 프로필 → **계정 관리** 클릭
3. 좌측 메뉴 **보안** 탭 선택
4. **API 토큰 생성 및 관리** → **API 토큰 만들기** 클릭
5. 레이블 입력 후 생성된 토큰 복사

---

## Gemini API 키 발급 방법

1. [aistudio.google.com](https://aistudio.google.com) 접속 후 Google 계정 로그인
2. 좌측 메뉴 하단 **Get API key** 클릭
3. **Create API key** 버튼 클릭
4. 프로젝트 선택 또는 새 프로젝트 생성 후 API 키 복사

> 💡 무료 티어 사용 시 할당량 초과 오류가 날 수 있습니다. Google Cloud Console에서 결제 계정 연결을 권장합니다.

---

## 커스텀 필드 설정 방법

사이트 구분, 카테고리 등 Jira 커스텀 필드를 보고서에 포함하려면:

1. Jira 관리자 → **이슈** → **필드** 메뉴 접속
2. 원하는 커스텀 필드의 **스크린** 또는 **컨텍스트** 클릭
3. URL에서 `customfield_XXXXX` 형태의 ID 확인
4. 스크립트 생성 폼의 **선택 설정**에 해당 ID 입력

---

## 기여 가이드 (Contributing)

버그 리포트, 기능 제안, PR 모두 환영합니다!

1. 이 저장소를 Fork
2. 기능 브랜치 생성 (`git checkout -b feat/my-feature`)
3. 변경사항 커밋 (`git commit -m 'feat: 새 기능 추가'`)
4. 브랜치 Push (`git push origin feat/my-feature`)
5. Pull Request 오픈

---

## 개발자

**엄성준 (umsungjun)**

- GitHub: [github.com/umsungjun](https://github.com/umsungjun)
- LinkedIn: [linkedin.com/in/frontend-developer-umsungjun](https://www.linkedin.com/in/frontend-developer-umsungjun)

---

## License

MIT License © 2026 umsungjun
