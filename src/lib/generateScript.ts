export interface FormValues {
  name: string;
  position: string;
  department: string;
  email: string;
  atlassianURL: string;
  apiToken: string;
  geminiApiKey: string;
  siteField: string;
  categoryField: string;
}

export const generateScript = (v: FormValues): string => {
  const siteField = v.siteField ? `"${v.siteField}"` : "null";
  const categoryField = v.categoryField ? `"${v.categoryField}"` : "null";

  return `const config = {
  name: "${v.name}",
  position: "${v.position}",
  department: "${v.department}",
  email: "${v.email}",
  atlassianURL: "${v.atlassianURL.replace(/\/$/, "")}",
  apiToken: "${v.apiToken}",
  geminiApiKey: "${v.geminiApiKey}",
  siteField: ${siteField},
  categoryField: ${categoryField},
};

const ISSUE_TYPE_KO = {
  Bug: "버그",
  Story: "스토리",
  Task: "작업",
  "Sub-task": "부작업",
  Epic: "에픽",
  "New Feature": "새기능",
  Improvement: "개선",
  Change: "변경",
};

const STATUS_KO = {
  Done: "완료",
  Resolved: "해결됨",
  Closed: "종료",
  "In Progress": "진행 중",
  "In Review": "검토 중",
  Testing: "테스트 중",
  "To Do": "예정",
  Open: "열림",
  Backlog: "백로그",
};

const DONE_STATUSES = ["done", "resolved", "closed", "complete", "완료", "해결됨", "종료"];
const ONGOING_STATUSES = ["in progress", "in review", "testing", "review", "진행", "검토", "테스트"];

function getStatusGroup(name) {
  const s = (name || "").toLowerCase();
  if (DONE_STATUSES.some((k) => s.includes(k))) return "done";
  if (ONGOING_STATUSES.some((k) => s.includes(k))) return "ongoing";
  return "todo";
}

function getStatusBadge(name) {
  switch (getStatusGroup(name)) {
    case "done":
      return "background:#E3FCEF;color:#006644;";
    case "ongoing":
      return "background:#DEEBFF;color:#0747A6;";
    default:
      return "background:#FFF7D6;color:#974F0C;";
  }
}

function generateAiSummary(issues) {
  if (!config.geminiApiKey || config.geminiApiKey.includes("입력하세요")) return null;

  const issueList = issues
    .map((i) => {
      const f = i.fields;
      const status = STATUS_KO[f.status?.name] || f.status?.name || "-";
      const type = ISSUE_TYPE_KO[f.issuetype?.name] || f.issuetype?.name || "-";
      const project = f.project?.name || "-";
      const components = (f.components || []).map((c) => c.name).join(", ") || "-";
      const labels = (f.labels || []).join(", ") || "-";
      const site = (config.siteField && f[config.siteField]?.value) || "-";
      return \`- [\${i.key}] 프로젝트:\${project} | 구분:\${type} | 상태:\${status} | 컴포넌트:\${components} | 레이블:\${labels} | 사이트:\${site}\\n  제목: \${f.summary}\`;
    })
    .join("\\n");

  const prompt = \`당신은 개발팀 리포터입니다. 아래는 \${config.name} \${config.position}의 이번 주 Jira 업무 목록입니다.

다음 두 가지를 중심으로 4~6줄의 자연스러운 한국어 문장으로 작성해 주세요:
1. 이번 주 어떤 사이트나 프로젝트에 집중했는지 (컴포넌트·레이블·사이트 필드 기준으로 패턴 파악)
2. 어떤 방향의 개발을 하고 있는지 (기능 추가인지, 버그 수정인지, 리팩토링인지, 안정화인지 등 의도 파악)

마지막에 완료·진행·예정 건수를 한 줄로 요약해 주세요.
불필요한 반복이나 나열은 피하고, 읽는 사람이 개발자의 이번 주 흐름을 한눈에 파악할 수 있도록 써 주세요.

업무 목록:
\${issueList}\`;

  const payload = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: 512, temperature: 0.4 },
  });
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    payload,
    muteHttpExceptions: true,
  };

  let res;
  for (let attempt = 0; attempt < 3; attempt++) {
    res = UrlFetchApp.fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=\${config.geminiApiKey}\`,
      options
    );
    if (res.getResponseCode() !== 429) break;
    Logger.log(\`Gemini 할당량 초과, 30초 후 재시도 (\${attempt + 1}/2)\`);
    Utilities.sleep(30000);
  }

  if (res.getResponseCode() !== 200) {
    Logger.log(\`Gemini API 오류: \${res.getContentText()}\`);
    return null;
  }

  const data = JSON.parse(res.getContentText());
  return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

function fetchIssues() {
  const token = Utilities.base64Encode(\`\${config.email}:\${config.apiToken}\`);
  const jql = \`assignee = "\${config.email}" AND (created >= startOfWeek() OR updated >= startOfWeek()) ORDER BY updated DESC\`;
  const fields = [
    "summary",
    "status",
    "issuetype",
    "project",
    "created",
    "updated",
    "duedate",
    "labels",
    "components",
  ];
  if (config.siteField) fields.push(config.siteField);
  if (config.categoryField) fields.push(config.categoryField);

  const res = UrlFetchApp.fetch(\`\${config.atlassianURL}/rest/api/3/search/jql\`, {
    method: "POST",
    headers: {
      Authorization: \`Basic \${token}\`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    payload: JSON.stringify({ jql, maxResults: 50, fields }),
    muteHttpExceptions: true,
  });
  if (res.getResponseCode() !== 200)
    throw new Error(\`Jira API 오류 (\${res.getResponseCode()}): \${res.getContentText()}\`);
  return JSON.parse(res.getContentText()).issues || [];
}

function getWeekRange() {
  const now = new Date();
  const d = new Date(now);
  const day = d.getDay();
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  d.setHours(0, 0, 0, 0);
  return {
    weekStart: Utilities.formatDate(d, "Asia/Seoul", "yyyy.MM.dd"),
    weekEnd: Utilities.formatDate(now, "Asia/Seoul", "yyyy.MM.dd"),
  };
}

function buildRow(issue) {
  const f = issue.fields;
  const typeKo = ISSUE_TYPE_KO[f.issuetype?.name] || f.issuetype?.name || "-";
  const statusKo = STATUS_KO[f.status?.name] || f.status?.name || "-";
  const site = (config.siteField && f[config.siteField]?.value) || f.labels?.[0] || "-";
  const dueDate = f.duedate ? f.duedate.replace(/-/g, ".") : "-";

  const td = "padding:10px 12px;border-bottom:1px solid #F0F0F0;text-align:center;";
  return \`<tr>
    <td style="\${td}font-size:12px;color:#555;white-space:nowrap;">\${typeKo}</td>
    <td style="\${td}white-space:nowrap;">
      <a href="\${config.atlassianURL}/browse/\${issue.key}" style="color:#0052CC;text-decoration:none;font-weight:600;font-size:12px;">\${issue.key}</a>
    </td>
    <td style="\${td}font-size:13px;text-align:left;">\${f.summary}</td>
    <td style="\${td}white-space:nowrap;">
      <span style="padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;\${getStatusBadge(f.status?.name)}">\${statusKo}</span>
    </td>
    <td style="\${td}font-size:12px;color:#555;white-space:nowrap;">\${site}</td>
    <td style="\${td}font-size:12px;color:#888;white-space:nowrap;">\${dueDate}</td>
  </tr>\`;
}

function buildSection(title, accent, issues) {
  const count = issues.length;
  const rows =
    count === 0
      ? \`<tr><td colspan="6" style="text-align:center;padding:20px;color:#bbb;font-size:13px;">해당 업무가 없습니다.</td></tr>\`
      : issues.map(buildRow).join("");

  const th =
    "padding:10px 12px;text-align:center;border-bottom:2px solid #EBEBEB;font-size:11px;font-weight:700;color:#666;letter-spacing:0.4px;";
  const thead = \`
    <th style="\${th}width:7%;">구분</th>
    <th style="\${th}width:12%;">이슈</th>
    <th style="\${th}text-align:left;">요약</th>
    <th style="\${th}width:10%;">상태</th>
    <th style="\${th}width:10%;">사이트</th>
    <th style="\${th}width:9%;">마감일</th>\`;

  return \`
  <div style="margin-bottom:28px;">
    <div style="margin-bottom:10px;padding:10px 16px;background:#fff;border-left:4px solid \${accent};border-radius:0 6px 6px 0;">
      <span style="font-size:14px;font-weight:700;color:#1a1a2e;">\${title}</span>
      <span style="margin-left:8px;background:\${accent};color:#fff;padding:2px 9px;border-radius:10px;font-size:11px;font-weight:600;">\${count}건</span>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;background:#fff;">
      <thead><tr style="background:#FAFAFA;">\${thead}</tr></thead>
      <tbody>\${rows}</tbody>
    </table>
  </div>\`;
}

function buildAiSummaryBlock(summary) {
  if (!summary) return "";
  const html = summary.trim().replace(/\\n/g, "<br>");
  return \`
  <div style="background:#F0F4FF;border-radius:8px;padding:18px 22px;margin-bottom:28px;border:1px solid #C5D3F0;">
    <div style="font-size:11px;font-weight:700;color:#0052CC;letter-spacing:1px;margin-bottom:10px;">🤖 AI 업무 요약 (Gemini)</div>
    <p style="margin:0;font-size:13px;line-height:1.9;color:#333;">\${html}</p>
  </div>\`;
}

function buildHtml(issues, weekStart, weekEnd) {
  const done = issues.filter((i) => getStatusGroup(i.fields.status?.name) === "done");
  const ongoing = issues.filter((i) => getStatusGroup(i.fields.status?.name) === "ongoing");
  const todo = issues.filter((i) => getStatusGroup(i.fields.status?.name) === "todo");

  const aiSummary = generateAiSummary(issues);

  return \`<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;color:#1a1a2e;max-width:860px;margin:0 auto;padding:0;background:#F5F6FA;">
  <div style="background:linear-gradient(135deg,#0052CC 0%,#0747A6 100%);padding:28px 32px;">
    <div style="font-size:10px;color:#A0C4FF;font-weight:600;letter-spacing:1.5px;margin-bottom:8px;">WEEKLY REPORT</div>
    <div style="font-size:22px;font-weight:700;color:#fff;margin-bottom:6px;">주간 업무 보고</div>
    <div style="font-size:13px;color:#A0C4FF;">\${config.name} \${config.position} &nbsp;&middot;&nbsp; \${weekStart} ~ \${weekEnd}</div>
  </div>
  <div style="padding:24px 20px 32px;">
    <div style="background:#fff;border-radius:8px;padding:18px 22px;margin-bottom:28px;border:1px solid #E8EAF0;">
      <p style="margin:0;font-size:13px;line-height:2;color:#333;">
        안녕하세요.<br>
        \${config.department} \${config.name} \${config.position}입니다.<br>
        업무보고 드립니다.
      </p>
    </div>
    \${buildAiSummaryBlock(aiSummary)}
    \${buildSection("완료 업무", "#00875A", done)}
    \${buildSection("진행 업무", "#0052CC", ongoing)}
    \${buildSection("예정 업무", "#FF8B00", todo)}
  </div>
</body>
</html>\`;
}

function sendToMe() {
  const issues = fetchIssues();
  const { weekStart, weekEnd } = getWeekRange();
  const dateStr = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy. M. d.");
  const subject = \`[주간업무보고] \${dateStr} \${config.department} \${config.name}\`;
  MailApp.sendEmail({ to: config.email, subject, htmlBody: buildHtml(issues, weekStart, weekEnd) });
  Logger.log(\`발송 완료 (\${issues.length}건) → \${config.email}\`);
}

function sendToAll() {
  const issues = fetchIssues();
  const { weekStart, weekEnd } = getWeekRange();
  const dateStr = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy. M. d.");
  const subject = \`[주간업무보고] \${dateStr} \${config.department} \${config.name}\`;
  MailApp.sendEmail({ to: "all@autowini.com", subject, htmlBody: buildHtml(issues, weekStart, weekEnd) });
  Logger.log(\`발송 완료 (\${issues.length}건) → all@autowini.com\`);
}
`;
};

export const generateManifest = (): string => {
  return JSON.stringify(
    {
      timeZone: "Asia/Seoul",
      oauthScopes: [
        "https://www.googleapis.com/auth/script.external_request",
        "https://www.googleapis.com/auth/script.send_mail",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      exceptionLogging: "STACKDRIVER",
      runtimeVersion: "V8",
    },
    null,
    2
  );
};

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
