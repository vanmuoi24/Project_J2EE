import { Modal, Typography, Divider } from "antd";
import React from "react";
import styled from "styled-components";
import vnFlag from "@/assets/images/vi.png";
import usFlag from "@/assets/images/en.png";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store";
import { setCurrency, setLanguage } from "@/store/slices/lcSlice";

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};

const OptionContainer = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  background: ${(props) => (props.selected ? "#e6f7ff" : "transparent")};
  &:hover {
    background: #f0f0f0;
  }
`;

const ModalChangeLC: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();

  const { currency, language } = useAppSelector((state: RootState) => state.lc);

  const [selectedCurrency, setSelectedCurrency] = React.useState<string>("VND");
  const [selectedLang, setSelectedLang] = React.useState<string>("VN");

  const handleOk = () => {
    setIsOpen(false);
    dispatch(setCurrency(selectedCurrency))  
    dispatch(setLanguage(selectedLang))  
    console.log("Tiền tệ: ",currency, " Ngôn ngữ: ", language);
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <Modal
      title="Chọn Ngôn ngữ & Tiền tệ"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Hủy"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Tiền tệ */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <Typography.Text strong>Tiền tệ</Typography.Text>
          <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 8 }}>
            <OptionContainer
              selected={currency === "VND"}
              onClick={() => setSelectedCurrency("VND")}
            >
              <span>₫</span>
              <span>VNĐ</span>
            </OptionContainer>
            <OptionContainer
              selected={currency === "USD"}
              onClick={() => setSelectedCurrency("USD")}
            >
              <span>$</span>
              <span>USD</span>
            </OptionContainer>
            <OptionContainer
              selected={currency === "EUR"}
              onClick={() => setSelectedCurrency("EUR")}
            >
              <span>€</span>
              <span>EUR</span>
            </OptionContainer>
          </div>
        </div>

        <Divider type="vertical" style={{ height: 80 }} />

        {/* Ngôn ngữ */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <Typography.Text strong>Ngôn ngữ</Typography.Text>
          <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 8 }}>
            <OptionContainer
              selected={language === "VN"}
              onClick={() => setSelectedLang("VN")}
            >
              <img src={vnFlag} alt="VN" style={{ width: 20, height: 14 }} />
              <span>VN</span>
            </OptionContainer>
            <OptionContainer
              selected={selectedLang === "ENG"}
              onClick={() => setSelectedLang("ENG")}
            >
              <img src={usFlag} alt="ENG" style={{ width: 20, height: 14 }} />
              <span>ENG</span>
            </OptionContainer>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChangeLC;
