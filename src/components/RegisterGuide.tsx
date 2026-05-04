const steps = [
  {
    n: 1,
    title: "새 프로젝트 생성",
    desc: (
      <>
        <a
          href="https://script.google.com"
          target="_blank"
          rel="noreferrer"
          className="underline font-semibold text-[#0052CC]"
        >
          script.google.com
        </a>
        에 접속 후 <strong>새 프로젝트</strong>를 생성합니다.
      </>
    ),
  },
  {
    n: 2,
    title: "매니페스트 파일 표시 활성화",
    desc: (
      <>
        좌측 <strong>프로젝트 설정(⚙️)</strong> →{" "}
        <strong className="text-orange-600">
          "편집기에 'appsscript.json' 매니페스트 파일 표시"
        </strong>{" "}
        를 활성화합니다. <span className="text-gray-400 text-xs">(필수)</span>
      </>
    ),
  },
  {
    n: 3,
    title: "Code.gs 붙여넣기",
    desc: (
      <>
        편집기에서 <strong>Code.gs</strong> 탭 선택 → 기존 내용 전체 삭제 후 생성된{" "}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Code.gs</code> 내용을
        붙여넣습니다.
      </>
    ),
  },
  {
    n: 4,
    title: "appscript.json 붙여넣기",
    desc: (
      <>
        편집기에서 <strong>appscript.json</strong> 탭 선택 → 기존 내용 전체 삭제 후 생성된{" "}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">appscript.json</code> 내용을
        붙여넣습니다.
      </>
    ),
  },
  {
    n: 5,
    title: "테스트 실행",
    desc: (
      <>
        상단 함수 선택에서 <strong>sendToMe</strong> 선택 후 ▶ 실행 → 권한 허용 후 본인 메일함에서
        보고서를 확인합니다.
      </>
    ),
  },
  {
    n: 6,
    title: "자동 발송 트리거 설정 (선택)",
    desc: (
      <>
        시계 아이콘 <strong>트리거</strong>에서 <strong>sendToMe</strong> 또는{" "}
        <strong>sendToAll</strong> 함수를 매주 원하는 요일·시간에 자동 실행하도록 등록합니다.
      </>
    ),
  },
];

export default function RegisterGuide() {
  return (
    <section id="register-guide" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Google Apps Script 등록 방법
          </h2>
          <p className="text-gray-500 text-lg">생성된 파일을 Apps Script에 등록하는 6단계</p>
        </div>

        <ol className="space-y-4">
          {steps.map((step) => (
            <li key={step.n} className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#0052CC] text-white text-sm font-bold flex items-center justify-center mt-0.5">
                {step.n}
              </span>
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 flex-1">
                <p className="font-semibold text-gray-900 mb-1 text-sm">{step.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 text-sm text-amber-800">
          <strong>💡 팁</strong> — 트리거 실행 시 최초 1회 Google 계정 권한 허용 팝업이 표시됩니다.
          팝업 차단 설정이 되어 있다면 브라우저에서 허용 후 다시 실행해 주세요.
        </div>
      </div>
    </section>
  );
}
