const PREVIEW_HTML = `
<div style="font-family:'Apple SD Gothic Neo','Malgun Gothic',Arial,sans-serif;color:#1a1a2e;max-width:860px;margin:0 auto;background:#F5F6FA;">
  <div style="background:linear-gradient(135deg,#0052CC 0%,#0747A6 100%);padding:28px 32px;">
    <div style="font-size:10px;color:#A0C4FF;font-weight:600;letter-spacing:1.5px;margin-bottom:8px;">WEEKLY REPORT</div>
    <div style="font-size:22px;font-weight:700;color:#fff;margin-bottom:6px;">주간 업무 보고</div>
    <div style="font-size:13px;color:#A0C4FF;">홍길동 주임 &nbsp;·&nbsp; 2025.01.06 ~ 2025.01.10</div>
  </div>
  <div style="padding:20px 20px 28px;">
    <div style="background:#fff;border-radius:8px;padding:16px 20px;margin-bottom:20px;border:1px solid #E8EAF0;">
      <p style="margin:0;font-size:13px;line-height:2;color:#333;">안녕하세요.<br>플랫폼 본부 홍길동 주임입니다.<br>업무보고 드립니다.</p>
    </div>
    <div style="background:#F0F4FF;border-radius:8px;padding:16px 20px;margin-bottom:20px;border:1px solid #C5D3F0;">
      <div style="font-size:11px;font-weight:700;color:#0052CC;letter-spacing:1px;margin-bottom:8px;">🤖 AI 업무 요약 (Gemini)</div>
      <p style="margin:0;font-size:13px;line-height:1.9;color:#333;">이번 주는 B2B 플랫폼의 견적 조회 기능 안정화와 신규 필터 기능 추가 개발에 집중하였습니다. 주요 버그 수정을 통해 사용자 경험을 개선하고, 코드 품질 향상을 위한 리팩토링도 병행하였습니다.<br>완료 3건 · 진행 2건 · 예정 1건</p>
    </div>
    <div style="margin-bottom:20px;">
      <div style="margin-bottom:8px;padding:8px 14px;background:#fff;border-left:4px solid #00875A;border-radius:0 6px 6px 0;">
        <span style="font-size:13px;font-weight:700;color:#1a1a2e;">완료 업무</span>
        <span style="margin-left:8px;background:#00875A;color:#fff;padding:2px 9px;border-radius:10px;font-size:11px;font-weight:600;">3건</span>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:12px;background:#fff;">
        <thead><tr style="background:#FAFAFA;">
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;width:7%;">구분</th>
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;width:12%;">이슈</th>
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;text-align:left;">요약</th>
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;width:10%;">상태</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;color:#555;font-size:11px;">버그</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><a style="color:#0052CC;font-weight:600;font-size:11px;text-decoration:none;">PLT-1234</a></td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;font-size:12px;text-align:left;">견적 목록 페이지 필터 초기화 오류 수정</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><span style="padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;background:#E3FCEF;color:#006644;">완료</span></td>
          </tr>
          <tr>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;color:#555;font-size:11px;">작업</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><a style="color:#0052CC;font-weight:600;font-size:11px;text-decoration:none;">PLT-1235</a></td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;font-size:12px;text-align:left;">차량 상세 페이지 이미지 로딩 성능 개선</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><span style="padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;background:#E3FCEF;color:#006644;">완료</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div style="margin-bottom:8px;padding:8px 14px;background:#fff;border-left:4px solid #0052CC;border-radius:0 6px 6px 0;">
        <span style="font-size:13px;font-weight:700;color:#1a1a2e;">진행 업무</span>
        <span style="margin-left:8px;background:#0052CC;color:#fff;padding:2px 9px;border-radius:10px;font-size:11px;font-weight:600;">2건</span>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:12px;background:#fff;">
        <thead><tr style="background:#FAFAFA;">
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;width:7%;">구분</th>
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;width:12%;">이슈</th>
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;text-align:left;">요약</th>
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;width:10%;">상태</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;color:#555;font-size:11px;">스토리</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><a style="color:#0052CC;font-weight:600;font-size:11px;text-decoration:none;">PLT-1240</a></td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;font-size:12px;text-align:left;">신규 딜러사 온보딩 플로우 UI 개발</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><span style="padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;background:#DEEBFF;color:#0747A6;">진행 중</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div style="margin-bottom:8px;padding:8px 14px;background:#fff;border-left:4px solid #FF8B00;border-radius:0 6px 6px 0;">
        <span style="font-size:13px;font-weight:700;color:#1a1a2e;">예정 업무</span>
        <span style="margin-left:8px;background:#FF8B00;color:#fff;padding:2px 9px;border-radius:10px;font-size:11px;font-weight:600;">2건</span>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:12px;background:#fff;">
        <thead><tr style="background:#FAFAFA;">
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;width:7%;">구분</th>
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;width:12%;">이슈</th>
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;text-align:left;">요약</th>
          <th style="padding:8px 10px;border-bottom:2px solid #EBEBEB;font-size:10px;font-weight:700;color:#666;width:10%;">상태</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;color:#555;font-size:11px;">작업</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><a style="color:#0052CC;font-weight:600;font-size:11px;text-decoration:none;">PLT-1245</a></td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;font-size:12px;text-align:left;">모바일 반응형 견적 목록 레이아웃 개선</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><span style="padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;background:#FFF7D6;color:#974F0C;">예정</span></td>
          </tr>
          <tr>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;color:#555;font-size:11px;">버그</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><a style="color:#0052CC;font-weight:600;font-size:11px;text-decoration:none;">PLT-1248</a></td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;font-size:12px;text-align:left;">Safari 환경 날짜 선택 컴포넌트 렌더링 오류</td>
            <td style="padding:8px 10px;border-bottom:1px solid #F0F0F0;text-align:center;"><span style="padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;background:#FFF7D6;color:#974F0C;">예정</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;

export default function Preview() {
  return (
    <section id="preview" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">이메일 미리보기</h2>
          <p className="text-gray-500 text-lg">실제 발송되는 HTML 이메일 형태입니다</p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center">
              주간업무보고 이메일 미리보기
            </div>
          </div>
          <div
            className="bg-white overflow-auto max-h-150"
            dangerouslySetInnerHTML={{ __html: PREVIEW_HTML }}
          />
        </div>
      </div>
    </section>
  );
}
