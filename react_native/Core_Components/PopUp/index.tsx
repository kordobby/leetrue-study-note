import React, { ReactNode } from "react";
import { FC } from "react";
import {
  StTitle,
  StSubTitle,
  StModal,
  StDimmed,
  StContent,
  StTriggerWrapper,
  StButton,
  StButtonText,
} from "./PopUp.style";

/* ----------- PopUp Portal ------------ */
// React Native 에는 createPortal 이 없어서, Modal tag를 사용해보기로 함.
interface PopUpPortalInterface {
  open: boolean;
  children: ReactNode;
}

const PopUpPortal: FC<PopUpPortalInterface> = ({ children, open }) => {
  return (
    <StModal animationType="fade" transparent={true} visible={open}>
      <StDimmed>{children}</StDimmed>
    </StModal>
  );
};

/* ---------- PopUp Dimmed --------- */

interface PopUpDimmedInterface {
  children: ReactNode;
}

/* ---------- PopUp Content Common --------- */

interface PopUpContentInterface {
  children: ReactNode;
}

const PopUpContent: FC<PopUpContentInterface> = ({ children, ...rest }) => {
  return <StContent {...rest}>{children}</StContent>;
};

// @Mida 껍데기들 여기에 ㅋㅋㅋ 이름은 알잘딱

/* ---------- Modal Title ---------- */
interface PopUpTitleInterface {
  children: string;
}

const PopUpTitle: FC<PopUpTitleInterface> = ({ children }) => {
  return <StTitle>{children}</StTitle>;
};

/* ---------- Modal SubTitle ---------- */
interface PopUpSubTitleInterface {
  children: string;
}

const PopUpSubTitle: FC<PopUpSubTitleInterface> = ({ children }) => {
  return <StSubTitle>{children}</StSubTitle>;
};

/* ------------ Modal Trigger ----------- */
interface PopUpDoubleTriggerInterface {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  customText?: string;
  onPress: () => void;
}

const PopUpDoubleTrigger: FC<PopUpDoubleTriggerInterface> = ({
  onPress,
  setter,
  customText,
}) => {
  return (
    <StTriggerWrapper>
      <StButton activeOpacity={1} black onPress={onPress}>
        <StButtonText black>취소</StButtonText>
      </StButton>
      <StButton activeOpacity={1}>
        <StButtonText
          type
          onPress={() => {
            setter(false);
          }}
        >
          {customText ? customText : "확인"}
        </StButtonText>
      </StButton>
    </StTriggerWrapper>
  );
};

interface PopUpSingleTriggerInterface {
  icon?: any; // type
  onPress: () => void;
  children?: string;
}
// NotificationWhite
const PopUpSingleTrigger: FC<PopUpSingleTriggerInterface> = ({
  onPress,
  icon,
  children,
}) => {
  return (
    <StTriggerWrapper>
      <StButton activeOpacity={1} wide>
        {icon}
        <StButtonText type icon={Boolean(icon)} onPress={onPress}>
          {children ? children : "확인"}
        </StButtonText>
      </StButton>
    </StTriggerWrapper>
  );
};

export {
  PopUpTitle,
  PopUpSingleTrigger,
  PopUpSubTitle,
  PopUpDoubleTrigger,
  PopUpPortal,
  PopUpContent,
};
