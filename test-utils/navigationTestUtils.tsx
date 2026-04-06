import React from "react";
import ReactTestRenderer from "react-test-renderer";

export const createNavigationMock = (overrides: Record<string, unknown> = {}) => ({
  navigate: jest.fn(),
  replace: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  ...overrides,
});

export const createRouteMock = <TParams extends Record<string, unknown>>(
  params?: TParams
) => ({
  key: "test-route",
  name: "TestScreen",
  params: (params || {}) as TParams,
});

export const renderWithAct = async (element: React.ReactElement) => {
  let tree: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    tree = ReactTestRenderer.create(element);
  });

  return tree!;
};

export const createMockNavigatorComponent =
  (prefix = "route:") =>
  ({ initialRouteName }: { initialRouteName?: string }) => {
    const ReactNative = require("react-native");
    return React.createElement(
      ReactNative.Text,
      null,
      `${prefix}${initialRouteName ?? ""}`
    );
  };
