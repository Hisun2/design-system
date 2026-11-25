import React from "react";
import { Button, Checkbox, Flex, Radio, RadioGroup, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont } from "../../kit.jsx";

export const meta = { title: "파일 형식 표기", order: 5 };

export default function FileExtensionsPage() {
  return (
    <Page
      meta={meta}
      lead={'파일 형식은 자리에 따라 두 가지로 적습니다. 버튼과 선택지에서는 점 없는 대문자로, 문장에서는 점을 붙인 소문자와 "파일"을 함께 적습니다.'}
    >
      <Section title="버튼과 선택지에서">
        <P>버튼, 메뉴 항목, 확인란, 라디오 버튼, 탭처럼 낱말로 끝나는 자리에 해당합니다.</P>
        <Rules
          items={[
            "형식 이름은 점 없이 대문자로 적습니다. \"PDF\", \"CSV\", \"XLSX\", \"HWP\".",
            "형식 이름 뒤에 동작을 적습니다. 조사는 생략합니다. \"PDF 내려받기\".",
            "형식이 하나뿐이면 형식을 적지 않아도 됩니다. \"내려받기\". 둘 이상에서 고를 때 형식을 적습니다.",
            "엑셀 파일은 \"엑셀\"이라고 적습니다. 확장자(XLSX, XLS)보다 이 이름이 더 익숙합니다. 한 시스템 안에서 \"엑셀\"과 \"XLSX\"를 섞지 않습니다.",
          ]}
        />
        <Demo caption="내려받기 형식 고르기">
          <RadioGroup defaultValue="xlsx" aria-label="내려받기 형식">
            <Flex gap={4}>
              <Radio value="xlsx" label="엑셀" />
              <Radio value="csv" label="CSV" />
              <Radio value="pdf" label="PDF" />
            </Flex>
          </RadioGroup>
        </Demo>
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <Button>엑셀 내려받기</Button>
                <Button>PDF 내려받기</Button>
              </Flex>
            ),
            text: "점 없는 대문자와 동작을 적습니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2}>
                <Button>.xlsx로 다운로드</Button>
                <Button>pdf 파일 저장하기</Button>
              </Flex>
            ),
            text: "점과 소문자를 쓰지 않습니다. 동작 낱말도 용어집과 다릅니다.",
          }}
        />
        <Demo caption="확인란에서도 같습니다">
          <Checkbox label="PDF 사본을 함께 보내기" defaultChecked />
        </Demo>
      </Section>

      <Section title="문장에서">
        <P>알림 상자, 오류 문구, 설명 풍선, 입력창 아래 도움말처럼 문장으로 끝나는 자리에 해당합니다.</P>
        <Rules
          items={[
            "확장자는 점을 붙인 소문자로 적고 뒤에 \"파일\"을 붙입니다. \".pdf 파일\", \".xlsx 파일\".",
            "여러 형식을 늘어놓을 때는 쉼표로 나누고 \"파일\"은 마지막에 한 번만 적습니다. \".jpg, .png 파일\".",
            "올릴 수 있는 형식과 크기 제한은 파일을 고르기 전에 보이는 자리에 적습니다. 오류가 난 뒤에 알리지 않습니다.",
            "크기는 숫자와 단위를 붙여 적습니다. \"최대 10MB\".",
          ]}
        />
        <Table
          head={["상황", "이렇게 씁니다", "이렇게 쓰지 않습니다"]}
          rows={[
            ["올리기 안내", ".xlsx, .csv 파일을 올릴 수 있습니다. 최대 10MB.", "XLSX/CSV만 가능(10메가 이하)"],
            ["형식 오류", ".pdf 파일만 올릴 수 있습니다.", "PDF 형식이 아닙니다. 확장자를 확인하세요."],
            ["저장 안내", "문서를 .pdf 파일로 저장했습니다.", "문서를 pdf 포맷으로 저장했습니다."],
            ["크기 오류", "파일이 10MB를 넘습니다. 더 작은 파일을 올리세요.", "파일 사이즈 초과(MAX: 10MB)"],
          ]}
        />
        <Demo caption="첨부 영역의 도움말" column>
          <Flex direction="column" gap={1}>
            <Text size={200}>계약서 사본</Text>
            <Flex gap={2} alignItems="center">
              <Button>파일 선택</Button>
              <Text size={200} color="text-secondary">.pdf, .hwp 파일. 최대 10MB</Text>
            </Flex>
          </Flex>
        </Demo>
      </Section>

      <Section title="자주 쓰는 형식">
        <Table
          head={["형식", "버튼·선택지", "문장", "쓰지 않는 표기"]}
          rows={[
            ["엑셀 통합 문서", "엑셀", ".xlsx 파일", "Excel파일, XLS, 엑셀화일"],
            ["쉼표로 나눈 값", "CSV", ".csv 파일", "csv, 씨에스브이"],
            ["PDF 문서", "PDF", ".pdf 파일", ".PDF, Pdf, 피디에프"],
            ["한글 문서", "HWP", ".hwp, .hwpx 파일", "한글파일, 아래아한글"],
            ["워드 문서", "DOCX", ".docx 파일", "워드파일, DOC"],
            ["그림", "JPG, PNG", ".jpg, .png 파일", "JPEG, 이미지파일"],
            ["압축 파일", "ZIP", ".zip 파일", "압축화일, 집"],
          ]}
        />
        <Rules
          items={[
            "파일 이름을 통째로 보여 줄 때는 사용자가 올린 그대로 적습니다. 대소문자를 바꾸지 않습니다.",
            "\"파일\"로 적습니다. \"화일\"로 적지 않습니다.",
          ]}
        />
      </Section>
    </Page>
  );
}
