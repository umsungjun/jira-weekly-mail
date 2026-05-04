import { ArrowDown, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#0052CC] via-[#0747A6] to-[#003884] text-white">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
          <Zap size={14} className="text-yellow-300" />
          Jira + Gemini AI + Google Apps Script
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          주간 업무 보고를
          <br />
          <span className="text-blue-200">자동화</span>하세요
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Jira 이슈를 자동으로 수집하고, Gemini AI로 업무를 요약해
          <br className="hidden md:block" />
          Google Apps Script를 통해 매주 HTML 이메일 보고서를 발송합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#generator"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0052CC] font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            스크립트 생성하기
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            사용 방법 보기
          </a>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm text-blue-100 text-center max-w-xs sm:max-w-none">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-300 shrink-0"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>
              입력한 정보는 <strong className="text-white">서버에 저장되지 않으며</strong>,
              브라우저에서만 처리됩니다
            </span>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <a href="#features" aria-label="아래로 스크롤">
            <ArrowDown size={24} className="text-blue-200 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
