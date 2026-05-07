# Jira 주간 업무 보고 자동화

> Jira 이슈를 자동 수집하고 Gemini AI로 요약해 매주 HTML 이메일 보고서를 자동 발송하는 Google Apps Script 생성기

[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

⭐ **유용하게 사용하셨다면 GitHub Star를 눌러주시면 큰 힘이 됩니다!**

---

## 이런 분들을 위해 만들었습니다

- 매주 Jira 이슈를 직접 취합해 업무 보고 메일을 쓰는 게 번거로운 분
- 보고서 작성에 드는 시간을 줄이고 개발에 더 집중하고 싶은 개발자
- 별도 서버 없이 무료로 이메일 자동화를 구축하고 싶은 분
- Jira를 사용하는 팀에서 주간 업무 현황을 정기적으로 공유해야 하는 분

정보를 한 번만 입력하면 Google Apps Script 파일 2개(`Code.gs`, `appscript.json`)가 자동 생성됩니다. 이 파일을 Google Apps Script에 붙여넣으면 매주 자동으로 업무 보고 이메일이 발송됩니다.

> 🔒 입력한 정보는 서버에 저장되지 않으며, 브라우저에서만 처리됩니다.

---

## 핵심 기능

- **Jira 자동 연동** — 이번 주 할당된 이슈를 JQL로 자동 수집, 완료·진행·예정 상태별 분류
- **Gemini AI 업무 요약** — 어떤 사이트/프로젝트에 집중했는지, 어떤 개발 방향인지를 AI가 자연스러운 문장으로 요약 (선택 사항). API 오류 시 최대 3회 재시도하며, 모두 실패해도 AI 요약 없이 이메일이 정상 발송됩니다.
- **HTML 이메일 자동 발송** — Google Apps Script `MailApp`으로 별도 서버 없이 이메일 발송
- **스크립트 생성기** — 정보를 입력하면 `Code.gs`와 `appscript.json` 두 파일을 브라우저에서 바로 생성

---

## 사용 방법

### 1단계 — Jira API 토큰 발급

1. [id.atlassian.com](https://id.atlassian.com) 로그인
2. 우측 상단 프로필 → **계정 관리** 클릭
3. 왼쪽 메뉴에서 **보안** 탭 선택
4. **API 토큰 생성 및 관리** → **API 토큰 만들기** 클릭
5. 레이블 입력 후 생성된 토큰 복사

---

### 2단계 — Gemini API 키 발급 (선택 사항)

비워두면 AI 요약 없이 이메일이 발송됩니다. AI 요약을 원하는 경우에만 진행하세요.

1. [aistudio.google.com](https://aistudio.google.com) 접속 후 Google 계정 로그인
2. 좌측 메뉴 하단 **Get API key** 클릭
3. **Create API key** 버튼 클릭
4. 프로젝트 선택 또는 새 프로젝트 생성 후 API 키 복사

> 💡 무료 티어 사용 시 할당량 초과 오류가 날 수 있습니다. Google Cloud Console에서 결제 계정 연결을 권장합니다.

---

### 3단계 — 스크립트 파일 생성

사이트에서 아래 정보를 입력하고 **스크립트 생성하기** 버튼을 클릭합니다.

| 항목             | 예시                              |
| ---------------- | --------------------------------- |
| 이름             | 홍길동                            |
| 직책             | 주임 / 대리 / 과장                |
| 소속             | 플랫폼 본부                       |
| Jira 계정 이메일 | hong@company.com                  |
| Atlassian URL    | https://your-domain.atlassian.net |
| Jira API 토큰    | ATATT3xFfGF0...                   |
| Gemini API 키    | AIzaSy... (선택)                  |

생성 완료 시 `Code.gs`와 `appscript.json` 두 파일이 화면에 표시됩니다.

---

### 4단계 — Google Apps Script에 파일 등록

1. [script.google.com](https://script.google.com)에서 **새 프로젝트** 생성
2. 좌측 **프로젝트 설정(⚙️)** → **"편집기에 'appsscript.json' 매니페스트 파일 표시"** 활성화
3. 편집기에서 **Code.gs** 탭 선택 → 기존 내용 전체 삭제 후 생성된 `Code.gs` 내용 붙여넣기
4. 편집기에서 **appscript.json** 탭 선택 → 기존 내용 전체 삭제 후 생성된 `appscript.json` 내용 붙여넣기

> ⚠️ appscript.json 탭이 보이지 않으면 **2번 설정**을 먼저 활성화해야 합니다.

---

### 5단계 — 테스트 및 자동화 설정

1. 상단 함수 선택에서 **`sendToMe`** 선택 후 ▶ 실행
2. 처음 실행 시 Google 권한 허용 팝업이 뜹니다 → 허용 클릭
3. 내 이메일에서 테스트 보고서 확인
4. _(선택)_ 시계 아이콘 **트리거**에서 매주 금요일 오후 자동 실행 설정

---

## 생성 파일 설명

### `Code.gs`

Google Apps Script 메인 실행 파일입니다. Jira API 호출, Gemini AI 요약, HTML 이메일 생성 및 발송 로직이 포함되어 있습니다.

| 함수                  | 역할                         |
| --------------------- | ---------------------------- |
| `sendToMe()`          | 본인 이메일로 테스트 발송    |
| `sendToAll()`         | 전체 메일링 리스트로 발송    |
| `fetchIssues()`       | Jira API로 이번 주 이슈 수집 |
| `generateAiSummary()` | Gemini API로 업무 요약 생성 (실패 시 3회 재시도) |

### `appscript.json`

Google Apps Script 프로젝트 매니페스트 파일입니다. 타임존(Asia/Seoul), OAuth 권한 범위, 런타임 버전(V8)이 설정되어 있습니다.

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
