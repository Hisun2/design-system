// 공용 패키지의 컴포넌트를 한 화면에 모아 눈으로 확인하는 곳입니다.
import React from "react";
import {
  UiProvider, StatusTag, Box, Flex, Text,
  Button, Link, Input, Textarea, InputNumber, InputTags, Checkbox, Radio, RadioGroup, Switch, Select,
  DatePicker, DateRangePicker, Dropdown, DropdownMenu, FilterTrigger, Pills, TabLine, TabPanel,
  Breadcrumbs, Pagination, Accordion, Badge, Tag, Counter, Dot, Divider, Card, Tooltip, ProgressBar,
  Modal, SidePanel, Notice, NoticeBubbleContainer, noticeBubbleDefaultManager,
  Spin, SpinContainer, Skeleton, NoData, DataTable,
} from "@ec21rnc/ui";
import More from "./More.jsx";

const rows = [
  { name: "가나다 주식회사", type: "법인", status: "승인", amount: "12,480,000", date: "2026-11-25" },
  { name: "라마바 상사", type: "개인", status: "대기", amount: "3,912,000", date: "2026-11-24" },
  { name: "사아자 무역", type: "법인", status: "반려", amount: "0", date: "2026-11-20" },
];
const statusOf = { 승인: "success", 대기: "warning", 반려: "critical" };
const options = ["전체", "법인", "개인"].map((v) => ({ value: v, children: v }));

// 컴포넌트 하나가 실패해도 화면 전체가 멈추지 않게 묶음마다 감쌉니다.
class Guard extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) return <Text color="text-critical" data-failed={this.props.name}>표시 실패: {String(this.state.error.message)}</Text>;
    return this.props.children;
  }
}

const Block = ({ title, column, children }) => (
  <Box mb={8} data-block={title}>
    <Text tag="h2" size={400} bold mb={3} mt={0}>{title}</Text>
    <Guard name={title}>
      <Flex gap={3} alignItems={column ? "stretch" : "center"} direction={column ? "column" : "row"} flexWrap>{children}</Flex>
    </Guard>
  </Box>
);

export default function App() {
  const [pill, setPill] = React.useState("day");
  const [tab, setTab] = React.useState("overview");
  const [panel, setPanel] = React.useState("a");
  const [page, setPage] = React.useState(3);
  const [modal, setModal] = React.useState(false);
  const [side, setSide] = React.useState(false);
  const [tags, setTags] = React.useState(["수출", "통계"]);
  const [tagValue, setTagValue] = React.useState("");

  return (
    <UiProvider>
      <NoticeBubbleContainer />
      <Box wMax={960} p={8}>
        <Text tag="h1" size={500} bold mb={6} mt={0}>공용 컴포넌트 시험 화면</Text>

        <Block title="버튼·링크">
          <Button use="primary" theme="info">저장</Button>
          <Button use="primary" theme="success">승인</Button>
          <Button use="primary" theme="danger">삭제</Button>
          <Button>취소</Button>
          <Button use="tertiary" theme="info">자세히 보기</Button>
          <Button use="primary" size="l">큰 버튼</Button>
          <Button use="primary" loading>저장 중</Button>
          <Button use="primary" disabled>비활성</Button>
          <Link href="#">링크</Link>
        </Block>

        <Block title="입력">
          <Input w={200}><Input.Value placeholder="예: 홍길동" aria-label="이름" /></Input>
          <Input w={200} state="invalid"><Input.Value defaultValue="한글 입력 값" aria-label="오류 예시" /></Input>
          <InputNumber w={120}><InputNumber.Value defaultValue="10" aria-label="수량" /><InputNumber.Controls /></InputNumber>
          <Select placeholder="분류 선택" options={options} />
          <Select multiselect placeholder="여러 개 선택" options={options} />
          <Textarea w={260} placeholder="여러 줄 입력" aria-label="메모" />
          <InputTags w={260} onAdd={(v) => setTags([...tags, ...v])} onRemove={() => setTags(tags.slice(0, -1))}>
            {tags.map((t) => <InputTags.Tag key={t}><InputTags.Tag.Text>{t}</InputTags.Tag.Text></InputTags.Tag>)}
            <InputTags.Value value={tagValue} onChange={setTagValue} aria-label="키워드" />
          </InputTags>
        </Block>

        <Block title="선택 컨트롤">
          <Checkbox label="여러 개 선택" defaultChecked />
          <Checkbox label="선택 안 함" />
          <RadioGroup defaultValue="1" aria-label="구분">
            <Flex gap={3}><Radio value="1" label="법인" /><Radio value="2" label="개인" /></Flex>
          </RadioGroup>
          <Switch><Switch.Value defaultChecked /><Switch.Addon>알림 받기</Switch.Addon></Switch>
        </Block>

        <Block title="날짜">
          <DatePicker />
          <DateRangePicker />
        </Block>

        <Block title="드롭다운·필터">
          <Dropdown>
            <Dropdown.Trigger tag={Button}>드롭다운</Dropdown.Trigger>
            <Dropdown.Popper p={4} aria-label="드롭다운 내용">자유롭게 내용을 넣는 상자입니다.</Dropdown.Popper>
          </Dropdown>
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button}>메뉴</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>수정</DropdownMenu.Item>
              <DropdownMenu.Item>복제</DropdownMenu.Item>
              <DropdownMenu.Item>삭제</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
          <Select tag={FilterTrigger} placeholder="상태 필터" options={options} />
          <Tooltip title="마우스를 올리면 나오는 설명"><Button>설명 풍선</Button></Tooltip>
        </Block>

        <Block title="태그·배지·개수">
          <StatusTag status="success" size="l">승인</StatusTag>
          <StatusTag status="progress" size="l">진행 중</StatusTag>
          <StatusTag status="warning" size="l">대기</StatusTag>
          <StatusTag status="critical" size="l">반려</StatusTag>
          <StatusTag status="review" size="l">검토</StatusTag>
          <StatusTag size="l">임시 저장</StatusTag>
          <Tag theme="secondary">분류</Tag>
          <Badge type="new" /><Badge type="beta" /><Badge type="soon" /><Badge type="admin" />
          <Counter>128</Counter>
          <Counter theme="info">12</Counter>
          <Counter theme="danger">3</Counter>
          <Box position="relative" inline><Button>알림</Button><Dot /></Box>
        </Block>

        <Block title="이동" column>
          <Breadcrumbs>
            <Breadcrumbs.Item href="#">홈</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#">거래처</Breadcrumbs.Item>
            <Breadcrumbs.Item active>상세</Breadcrumbs.Item>
          </Breadcrumbs>
          <Box>
            <Pills value={pill} onChange={setPill} aria-label="기간">
              <Pills.Item value="day">일</Pills.Item><Pills.Item value="week">주</Pills.Item><Pills.Item value="month">월</Pills.Item>
            </Pills>
          </Box>
          <TabLine value={tab} onChange={setTab} aria-label="보기">
            <TabLine.Item value="overview">개요</TabLine.Item><TabLine.Item value="detail">상세</TabLine.Item><TabLine.Item value="history">이력</TabLine.Item>
          </TabLine>
          <TabPanel value={panel} onChange={setPanel} aria-label="구역">
            <TabPanel.Item value="a">기본 정보</TabPanel.Item><TabPanel.Item value="b">담당자</TabPanel.Item>
          </TabPanel>
          <Pagination currentPage={page} onCurrentPageChange={setPage} totalPages={12} />
          <Accordion>
            <Accordion.Item value={1}>
              <Accordion.Item.Toggle p={2}>접었다 펴는 영역</Accordion.Item.Toggle>
              <Accordion.Item.Collapse><Box p={2}>펼친 내용입니다.</Box></Accordion.Item.Collapse>
            </Accordion.Item>
          </Accordion>
        </Block>

        <Block title="알림 상자" column>
          <Notice theme="info"><Notice.Content><Notice.Title>안내 제목</Notice.Title><Notice.Text>일반적인 안내에 씁니다.</Notice.Text></Notice.Content></Notice>
          <Notice theme="success"><Notice.Content><Notice.Text>저장했습니다.</Notice.Text></Notice.Content></Notice>
          <Notice theme="warning"><Notice.Content><Notice.Text>일부 항목을 불러오지 못했습니다.</Notice.Text></Notice.Content></Notice>
          <Notice theme="danger"><Notice.Content><Notice.Text>저장하지 못했습니다. 필수 항목 2개가 비어 있습니다.</Notice.Text></Notice.Content></Notice>
        </Block>

        <Block title="겹치는 창">
          <Button onClick={() => setModal(true)}>모달 열기</Button>
          <Button onClick={() => setSide(true)}>옆 패널 열기</Button>
          <Button onClick={() => noticeBubbleDefaultManager.add({ children: "저장했습니다.", initialAnimation: true, duration: 4000 })}>짧은 알림 띄우기</Button>
          <Modal visible={modal} onClose={() => setModal(false)}>
            <Modal.Title>삭제할까요?</Modal.Title>
            <Text tag="p" mt={2} mb={4}>삭제한 거래처는 되돌릴 수 없습니다.</Text>
            <Flex gap={2}><Button use="primary" theme="danger" onClick={() => setModal(false)}>삭제</Button><Button onClick={() => setModal(false)}>취소</Button></Flex>
          </Modal>
          <SidePanel visible={side} onClose={() => setSide(false)}>
            <SidePanel.Header title="상세 정보" />
            <SidePanel.Body>옆에서 나오는 패널입니다.</SidePanel.Body>
          </SidePanel>
        </Block>

        <Block title="카드·진행·로딩·빈 상태" column>
          <Card>
            <Card.Header><Card.Title>카드 제목</Card.Title></Card.Header>
            <Card.Body>카드 안의 내용입니다.</Card.Body>
          </Card>
          <Divider />
          <ProgressBar value={60} aria-label="진행률" />
          <Flex gap={4} alignItems="center">
            <Spin />
            <SpinContainer loading><Box p={4}>불러오는 중인 영역</Box></SpinContainer>
            <Skeleton h={48} w={200}><Skeleton.Text amount={2} /></Skeleton>
          </Flex>
          <NoData />
        </Block>

        <More Block={Block} />

        <Block title="표" column>
          <DataTable
            aria-label="거래처 목록"
            data={rows.map((r) => ({ ...r, status: <StatusTag status={statusOf[r.status]}>{r.status}</StatusTag> }))}
            columns={[
              { name: "name", children: "거래처" },
              { name: "type", children: "구분" },
              { name: "status", children: "상태" },
              { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
              { name: "date", children: "등록일" },
            ]}
          />
        </Block>
      </Box>
    </UiProvider>
  );
}
