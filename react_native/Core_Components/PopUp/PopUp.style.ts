import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../utilities/UtilColors";
import { fonts } from "../../utilities/UtilFonts";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const StTitle = styled.Text`
  margin-bottom: 4px;
  ${fonts.body.b15};
  color: ${colors.grayscale.gray01};
  text-align: center;
`;

export const StSubTitle = styled.Text`
  ${fonts.body.l14};
  color: ${colors.grayscale.gray01};
  text-align: center;
`;

export const StModal = styled.Modal`
  position: absolute;
  top: 0;
  left: 0;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  background-color: rgba(0, 0, 0, 0.36);
  flex: 1;
  flex-grow: 1;
`;

export const StDimmed = styled.View`
  position: absolute;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  background-color: rgba(0, 0, 0, 0.36);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StContent = styled.View`
  width: ${screenWidth - 96}px;
  height: auto;
  padding: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grayscale.white};
  border-radius: 2px;
`;

export const StTriggerWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

interface ButtonInterface {
  black?: boolean;
  wide?: boolean;
}

export const StButton = styled.TouchableOpacity<{
  black?: boolean;
  wide?: boolean;
}>`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${({ black }: ButtonInterface) =>
    black ? `${colors.grayscale.gray08}` : `${colors.grayscale.gray01}`};
  border-radius: 2px;
  padding: ${({ wide }) => (wide ? `12px 20px` : `12px 40px`)};
  margin: ${({ black }: ButtonInterface) => (black ? `0 8px 0 0` : `0px`)};
  z-index: 10;
  overflow: hidden;
`;

export const StButtonText = styled.Text<{ black?: boolean; icon?: boolean }>`
  ${fonts.body.m14};
  text-align: center;
  flex-wrap: nowrap;
  margin-left: ${({ icon }) => (icon ? "8px" : "0px")};
  color: ${({ black }: ButtonInterface) =>
    !black ? `${colors.grayscale.white}` : `${colors.grayscale.gray01}`};
`;
