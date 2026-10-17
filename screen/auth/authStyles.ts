import { COLORS } from "@/constants";

export const inputWrapper = (borderColor: string) => ({
  borderColor: borderColor,
  backgroundColor: COLORS.lightWhite,
  borderWidth: 1,
  height: 50,
  borderRadius: 12,
  flexDirection: "row" as const,
  paddingHorizontal: 15,
  alignItems: "center" as const,
});
