import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Download, Check, AlertCircle } from "lucide-react";
import {
  type FormValues,
  generateScript,
  generateManifest,
  downloadFile,
  copyToClipboard,
} from "../lib/generateScript";

const INITIAL: FormValues = {
  name: "",
  position: "",
  department: "",
  email: "",
  atlassianURL: "",
  apiToken: "",
  geminiApiKey: "",
  siteField: "",
  categoryField: "",
};

function AccordionGuide({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 border border-blue-100 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div className="px-4 py-3 bg-white text-sm text-gray-600 leading-relaxed">{children}</div>
      )}
    </div>
  );
}

function Step({ n, text }: { n: number; text: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-start py-1">
      <span className="shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
        {n}
      </span>
      <span>{text}</span>
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
      {copied ? "복사됨" : label}
    </button>
  );
}

export default function Generator() {
  const [form, setForm] = useState<FormValues>(INITIAL);
  const [generated, setGenerated] = useState<{ code: string; manifest: string } | null>(null);
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  const validate = () => {
    const e: Partial<FormValues> = {};
    if (!form.name.trim()) e.name = "이름을 입력하세요";
    if (!form.position.trim()) e.position = "직책을 입력하세요";
    if (!form.department.trim()) e.department = "소속을 입력하세요";
    if (!form.email.trim()) e.email = "이메일을 입력하세요";
    if (!form.atlassianURL.trim()) e.atlassianURL = "Jira URL을 입력하세요";
    if (!form.apiToken.trim()) e.apiToken = "API 토큰을 입력하세요";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;
    setGenerated({ code: generateScript(form), manifest: generateManifest() });
    setTimeout(
      () => document.getElementById("result")?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  const field = (
    id: keyof FormValues,
    label: string,
    placeholder: string,
    type = "text",
    required = false
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={form[id]}
        onChange={(e) => setForm((prev) => ({ ...prev, [id]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
          errors[id]
            ? "border-red-400 focus:border-red-500 bg-red-50"
            : "border-gray-200 focus:border-[#0052CC] bg-white"
        }`}
      />
      {errors[id] && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={11} /> {errors[id] as string}
        </p>
      )}
    </div>
  );

  return (
    <section id="generator" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">스크립트 생성</h2>
          <p className="text-gray-500 text-lg">
            정보를 입력하면 바로 사용 가능한 파일 2개가 생성됩니다
          </p>
          <p className="text-sm text-gray-400 mt-2">
            입력한 정보는 서버에 저장되지 않으며, 브라우저에서만 처리됩니다
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* 기본 정보 */}
          <div className="px-8 py-7 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-5 text-base">기본 정보</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {field("name", "이름", "홍길동", "text", true)}
              {field("position", "직책", "주임 / 대리 / 과장", "text", true)}
              {field("department", "소속", "플랫폼 본부", "text", true)}
              {field("email", "이메일", "hong@company.com", "email", true)}
            </div>
          </div>

          {/* Jira 설정 */}
          <div className="px-8 py-7 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-5 text-base">Jira 설정</h3>
            <div className="space-y-4">
              {field(
                "atlassianURL",
                "Atlassian URL",
                "https://your-domain.atlassian.net",
                "url",
                true
              )}
              <div>
                {field("apiToken", "Jira API 토큰", "ATATT3xFfGF0...", "password", true)}
                <AccordionGuide title="🔑 Jira API 토큰 발급 방법">
                  <Step
                    n={1}
                    text={
                      <>
                        브라우저에서 <strong>id.atlassian.com</strong> 로그인
                      </>
                    }
                  />
                  <Step
                    n={2}
                    text={
                      <>
                        우측 상단 프로필 → <strong>계정 관리</strong> 클릭
                      </>
                    }
                  />
                  <Step
                    n={3}
                    text={
                      <>
                        왼쪽 메뉴에서 <strong>보안</strong> 탭 선택
                      </>
                    }
                  />
                  <Step
                    n={4}
                    text={
                      <>
                        <strong>API 토큰 생성 및 관리</strong> → <strong>API 토큰 만들기</strong>{" "}
                        클릭
                      </>
                    }
                  />
                  <Step n={5} text="레이블 입력 후 생성된 토큰을 복사해 위 입력란에 붙여넣기" />
                </AccordionGuide>
              </div>
            </div>
          </div>

          {/* Gemini 설정 */}
          <div className="px-8 py-7 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-1 text-base">Gemini AI 설정</h3>
            <p className="text-xs text-gray-400 mb-4">
              선택 사항 — 비워두면 AI 요약 없이 이메일이 발송됩니다
            </p>
            <div>
              {field("geminiApiKey", "Gemini API 키", "AIzaSy...", "password")}
              <AccordionGuide title="🤖 Gemini API 키 발급 방법">
                <Step
                  n={1}
                  text={
                    <>
                      <strong>aistudio.google.com</strong> 접속 후 Google 계정 로그인
                    </>
                  }
                />
                <Step
                  n={2}
                  text={
                    <>
                      좌측 메뉴 하단 <strong>Get API key</strong> 클릭
                    </>
                  }
                />
                <Step
                  n={3}
                  text={
                    <>
                      <strong>Create API key</strong> 버튼 클릭
                    </>
                  }
                />
                <Step n={4} text="프로젝트 선택 또는 새 프로젝트 생성 후 API 키 복사" />
                <Step
                  n={5}
                  text="무료 티어 사용 시 할당량 초과 오류가 날 수 있습니다. Google Cloud Console에서 결제 계정 연결 권장"
                />
              </AccordionGuide>
            </div>
          </div>

          {/* 선택 설정 */}
          <div className="px-8 py-7 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-1 text-base">선택 설정</h3>
            <p className="text-xs text-gray-400 mb-4">Jira 커스텀 필드 ID — 없으면 비워두세요</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {field("siteField", "사이트 필드 ID", "customfield_10100")}
              {field("categoryField", "카테고리 필드 ID", "customfield_10200")}
            </div>
            <AccordionGuide title="📋 커스텀 필드 ID 확인 방법">
              <Step
                n={1}
                text={
                  <>
                    Jira 관리자 → <strong>이슈</strong> → <strong>필드</strong> 메뉴 접속
                  </>
                }
              />
              <Step n={2} text="원하는 커스텀 필드의 '스크린' 또는 '컨텍스트' 클릭" />
              <Step n={3} text="URL에서 customfield_XXXXX 형태의 ID 확인 후 입력" />
            </AccordionGuide>
          </div>

          <div className="px-8 py-6">
            <button
              type="submit"
              className="w-full bg-[#0052CC] hover:bg-[#0747A6] text-white font-semibold py-3.5 rounded-xl transition-colors text-base shadow-sm"
            >
              스크립트 생성하기
            </button>
          </div>
        </form>

        {/* 결과 */}
        {generated && (
          <div id="result" className="mt-10 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div>
                  <p className="font-bold text-gray-900">Code.gs</p>
                  <p className="text-xs text-gray-400 mt-0.5">Google Apps Script 메인 파일</p>
                </div>
                <div className="flex gap-2">
                  <CopyButton text={generated.code} label="복사" />
                  <button
                    type="button"
                    onClick={() => downloadFile(generated.code, "Code.gs")}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#0052CC] text-white hover:bg-[#0747A6] transition-colors"
                  >
                    <Download size={13} /> 다운로드
                  </button>
                </div>
              </div>
              <pre className="p-5 text-xs text-gray-700 overflow-auto max-h-64 leading-relaxed bg-gray-50 font-mono">
                {generated.code.slice(0, 800)}...
              </pre>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div>
                  <p className="font-bold text-gray-900">appscript.json</p>
                  <p className="text-xs text-gray-400 mt-0.5">Apps Script 매니페스트 파일</p>
                </div>
                <div className="flex gap-2">
                  <CopyButton text={generated.manifest} label="복사" />
                  <button
                    type="button"
                    onClick={() => downloadFile(generated.manifest, "appscript.json")}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#0052CC] text-white hover:bg-[#0747A6] transition-colors"
                  >
                    <Download size={13} /> 다운로드
                  </button>
                </div>
              </div>
              <pre className="p-5 text-xs text-gray-700 overflow-auto max-h-40 leading-relaxed bg-gray-50 font-mono">
                {generated.manifest}
              </pre>
            </div>

            {/* Apps Script 등록 안내 */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 mb-4 text-base">
                📋 Google Apps Script 등록 방법
              </h3>
              <ol className="space-y-3 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center mt-0.5">
                    1
                  </span>
                  <span>
                    <a
                      href="https://script.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-medium"
                    >
                      script.google.com
                    </a>
                    에서 <strong>새 프로젝트</strong> 생성
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center mt-0.5">
                    2
                  </span>
                  <span>
                    좌측 <strong>프로젝트 설정(⚙️)</strong> →{" "}
                    <strong>"편집기에 'appsscript.json' 매니페스트 파일 표시"</strong> 활성화
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center mt-0.5">
                    3
                  </span>
                  <span>
                    편집기에서 <strong>Code.gs</strong> 탭 선택 → 기존 내용 전체 삭제 후 위 Code.gs
                    내용 붙여넣기
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center mt-0.5">
                    4
                  </span>
                  <span>
                    편집기에서 <strong>appscript.json</strong> 탭 선택 → 기존 내용 전체 삭제 후 위
                    appscript.json 내용 붙여넣기
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center mt-0.5">
                    5
                  </span>
                  <span>
                    상단 함수 선택에서 <strong>sendToMe</strong> 선택 후 ▶ 실행 → 권한 허용 후
                    테스트 메일 확인
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center mt-0.5">
                    6
                  </span>
                  <span>
                    (선택) 시계 아이콘 <strong>트리거</strong>에서 매주 금요일 오후 자동 실행 설정
                  </span>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
