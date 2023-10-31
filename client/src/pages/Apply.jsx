export default function Apply() {
  return (
    <div className="bg">
      <div className="bg_wrap">
        <h3>참가해주셔서 감사합니다.</h3>
        <div className="present_img">
          <img src="/customizer/present.png" alt="present" />
        </div>
        <p>추첨날짜:2023년11월16일(목)</p>
        <h4>주의사항</h4>
        <ul>
          <li>1.상품 추첨 후 입력하신 전화번호로 문자가 발송됩니다.</li>
          <li>
            2.문자발송 후 7일간 연락이 되지 않을 시 당첨은 취소가됩니다. 이후
            재당첨은 불가능합니다.
          </li>
          <li>
            3.잘못된 연락처의 기재 및 휴대폰 해지, 정지, 번호 변경 등으로 인한
            상품 미수령에 따른 재발송 및 환불은 불가합니다.
          </li>
          <li>
            4.이벤트 경품, 기간,경품발송일 등 내용은 주최측 사정에 따라 사전
            예고 없이 변경될 수 있습니다.
          </li>
          <li>
            5.개인정보도용, 오류 및 부정한 방법으로 참여시 당첨 취소 및 경품을
            회수 할 수 있습니다.{" "}
          </li>
          <li>
            6.이벤트 경품 내역은 양도 및 양수가 되지 않으며, 타 상품으로 교환 및
            환불이 불가능합니다.{" "}
          </li>
        </ul>
        <strong>* 제세공과금 본인부담(22%)</strong>
      </div>
    </div>
  );
}
