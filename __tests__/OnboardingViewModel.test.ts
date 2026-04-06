jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useOnboardingViewModel } from "../src/viewmodel/OnboardingViewModel";

describe("OnboardingViewModel", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
  });

  it("guarda el estado de onboarding completado", async () => {
    const { completeOnboarding } = useOnboardingViewModel();

    await completeOnboarding();

    await expect(AsyncStorage.getItem("onboarding_done")).resolves.toBe("true");
  });

  it("retorna true cuando onboarding ya fue completado", async () => {
    await AsyncStorage.setItem("onboarding_done", "true");

    const { isOnboardingCompleted } = useOnboardingViewModel();

    await expect(isOnboardingCompleted()).resolves.toBe(true);
  });

  it("retorna false cuando onboarding aun no fue completado", async () => {
    await AsyncStorage.setItem("onboarding_done", "false");

    const { isOnboardingCompleted } = useOnboardingViewModel();

    await expect(isOnboardingCompleted()).resolves.toBe(false);
  });
});
