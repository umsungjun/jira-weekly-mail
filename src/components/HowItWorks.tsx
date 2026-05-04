const steps = [
  {
    number: "01",
    title: "정보 입력",
    description: "이름, 소속, Jira URL, API 토큰, Gemini API 키를 아래 폼에 입력합니다.",
    color: "text-[#0052CC]",
    border: "border-[#0052CC]",
  },
  {
    number: "02",
    title: "파일 생성",
    description:
      "버튼 클릭 한 번으로 Code.gs와 appscript.json 두 파일이 생성됩니다. 서버에 저장되지 않습니다.",
    color: "text-[#6366f1]",
    border: "border-[#6366f1]",
  },
  {
    number: "03",
    title: "Apps Script 등록",
    description:
      "script.google.com에 새 프로젝트를 만들고 두 파일을 붙여넣은 뒤 트리거를 설정하면 끝입니다.",
    color: "text-[#00875A]",
    border: "border-[#00875A]",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">사용 방법</h2>
          <p className="text-gray-500 text-lg">3단계로 자동화 완성</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-200 z-0 translate-x-[-50%]" />
              )}
              <article className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center w-full">
                <div
                  className={`text-4xl font-black ${step.color} mb-4 border-b-2 ${step.border} inline-block pb-1`}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
