/**
 * @format
 */

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { getToken } from "../src/shared/storage/authStorage";
import { renderWithAct } from "../test-utils/navigationTestUtils";

jest.mock("../src/navigation/AppNavigator", () => ({
  AppNavigator:
    require("../test-utils/navigationTestUtils").createMockNavigatorComponent(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

jest.mock("../src/shared/storage/authStorage", () => ({
  getToken: jest.fn(),
}));

import App from "../App";

const renderApp = async (options: {
  token?: string | null;
  onboardingDone?: string | null;
}) => {
  (getToken as jest.Mock).mockResolvedValue(options.token ?? null);
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
    options.onboardingDone ?? "true"
  );

  return renderWithAct(<App />);
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("renderiza Onboarding si aun no se completa", async () => {
  const tree = await renderApp({
    token: "token-activo",
    onboardingDone: "false",
  });

  expect(tree.root.findByType(Text).props.children).toBe("route:Onboarding");
});

test("renderiza Home si hay token y onboarding completo", async () => {
  const tree = await renderApp({
    token: "token-activo",
    onboardingDone: "true",
  });

  expect(tree.root.findByType(Text).props.children).toBe("route:Home");
});

test("renderiza Auth si no hay token y onboarding completo", async () => {
  const tree = await renderApp({
    token: null,
    onboardingDone: "true",
  });

  expect(tree.root.findByType(Text).props.children).toBe("route:Auth");
});
