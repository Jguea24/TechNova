import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { TouchableOpacity } from "react-native";
import { AccessScreen } from "../src/presentation/screens/AccessScreen";
import { useOnboardingViewModel } from "../src/viewmodel/OnboardingViewModel";
import {
  createNavigationMock,
  renderWithAct,
} from "../test-utils/navigationTestUtils";

jest.mock("../src/viewmodel/OnboardingViewModel", () => ({
  useOnboardingViewModel: jest.fn(),
}));

describe("AccessScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza la pantalla de acceso", async () => {
    (useOnboardingViewModel as jest.Mock).mockReturnValue({
      completeOnboarding: jest.fn().mockResolvedValue(undefined),
    });

    const navigation = createNavigationMock();
    const tree = await renderWithAct(
      <AccessScreen navigation={navigation} />
    );

    expect(tree.root.findAllByType(TouchableOpacity)).toHaveLength(2);
    expect(tree.toJSON()).toBeTruthy();
  });

  it("marca onboarding y navega a Auth al presionar iniciar sesion", async () => {
    const completeOnboarding = jest.fn().mockResolvedValue(undefined);
    (useOnboardingViewModel as jest.Mock).mockReturnValue({
      completeOnboarding,
    });

    const navigation = createNavigationMock();
    const tree = await renderWithAct(
      <AccessScreen navigation={navigation} />
    );

    const buttons = tree.root.findAllByType(TouchableOpacity);

    await ReactTestRenderer.act(async () => {
      await buttons[0].props.onPress();
    });

    expect(completeOnboarding).toHaveBeenCalledTimes(1);
    expect(navigation.replace).toHaveBeenCalledWith("Auth");
  });

  it("marca onboarding y navega a Auth al presionar crear cuenta", async () => {
    const completeOnboarding = jest.fn().mockResolvedValue(undefined);
    (useOnboardingViewModel as jest.Mock).mockReturnValue({
      completeOnboarding,
    });

    const navigation = createNavigationMock();
    const tree = await renderWithAct(
      <AccessScreen navigation={navigation} />
    );

    const buttons = tree.root.findAllByType(TouchableOpacity);

    await ReactTestRenderer.act(async () => {
      await buttons[1].props.onPress();
    });

    expect(completeOnboarding).toHaveBeenCalledTimes(1);
    expect(navigation.replace).toHaveBeenCalledWith("Auth");
  });
});
