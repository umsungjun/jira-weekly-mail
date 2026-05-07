import { Bot, Mail, RefreshCw } from "lucide-react";

const features = [
  {
    icon: <RefreshCw size={28} className="text-[#0052CC]" />,
    title: "Jira 자동 연동",
    description:
      "이번 주 할당된 이슈를 JQL로 자동 수집합니다. 완료·진행·예정 업무를 상태별로 분류하여 한눈에 파악할 수 있습니다.",
    bg: "bg-blue-50",
  },
  {
    icon: <Bot size={28} className="text-[#6366f1]" />,
    title: "Gemini AI 업무 요약",
    description:
      "Gemini 2.5 Flash가 이슈 목록을 분석해 어떤 사이트·프로젝트에 집중했는지, 어떤 방향으로 개발 중인지를 자연스러운 문장으로 요약합니다. API 오류 시 최대 3회 재시도하며, 실패해도 이메일은 정상 발송됩니다.",
    bg: "bg-indigo-50",
  },
  {
    icon: <Mail size={28} className="text-[#00875A]" />,
    title: "HTML 이메일 자동 발송",
    description:
      "Google Apps Script의 MailApp으로 매주 정해진 시각에 깔끔한 HTML 이메일을 자동 발송합니다. 별도 서버가 필요 없습니다.",
    bg: "bg-emerald-50",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">핵심 기능</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            설정 한 번으로 매주 자동으로 업무 보고서가 발송됩니다
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <article
              key={f.title}
              className={`${f.bg} rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow`}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-5">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
